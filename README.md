# Browse

Ein Cloudflare-Worker-Workspace, der **ausschließlich freigegebene HTTPS-Websites** öffnen kann.
Er ist bewusst kein Web-Proxy und enthält keine Funktion zum Umgehen von Netzwerksperren,
Authentifizierung oder Sicherheitskontrollen.

## Bereitstellen

1. Lege die erlaubten Ursprünge als Cloudflare-Secret an (kommagetrennt):
   ```sh
   npx wrangler secret put ALLOWED_ORIGINS
   ```
   Beispiel: `https://intranet.example.com,https://docs.example.com`
2. Veröffentliche den Worker:
   ```sh
   npx wrangler deploy
   ```

Die Oberfläche prüft die Adresse erneut im Browser. Der Worker stellt nur die eigene
Oberfläche und die erlaubte Origin-Liste bereit; er ruft keine fremden Zielseiten ab.
Ziele mit `X-Frame-Options` oder `frame-ancestors` können die Einbettung verweigern.
Dann lässt sich das erlaubte Ziel über den Link in einem neuen Tab öffnen.

## Prüfung

```sh
npm test
```
