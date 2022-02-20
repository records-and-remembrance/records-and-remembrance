import type { GetStaticProps } from "next";
import Link from "next/link";
import { ArticleListDocument, ArticleListQuery } from "../generated/graphql";
import { client } from "../infra/graphqlClient";

type Props = {
  articles: NonNullable<ArticleListQuery["articleCollection"]>["items"];
};

const IndexPage = ({ articles }: Props) => {
  return (
    <ul>
      {articles.map((article) => {
        if (!article) return null;

        return (
          <li key={article.slug}>
            <Link href={`/articles/${article.slug}`}>
              <a>{article.title}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const articlesData = await client.query(ArticleListDocument).toPromise();
  return {
    props: {
      articles: articlesData.data?.articleCollection?.items ?? [],
    },
  };
};
