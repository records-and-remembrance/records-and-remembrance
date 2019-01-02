const fs = require("fs").promises;
const inputDir = "./in/";
const outputDir = "./out/";

async function loadJsonFilenames() {
  const files = await fs.readdir(inputDir);
  return files.filter(f => /.*\.json$/.test(f));
}

async function require_json(filename) {
  const text = await fs.readFile(inputDir + filename, {
    encoding: "utf-8"
  });
  return JSON.parse(text);
}

function buildTitle(str) {
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

function buildTags(cats) {
  return cats
    .map(cat => {
      let tag = cat;
      if (tag.includes("*")) {
        tag = tag.replace(/\*/g, "_");
      }
      return "  - " + tag + "\n";
    })
    .join("");
}

function buildMd(json) {
  const title = buildTitle(json.title);
  const tags =
    json.cats && json.cats.length ? "tags:\n" + buildTags(json.cats) : "";
  return `---
templateKey: article
title: ${title}
date: '${json.posted_at}'
${tags}---
${json.content}
`;
}

function twoDigitNumStr(num) {
  const str = num.toString();
  switch (str.length) {
    case 1:
      return "0" + str;
    case 2:
      return str;
    default:
      return "";
  }
}

function parseDate2Str(str) {
  const date = new Date(str);
  const dateStr = `${date.getFullYear()}-${twoDigitNumStr(
    date.getMonth() + 1
  )}-${twoDigitNumStr(date.getDate())}`;
  const timeStr = `${twoDigitNumStr(date.getHours())}${twoDigitNumStr(
    date.getMinutes()
  )}${twoDigitNumStr(date.getSeconds())}`;
  return `${dateStr}-${timeStr}.md`;
}

function buildFilename(json) {
  if (json.custom_url) {
    return json.custom_url.replace(/\//g, "-") + ".md";
  } else {
    return parseDate2Str(json.posted_at);
  }
}

async function readAndConvertJson(fileName) {
  const json = await require_json(fileName);
  const md = buildMd(json);
  const saveFileName = outputDir + buildFilename(json);
  await fs.writeFile(saveFileName, md);
  console.log("saved:", saveFileName);
}

async function main() {
  files = await loadJsonFilenames();
  files.map(readAndConvertJson);
}

main();
