import type { AppProps /*, AppContext */ } from 'next/app'
import { Layout } from '../component/Layout'
import { GoogleTagManager } from '../component/GoogleTagManager'
import { env } from '../utils/clientEnv'
import { DefaultSEOTags } from '../component/DefaultSEOTags'

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <GoogleTagManager googleTagManagerId={env.GOOGLE_TAG_MANAGER_ID} />
      <DefaultSEOTags />
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
