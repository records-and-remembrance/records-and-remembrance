import type { Page } from "./BaseCrawler";
import { env } from "../utils/env";

export const submitLoginHatena = async (page: Page) => {
  await page.type("#login-name", env.HATENA_ID);
  await page.type(".password", env.HATENA_PASS);
  await page.click("#login-button");
  await page.waitForNavigation({ waitUntil: "networkidle2" });
};
