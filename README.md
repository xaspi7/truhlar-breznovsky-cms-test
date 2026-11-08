# Truhlářství Březnovský - Web

Webové stránky pro truhlářství Vladimíra Březnovského z Vlašimi.

## 🚀 Rychlý start

```bash
# 1. Nainstaluj závislosti
npm install

# 2. Spusť vývojový server
npm run dev

# 3. Otevři v prohlížeči
# http://localhost:4321
```

## 📦 Struktura projektu

```
truhlar-astro/
├── public/
│   ├── favicon.svg          # Ikona webu
│   └── images/               # Všechny fotky (1-12.jpg)
│       ├── 1.jpg             # Hero + O mně pozadí
│       ├── 2.jpg             # O mně sekce
│       ├── 3.jpg             # Služby - Kuchyně
│       ├── 4.jpg             # Služby - Skříně
│       ├── 5.jpg             # Služby - Solitéry
│       └── 6-12.jpg          # Galerie
├── src/
│   ├── components/           # Komponenty webu
│   │   ├── Navbar.astro      # Horní navigace
│   │   ├── MobileNav.astro   # Spodní mobilní navigace
│   │   ├── Hero.astro        # Úvodní sekce
│   │   ├── About.astro       # O mně
│   │   ├── Services.astro    # Služby
│   │   ├── Gallery.astro     # Galerie s lightboxem
│   │   ├── Contact.astro     # Kontakt s formulářem
│   │   └── Footer.astro      # Patička
│   ├── layouts/
│   │   └── Layout.astro      # Hlavní layout
│   ├── pages/
│   │   └── index.astro       # Hlavní stránka
│   └── styles/
│       └── global.css        # Globální styly
├── astro.config.mjs          # Konfigurace Astro
├── package.json              # Závislosti
└── tsconfig.json             # TypeScript konfigurace
```

## 🖼️ Fotky

Všechny fotky jsou ve složce `public/images/` a jsou přímo propojené v komponentách:

| Soubor   | Použití                       |
| -------- | ----------------------------- |
| 1.jpg    | Hero pozadí (mobil + desktop) |
| 2.jpg    | Sekce "O mně"                 |
| 3.jpg    | Služby - Kuchyně              |
| 4.jpg    | Služby - Skříně               |
| 5.jpg    | Služby - Solitéry             |
| 6-12.jpg | Galerie                       |

## 📱 Kontaktní údaje

V kódu jsou nastaveny tyto kontaktní údaje:

- **Telefon**: +420 737 730 514
- **Email**: Joe.69@seznam.cz
- **Adresa**: Pavlovice 61, 258 01 Vlašim

Pro změnu kontaktů upravte:

- `src/components/Contact.astro`
- `src/components/MobileNav.astro`

## 🛠️ Příkazy

| Příkaz            | Popis                                 |
| ----------------- | ------------------------------------- |
| `npm install`     | Instalace závislostí                  |
| `npm run dev`     | Spuštění dev serveru (localhost:4321) |
| `npm run build`   | Vytvoření produkční verze do `dist/`  |
| `npm run preview` | Náhled produkční verze                |

## 🌐 Nasazení

### GitHub Pages / Netlify / Vercel

1. Pushni celý projekt na GitHub
2. Propoj s Netlify/Vercel
3. Build command: `npm run build`
4. Publish directory: `dist`

### Ruční nasazení

1. Spusť `npm run build`
2. Obsah složky `dist/` nahraj na hosting

## ✅ Checklist před nasazením

- [x] Všechny fotky v `public/images/` (1-12.jpg)
- [x] Správné telefonní číslo (+420 737 730 514)
- [x] Správný email (Joe.69@seznam.cz)
- [x] Správná adresa (Pavlovice 61, Vlašim)
- [x] Build proběhne bez chyb
- [x] Web funguje na mobilu i desktopu

---

Vytvořeno s ❤️ pomocí [Astro](https://astro.build)
