import {
  HatenaArticleCrawler,
  ArticleResult,
} from "./crawler/HatenaArticleCrawler";
import fs from "fs";
import { parseDate2Str } from "./utils/utils";

(async () => {
  console.log("[main] start");

  const list: string[] = JSON.parse(
    fs.readFileSync("./out/list.json", { encoding: "utf-8" })
  );

  const crawler = new HatenaArticleCrawler({ list });
  const results = await crawler.run();

  results.forEach((r) => {
    fs.writeFileSync(`out/articles/${buildFilename(r)}.md`, buildMd(r), {
      encoding: "utf-8",
    });
  });

  console.log("[main] finish");
})();

function buildFilename(res: ArticleResult) {
  if (res.customUrl) {
    return res.customUrl.replace(/\//g, "-") + ".md";
  } else {
    return parseDate2Str(new Date(res.datetime!));
  }
}

function buildMd(res: ArticleResult) {
  const title = res.title ? buildTitle(res.title) : "";
  const tags =
    res.categories && res.categories.length
      ? "tags:\n" + buildTags(res.categories)
      : "";

  return `---
templateKey: article
title: ${title}
date: '${res.datetime}'
${tags}---
${res.body}
`;
}

function buildTitle(str: string) {
  let title = str;
  let quote = "'";
  if (str.includes("'")) {
    quote = '"';
  }
  if (str.includes('"')) {
    title = str.replace(/\"/g, '\\"');
  }
  return quote + title + quote;
}

function buildTags(cats: string[]) {
  return cats
    .map((cat) => {
      let tag = cat;
      if (tag.includes("*")) {
        tag = tag.replace(/\*/g, "_");
      }
      return "  - " + tag + "\n";
    })
    .join("");
}
