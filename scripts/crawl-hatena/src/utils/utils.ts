export function parseDate2Str(date: Date) {
  const dateStr = `${date.getFullYear()}-${twoDigitNumStr(
    date.getMonth() + 1
  )}-${twoDigitNumStr(date.getDate())}`;

  const timeStr = `${twoDigitNumStr(date.getHours())}${twoDigitNumStr(
    date.getMinutes()
  )}${twoDigitNumStr(date.getSeconds())}`;

  return `${dateStr}-${timeStr}`;
}

function twoDigitNumStr(num: number) {
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
