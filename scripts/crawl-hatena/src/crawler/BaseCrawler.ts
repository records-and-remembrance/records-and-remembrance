import puppeteer from "puppeteer";
import type { Page, Browser } from "puppeteer";

export type { Browser, Page } from "puppeteer";

export interface Crawler {
  run(): Promise<any>;
}

export abstract class BaseCrawler<Params, Result> implements Crawler {
  constructor(readonly params: Params, launchOptions?: LaunchOptions) {
    this.launchOptions = {
      ...defaultLaunchOptions,
      ...launchOptions,
    };
  }

  readonly launchOptions: LaunchOptions;

  async run(): Promise<Result> {
    const browser = await puppeteer.launch(this.launchOptions);
    const _page = await browser.newPage();

    const result = await this.crawl(_page, browser);

    await browser.close();

    return result;
  }

  abstract crawl(page: Page, browser: Browser): Promise<Result>;
}

type LaunchOptions = Parameters<typeof puppeteer.launch>[0];

const defaultLaunchOptions: LaunchOptions = {
  headless: false,
  defaultViewport: {
    width: 1280,
    height: 800,
  },
};

export async function scrollToBottom(page: Page) {
  const distance = 100; // should be less than or equal to window.innerHeight
  const delay = 100;

  while (
    await page.evaluate(
      () =>
        (document.scrollingElement?.scrollTop ?? 0) + window.innerHeight <
        (document.scrollingElement?.scrollHeight ?? 0)
    )
  ) {
    await page.evaluate((y) => {
      document.scrollingElement?.scrollBy(0, y);
    }, distance);
    await page.waitForTimeout(delay);
  }
}
