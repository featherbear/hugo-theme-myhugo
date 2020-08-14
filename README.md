
Run this after your `hugo` build

```
sed -i "0,/REPLACE_ME/s//`date`/g" public/js/search.js
```

This will set the value of buildHash - which is used for cache changes

