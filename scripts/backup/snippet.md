# Snippet

## Get article links

### URL:

https://blog.hatena.ne.jp/goodrollings/monden-info.hatenablog.com/entries

### Code

```js
setInterval(() => {
  $(".pager > button").click();
}, 1000);
copy($(".entry-table-entry-title > a").map((i, elm) => $(elm).prop("href")));
```

## replace URLs

### Code

```
s/http://monden-info.hatenablog.com\/\//g
s/\/entry/(\d{4})/(\d{2})/(\d{2})/(\d{6})/\/articles\/$1-$2-$3-$4/g
s/\/entry\//\/articles\//g
```
