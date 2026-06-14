# Themafer — website & CMS

> *Where Steel Takes Shape* — bedrijfswebsite voor maatwerk in staal, met een
> ingebouwd beheer (CMS) voor realisaties, blog en contactaanvragen.

## Stack

| Onderdeel | Technologie |
|---|---|
| Framework | **Next.js 16** (App Router, React 19, TypeScript) |
| Styling | **Tailwind CSS v4** — industrieel "blueprint"-design |
| Hosting | **Cloudflare Workers** via **`@opennextjs/cloudflare`** |
| Database | **Cloudflare D1** (SQLite) + **Drizzle ORM** |
| Bestandsopslag | **Cloudflare R2** (upload van foto's via de admin) |
| Login | **Better Auth** (e-mail + wachtwoord, één beheerder) |
| E-mail | **Resend** (meldingen contactformulier) |

## Pagina's

**Publiek:** Home (hero-carousel met slogan) · Over ons · Diensten (+7 subpagina's:
lassen, lasersnijden, plooien, montage, herstellingen, onderhoud, tekenwerk) ·
Werkwijze · Toepassingen (particulieren, industrie, infrastructuur) · Realisaties
(7 categorieën met projectgalerijen + lightbox) · Blog · Contact · Privacy ·
Algemene voorwaarden.

**Beheer (`/admin`):** dashboard, realisaties (CRUD + foto-uploads), blog (CRUD),
contactberichten (lezen/markeren/verwijderen).

---

## Lokaal draaien

```bash
# 1. Dependencies
npm install

# 2. Lokale variabelen
cp .dev.vars.example .dev.vars      # en vul BETTER_AUTH_SECRET in

# 3. Database aanmaken (lokaal) + seed met voorbeeldinhoud
npm run db:generate                 # migratie genereren (alleen na schemawijziging)
npm run db:migrate:local            # migratie toepassen op lokale D1
npx wrangler d1 execute themafer-db --local --file drizzle/seed.sql

# 4. Starten
npm run dev                         # http://localhost:3000
```

### Eerste beheerder aanmaken
Ga naar **http://localhost:3000/admin**. Bestaat er nog geen account, dan toont
de loginpagina automatisch een **"Eerste beheerder aanmaken"**-scherm. Daarna is
registratie vergrendeld (er kan maar één beheerder zijn). Account wissen om
opnieuw te beginnen:

```bash
npx wrangler d1 execute themafer-db --local --command "DELETE FROM user; DELETE FROM session; DELETE FROM account;"
```

---

## Beeldmateriaal (foto's)

De foto's worden geoptimaliseerd naar WebP in `public/images/`. Twee scripts:

```bash
node scripts/optimize-media.mjs      # banners + categorie-covers + sfeerbeelden
node scripts/build-realisaties.mjs   # projectgalerijen + genereert drizzle/seed.sql
```

> Het bronpad (`SRC`) bovenaan beide scripts wijst naar de WeTransfer-map.
> Pas dit aan als de originele foto's ergens anders staan.

Foto's die later via de **admin** worden geüpload, gaan naar **R2** en worden
geserveerd via `/api/media/...`.

---

## Productie-deploy naar Cloudflare

```bash
# 1. Inloggen
npx wrangler login

# 2. D1-database aanmaken → kopieer de database_id naar wrangler.jsonc
npx wrangler d1 create themafer-db

# 3. R2-buckets aanmaken
npx wrangler r2 bucket create themafer-media
npx wrangler r2 bucket create themafer-cache

# 4. Secrets instellen
npx wrangler secret put BETTER_AUTH_SECRET     # `openssl rand -base64 32`
npx wrangler secret put BETTER_AUTH_URL        # bv. https://www.themafer.be
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put CONTACT_NOTIFY_EMAIL

# 5. Database migreren (en optioneel seeden) op de remote D1
npx wrangler d1 migrations apply themafer-db --remote
npx wrangler d1 execute themafer-db --remote --file drizzle/seed.sql   # optioneel

# 6. Deployen
npm run deploy
```

> **Belangrijk:** vervang in [`wrangler.jsonc`](wrangler.jsonc) de placeholder
> `REPLACE_WITH_D1_DATABASE_ID` door de echte `database_id` uit stap 2.

### Resend
Voor het versturen van e-mails moet in Resend een **geverifieerd domein** staan.
Pas in [`app/(site)/contact/actions.ts`](app/(site)/contact/actions.ts) het
`from`-adres aan naar een adres op dat domein (nu `onboarding@resend.dev`, enkel
voor tests). Zonder `RESEND_API_KEY` worden berichten nog steeds **opgeslagen** in
de database (zichtbaar in de admin), enkel de e-mailmelding wordt overgeslagen.

---

## Inhoud aanpassen (zonder code)

- **Realisaties, blog, berichten:** via de admin op `/admin`.
- **Contactgegevens, diensten, teksten, navigatie:** in
  [`lib/site.ts`](lib/site.ts) — dit is de centrale bron voor alle vaste content.
  Vul hier de echte gegevens van Themafer in (adres, telefoon, e-mail, BTW, socials).

## Projectstructuur

```
app/
  (site)/        publieke pagina's (met header + footer)
  admin/         beheer: /login + (protected) dashboard & CRUD
  api/           auth (Better Auth) + media (R2)
components/      UI, header/footer, carousel, admin-formulieren
db/              Drizzle schema + client
lib/             site-config, queries, auth, media, helpers
drizzle/         migraties + seed.sql
scripts/         beeldoptimalisatie + seed-generatie
public/images/   geoptimaliseerde foto's
```

## Handige commando's

| Commando | Doel |
|---|---|
| `npm run dev` | Lokale ontwikkelserver |
| `npm run build` | Productiebuild (Next.js) |
| `npm run preview` | Lokaal testen in de Workers-runtime (OpenNext) |
| `npm run deploy` | Build + deploy naar Cloudflare |
| `npm run db:generate` | Migratie genereren uit het schema |
| `npm run db:migrate:local` | Migratie toepassen (lokaal) |
| `npm run cf-typegen` | Cloudflare-bindingtypes (her)genereren |
