import { BaseCrawler, scrollToBottom } from "./BaseCrawler";
import type { Page } from "./BaseCrawler";
import { env } from "../utils/env";
import { submitLoginHatena } from "./sharedHatena";

export class HatenaListCrawler extends BaseCrawler<void, string[]> {
  async crawl(page: Page) {
    const entriesUrl = `https://blog.hatena.ne.jp/${env.HATENA_ID}/${env.HATENA_DOMAIN}/entries`;

    await page.goto(entriesUrl);
    // login
    await submitLoginHatena(page);

    // 記事一覧
    await page.waitForSelector("h1.entries");

    // 全ページ読み込み
    let elmFound = true;
    while (elmFound) {
      try {
        await scrollToBottom(page);
        await page.waitForSelector(".pager > button", { timeout: 1000 });
        // console.log("found");
        await page.click(".pager > button");
        // console.log("click");
        await page.waitForTimeout(1000);
      } catch (e) {
        console.log("<reached last>");
        elmFound = false;
      }
    }

    // URLリスト取得
    const urls = await page.evaluate(() => {
      const anchors = document.querySelectorAll(".entry-title");
      const u: string[] = [];
      anchors.forEach((a) => {
        const h = a.getAttribute("href");
        h !== null && u.push(h);
      });
      return u;
    });

    return urls;
  }
}
