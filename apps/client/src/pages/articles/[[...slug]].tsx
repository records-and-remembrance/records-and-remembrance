import type { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import {
  ArticlesBySlugDocument,
  ArticlesBySlugQuery,
  ArticleSlugsDocument,
} from "../../generated/graphql";
import { client } from "../../infra";
import { markdownToHtml } from "../../utils/markdownToHtml";

type Article = NonNullable<
  NonNullable<ArticlesBySlugQuery["articleCollection"]>["items"][0]
>;

type Props = {
  article: Article;
  content: string | undefined;
};

type Query = {
  slug: string[];
};

const ArticlePage = ({ article, content }: Props) => {
  return (
    <div>
      <h1>
        <a>{article.title}</a>
      </h1>
      <p>{article.title}</p>
      <p>{article.date}</p>
      <p>{article.category}</p>
      <p>{JSON.stringify(article.tag)}</p>
      {content ? <div dangerouslySetInnerHTML={{ __html: content }} /> : null}
    </div>
  );
};

export default ArticlePage;

export const getStaticProps: GetStaticProps<Props, Query> = async ({
  params,
}) => {
  const slugParams = params?.slug;
  if (!slugParams) return { notFound: true };
  const slug = slugParams.join("/");

  const articleData = await client
    .query(ArticlesBySlugDocument, { slug })
    .toPromise();
  const article = articleData.data?.articleCollection?.items?.[0];
  if (!article) return { notFound: true };

  const content = article.content
    ? await markdownToHtml(article.content)
    : undefined;

  return {
    props: { article, content },
  };
};

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  const slugsData = await client.query(ArticleSlugsDocument).toPromise();
  const items = slugsData.data?.articleCollection?.items ?? [];
  const paths = items
    .filter((i) => !!i?.slug)
    .map((i) => ({ params: { slug: i!.slug!.split("/") } }));

  return {
    paths,
    fallback: false,
  };
};
