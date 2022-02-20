import type { GetStaticProps } from 'next'
import Link from 'next/link'
import { site } from '../constants/site'
import { ArticleListDocument, ArticleListQuery } from '../generated/graphql'
import { client } from '../infra/graphqlClient'

type Props = {
  articles: NonNullable<ArticleListQuery['articleCollection']>['items']
}

const IndexPage = ({ articles }: Props) => {
  return (
    <div>
      <h1>{site.name}</h1>
      <section>
        <h2>最新の記事</h2>
        <ul>
          {articles.map((article) => {
            if (!article) return null

            return (
              <li key={article.slug}>
                <Link href={`/articles/${article.slug}`}>
                  <a>{article.title}</a>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <section>
        <h2>Calendar</h2>
      </section>

      <section>
        <h2>サイトマップ</h2>
      </section>
    </div>
  )
}

export default IndexPage

export const getStaticProps: GetStaticProps<Props> = async () => {
  const articlesData = await client.query(ArticleListDocument).toPromise()
  return {
    props: {
      articles: articlesData.data?.articleCollection?.items ?? []
    }
  }
}
