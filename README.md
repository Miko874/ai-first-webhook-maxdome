# Example Workflow

## AI Request

```json
{
  "id": "id",
  "locale": "de",
  "name": "newAssets",
  "params": {},
  "session": {},
  "user": {
    "id": "id",
    "accessToken": ""
  }
}
```

## AI Response

```json
{
  "session": {
    "assetId": 17754527,
    "pageStart": 1,
    "intent": {
      "name": "newAssets",
      "params": {}
    }
  },
  "say": "Affenkönig",
  "display": {
    "title": "Affenkönig",
    "text": "Eine zügellose, ausgelassene Komödie über einen Lebemann, der seine ehemaligen Schulkameraden zum Feiern nach Südfrankreich einlädt. Eine provozierende Satire mit bitterbösen Blick auf das Lebensgefühl von Männern jenseits der 40."
  }
}
```
