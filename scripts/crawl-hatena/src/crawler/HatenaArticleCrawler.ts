import { BaseCrawler, scrollToBottom } from "./BaseCrawler";
import type { Page } from "./BaseCrawler";
import { env } from "../utils/env";
import { mapSeries } from "bluebird";
import { submitLoginHatena } from "./sharedHatena";

const loginPageUrl = "https://www.hatena.ne.jp/login";

export class HatenaArticleCrawler extends BaseCrawler<
  { list: string[] },
  ArticleResult[]
> {
  async crawl(page: Page) {
    // login
    await page.goto(loginPageUrl);
    await submitLoginHatena(page);

    // URLごと取得
    const results = await mapSeries(
      this.params.list,
      async (url): Promise<ArticleResult> => {
        await page.goto(url);
        // リダイレクトされてエディタ部分が表示されるまで
        await page.waitForSelector("#editor");

        const title = await page.evaluate(() => {
          return (
            document
              .querySelector(".editor-title > input")
              ?.getAttribute("value") ?? undefined
          );
        });
        const body = await page.evaluate(() => {
          return document.querySelector("#body")?.textContent ?? undefined;
        });

        const metadataStr = await page.evaluate(() => {
          return document
            .querySelector("html")
            ?.getAttribute("data-initial-state");
        });
        const metadata = metadataStr ? JSON.parse(metadataStr) : {};

        const categories: string[] =
          metadata["editor.selectedCategories"] ?? [];
        const entryOption = metadata["editor.entryOption"] ?? {};
        const customUrl = entryOption.customUrl ?? undefined;
        const datetime = entryOption.datetime ?? undefined;
        const isDraft = entryOption.isDraft ?? false;

        return {
          title,
          body,
          categories,
          customUrl,
          datetime,
          isDraft,
        };
      }
    );

    return results;
  }
}

export type ArticleResult = {
  title: string | undefined;
  body: string | undefined;
  categories: string[];
  customUrl: string | undefined;
  datetime: string | undefined;
  isDraft: string | undefined;
};
