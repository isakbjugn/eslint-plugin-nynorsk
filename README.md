# eslint-plugin-nynorsk
ESLint-utviding for å lette arbeidet med nynorsk-omsetjingar med i18next

> Utvidinga er framleis under utvikling!

## Installasjon
```sh
# Køyr frå prosjektmappa di
npm install --save-dev @fagord/eslint-plugin-nynorsk # npm

yarn add --dev @fagord/eslint-plugin-nynorsk # yarn

pnpm add -D @fagord/eslint-plugin-nynorsk # pnpm
```

## i18next-oppsett
Utvidinga ventar at omsetjingar har utforminga
```js
const texts = {
  'nn': {
    'NYKEL': 'omsetjing'
  }
}
```

med hovudvekt på at feltet heiter `nn` og at omsetjingane finst som verdiar i eit JSON-liknande format.

> **Merk!**  
> På sikt ynskjer eg å tilby støtte for fleire format, om mogleg som noko ein kan spesifisere i ei konfigurasjonsfil.

## ESLint-konfigurasjon
Dette er den naudsynte konfigurasjonen i `.eslintrc.json` for å nytte regelen `ikkje-bokmal`:

```json
{
  "plugins": [
    "@fagord/nynorsk"
  ],
  "rules": {
    "@fagord/nynorsk/ikkje-bokmal": "warn"
  }
}
```
