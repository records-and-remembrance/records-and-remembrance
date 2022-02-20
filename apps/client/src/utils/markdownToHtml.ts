import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'

const remarkInst = remark().use(html).use(gfm)

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remarkInst.process(markdown)
  return result.toString()
}
