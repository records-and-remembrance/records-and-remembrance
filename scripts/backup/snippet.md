# Snippet

## Get article links

### URL:

https://blog.hatena.ne.jp/goodrollings/monden-info.hatenablog.com/entries

### Code

```js
copy($('.entry-table-entry-title > a').map((i, elm) => $(elm).prop('href')))
```
