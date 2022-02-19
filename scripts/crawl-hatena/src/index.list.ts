import { HatenaListCrawler } from "./crawler/HatenaListCrawler";
import { promises as fs } from "fs";
// import { parseDate2Str } from "./utils/utils";

(async () => {
  console.log("[main] start");

  const crawler = new HatenaListCrawler(undefined, { slowMo: 1 });
  const result = await crawler.run();

  // output
  await fs.writeFile(`out/list.json`, JSON.stringify(result), {
    encoding: "utf-8",
  });

  console.log("[main] finish");
})();
