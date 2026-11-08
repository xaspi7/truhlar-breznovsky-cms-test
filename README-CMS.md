# Webyss CMS – samostatná testovací kopie

Tento repozitář je samostatný experiment s Decap CMS pro Truhlářství Březnovský. Je oddělený od živého webu \`breznovskytruhlar.cz\` a původního repozitáře.

## Co funguje
- Astro web sestavený z upravitelných JSON souborů v \`src/data/\`
- CMS formuláře v \`public/admin/config.yml\` pro úvodní texty, O mně, služby, galerii a kontakt
- Příprava pro GitHub Pages na cestě \`/truhlar-breznovsky-cms-test/\`
- Testovací kontaktní formulář nic neodesílá; robots.txt zakazuje indexaci

## Zprovoznění přihlášení
Decap CMS je připravené, ale přihlášení přes Google zatím **není zapojené**. V \`public/admin/config.yml\` je pouze dočasné \`backend: git-gateway\`, které bez autentizační služby nefunguje. Pro DecapBridge je nutné založit účet, přiřadit tento repozitář a získat jeho oficiální backend konfiguraci; nesdílet žádné přístupové tokeny v kódu, GitHub commitech ani chatu.

Pokud bude použit GitHub Pages, v Settings > Pages nastav Source na GitHub Actions a spusť připravený deploy workflow. Zatím není zaručeno, že veřejná testovací adresa už funguje.

## Lokální test
\`\`\`bash
npm ci
npm run dev
# v druhém terminálu:
npx decap-server
\`\`\`
Pak otevři http://localhost:4321/truhlar-breznovsky-cms-test/admin/ (v závislosti na režimu Astro může být potřeba /admin/).

## Bezpečnost
- Produkční doména ani původní repo se nemění.
- Testovací web má noindex a vypnuté skutečné odesílání poptávkového formuláře.
- Před pozváním klienta ověřit práva a zápis CMS pouze do tohoto testovacího repozitáře.
