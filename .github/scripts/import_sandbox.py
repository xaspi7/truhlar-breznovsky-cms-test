from pathlib import Path

# Never deploy this test repository to the production domain.
astro = Path("astro.config.mjs")
a = astro.read_text()
assert 'site: "https://breznovskytruhlar.cz"' in a
a = a.replace('site: "https://breznovskytruhlar.cz",', 'site: "https://xaspi7.github.io",\n  base: "/truhlar-breznovsky-cms-test",')
astro.write_text(a)

p = Path("src/pages/index.astro")
s = p.read_text()
anchor = "const galleryImages = gallery.images;"
assert s.count(anchor) == 1
s = s.replace(anchor, '''const mediaPath = (path) => {
  const prefix = import.meta.env.BASE_URL;
  return path.startsWith(prefix) ? path : prefix + (path.startsWith("/") ? path.slice(1) : path);
};
const galleryImages = gallery.images.map(mediaPath);''')
for original, replacement, expected in [
  ('src={home.image}', 'src={mediaPath(home.image)}', 2),
  ('src={about.image}', 'src={mediaPath(about.image)}', 1),
  ('src={service.image}', 'src={mediaPath(service.image)}', 1),
  ('href="/favicon.svg"', 'href={mediaPath("/favicon.svg")}', 1),
]:
    assert s.count(original) == expected, (original, s.count(original))
    s = s.replace(original, replacement)
s = s.replace('<meta name="viewport" content="width=device-width, initial-scale=1.0">', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="robots" content="noindex,nofollow">')
s = s.replace('async submitForm(e) {', '''async submitForm(e) {
                                 // In the standalone test, contact forms must never reach a real recipient.
                                 if (e.target.dataset.preview === "true") {
                                     this.success = true;
                                     e.target.reset();
                                     return;
                                 }''')
assert s.count('data-form-endpoint=') == 1
s = s.replace('data-form-endpoint=', 'data-preview="true" data-form-endpoint=')
s = s.replace('>Odesláno!</h3>', '>Testovací režim</h3>')
s = s.replace('Potvrďte prosím aktivaci ve svém emailu (pouze poprvé).', 'Zpráva se z této testovací kopie neodesílá.')
s = s.replace("../content/", "../data/")
p.write_text(s)

content_directory = Path("src/content")
data_directory = Path("src/data")
data_directory.mkdir(exist_ok=True)
for item in content_directory.glob("*.json"):
    item.rename(data_directory / item.name)
content_directory.rmdir()

config = Path("public/admin/config.yml")
c = config.read_text()
assert 'branch: cms-sandbox' in c
c = c.replace('branch: cms-sandbox', 'branch: main')
c = c.replace('https://breznovskytruhlar.cz', 'https://xaspi7.github.io/truhlar-breznovsky-cms-test')
c = c.replace('public_folder: /images', 'public_folder: /truhlar-breznovsky-cms-test/images')
c = c.replace('# Testovací konfigurace pro větev cms-sandbox.', '# Samostatný testovací repozitář: xaspi7/truhlar-breznovsky-cms-test.')
c = c.replace('src/content/', 'src/data/')
config.write_text(c)

Path("public/robots.txt").write_text("User-agent: *\nDisallow: /\n")

Path("README-CMS.md").write_text("""# Webyss CMS – samostatná testovací kopie

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
""")
