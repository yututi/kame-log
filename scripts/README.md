cloud storage に温度情報を書き込み続ける

任意のバケットに{dirname}/YYYYMMDD.json ファイルを生成

### format

```
[
  {
    temperature?: number;
    humidity?: number;
    at: string; // ISOformat datetime
  },
  ...
]
```
