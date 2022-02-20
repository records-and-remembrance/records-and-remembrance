declare global {
  interface Window {
    // for GTM
    dataLayer: Record<string, unknown>[]
  }
}
