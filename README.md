[![Dependency Status](https://david-dm.org/dragonprojects/ai-webhook-maxdome.svg)](https://david-dm.org/dragonprojects/ai-webhook-maxdome)
[![devDependency Status](https://david-dm.org/dragonprojects/ai-webhook-maxdome/dev-status.svg)](https://david-dm.org/dragonprojects/ai-webhook-maxdome?type=dev)

Webhook for maxdome supporting the AI JSON format.

# Example Workflow

## AI Request

```json
{
  "application": "application",
  "connector": "connector",
  "id": "id",
  "locale": "de",
  "name": "newAssets",
  "params": {},
  "secret": "secret",
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
