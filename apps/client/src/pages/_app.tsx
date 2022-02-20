import type { AppProps /*, AppContext */ } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { site } from '../constants/site'
import { Layout } from '../component/Layout'

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <DefaultSeo
        defaultTitle={site.name}
        titleTemplate={`%s | ${site.name}`}
        openGraph={{
          type: 'website',
          locale: 'ja_JP',
          site_name: site.name
        }}
        twitter={{
          handle: site.twitter,
          site: site.twitter,
          cardType: 'summary_large_image'
        }}
      />
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
