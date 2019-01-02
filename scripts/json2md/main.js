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

function buildMd(json) {
  return `---
templateKey: article
title: '${json.title}'
date: '${json.posted_at}'
${
    json.cats
      ? `tags:
${json.cats.map(cat => "  - " + cat + "\n").join("")}`
      : null
  }---
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

async function main() {
  files = await loadJsonFilenames();
  files.map(async fileName => {
    const json = await require_json(fileName);
    const md = buildMd(json);
    const saveFileName = outputDir + parseDate2Str(json.posted_at);
    await fs.writeFile(saveFileName, md);
    console.log("saved:", saveFileName);
  });
}

main();
