import { DefaultSeo } from 'next-seo'
import { site } from '../../constants/site'

export const DefaultSEOTags = () => (
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
    additionalLinkTags={[
      {
        rel: 'icon',
        href: '/favicon/favicon-16x16.png',
        sizes: '16x16'
      },
      {
        rel: 'icon',
        href: '/favicon/favicon-32x32.png',
        sizes: '32x32'
      },
      {
        rel: 'apple-touch-icon',
        href: '/favicon/apple-touch-icon.png',
        sizes: '180x180'
      },
      {
        rel: 'manifest',
        href: '/site.webmanifest'
      },
      {
        rel: 'mask-icon',
        href: '/favicon/safari-pinned-tab.svg',
        color: '#000000'
      },
      {
        rel: 'mask-icon',
        href: '/favicon/safari-pinned-tab.svg',
        color: '#000000'
      },
      {
        rel: 'shortcut icon',
        href: '/favicon/favicon.ico'
      }
    ]}
    additionalMetaTags={[
      {
        name: 'msapplication-config',
        content: '/browserconfig.xml'
      },
      {
        name: 'theme-color',
        content: '#ffffff'
      }
    ]}
  />
)
