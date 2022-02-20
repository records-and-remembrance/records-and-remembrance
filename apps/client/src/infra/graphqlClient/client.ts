import { createClient } from 'urql'
import { env } from '../../utils/serverEnv'

/** SSR/SSG時のみ利用可能なGraphQL Client */
export const client = createClient({
  url: env.CONTENTFUL_API_URL,
  fetchOptions: () => {
    return {
      headers: { authorization: `Bearer ${env.CONTENTFUL_ACCESS_TOKEN}` }
    }
  }
})
