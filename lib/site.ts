/**
 * Central site configuration & static content.
 * Single source of truth for navigation, company info, services,
 * applications, the "werkwijze" steps and the realisatie categories.
 *
 * NOTE: contact details are the client's real data. No street address
 * by choice (region only: Gent / Oost-Vlaanderen). Socials are still
 * empty — fill them in to activate the header/footer icons + sameAs.
 */

export const siteConfig = {
  name: "Thimafer",
  legalName: "Thimafer BV",
  slogan: "Where Steel Takes Shape",
  tagline:
    "Maatwerk in staal — van lassen en lasersnijden tot montage. Trappen, leuningen, poorten en staalconstructies, vakkundig uitgevoerd.",
  /** Self-contained meta description for the homepage / default. */
  description:
    "Thimafer is uw partner voor maatwerk in staal in Gent en Oost-Vlaanderen. Lassen, lasersnijden, plooien, montage, herstellingen, onderhoud en tekenwerk — alles in eigen beheer, van eerste tekening tot plaatsing op de werf.",
  url: "https://www.thimafer.be",
  locale: "nl-BE",
  /** Default social-share image (1200×630), generated to /public/og.jpg. */
  ogImage: "/og.jpg",
  ogImageAlt: "Thimafer — maatwerk in staal",
  contact: {
    addressLine: "Gent",
    postalCity: "Oost-Vlaanderen",
    country: "België",
    phone: "+32 495 84 56 78",
    phoneHref: "+32495845678",
    email: "info@thimafer.be",
    vat: "BE 0739.373.689",
    hours: "Ma–Vr 07:00–17:00",
  },
  /** Machine-readable business data for LocalBusiness structured data. */
  business: {
    city: "Gent",
    region: "Oost-Vlaanderen",
    /** ISO 3166-2 code for the province of East Flanders. */
    regionCode: "BE-VOV",
    countryCode: "BE",
    areaServed: ["Gent", "Oost-Vlaanderen"],
    /** Approximate centre of the service area (Gent). */
    geo: { latitude: 51.0543, longitude: 3.7174 },
    /** schema.org openingHours syntax. */
    openingHours: "Mo-Fr 07:00-17:00",
    priceRange: "€€",
    /** VAT without spaces/dots, as expected by schema.org vatID. */
    vatId: "BE0739373689",
  },
  socials: {
    facebook: "",
    instagram: "",
    linkedin: "",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const mainNav: NavItem[] = [
  { label: "Over ons", href: "/over-ons" },
  {
    label: "Diensten",
    href: "/diensten",
    children: [
      { label: "Lassen", href: "/diensten/lassen" },
      { label: "Lasersnijden", href: "/diensten/lasersnijden" },
      { label: "Plooien", href: "/diensten/plooien" },
      { label: "Montage", href: "/diensten/montage" },
      { label: "Herstellingen", href: "/diensten/herstellingen" },
      { label: "Onderhoud", href: "/diensten/onderhoud" },
      { label: "Tekenwerk", href: "/diensten/tekenwerk" },
    ],
  },
  {
    label: "Toepassingen",
    href: "/toepassingen",
    children: [
      { label: "Particulieren", href: "/toepassingen/particulieren" },
      { label: "Industrie", href: "/toepassingen/industrie" },
      { label: "Infrastructuur", href: "/toepassingen/infrastructuur" },
    ],
  },
  {
    label: "Realisaties",
    href: "/realisaties",
    children: [
      { label: "Trappen", href: "/realisaties/trappen" },
      { label: "Leuningen", href: "/realisaties/leuningen" },
      { label: "Poorten", href: "/realisaties/poorten" },
      { label: "Fietsenstallingen", href: "/realisaties/fietsenstallingen" },
      { label: "Staalconstructies", href: "/realisaties/staalconstructies" },
      { label: "Gevelconstructies", href: "/realisaties/gevelconstructies" },
      { label: "Stalen schrijnwerk", href: "/realisaties/stalen-schrijnwerk" },
    ],
  },
  { label: "Werkwijze", href: "/werkwijze" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export type Service = {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  points: string[];
};

export const services: Service[] = [
  {
    slug: "lassen",
    name: "Lassen",
    icon: "Flame",
    tagline: "MIG/MAG, TIG en elektrode",
    description:
      "Vakkundig laswerk in staal, inox en aluminium. Van fijne constructies tot zware staalbouw — sterk, strak en duurzaam afgewerkt.",
    points: [
      "MIG/MAG, TIG en elektrodelassen",
      "Staal, inox (RVS) en aluminium",
      "Degelijk en duurzaam laswerk",
      "Strakke, nette lasnaden",
    ],
  },
  {
    slug: "lasersnijden",
    name: "Lasersnijden",
    icon: "Zap",
    tagline: "Precisie tot op de millimeter",
    description:
      "Nauwkeurig lasersnijden van plaatstaal volgens uw tekening. Complexe vormen, perforaties en sierpanelen — herhaalbaar en strak.",
    points: [
      "Snijden van staal, inox en aluminium",
      "Complexe contouren en perforaties",
      "Op basis van uw DXF/DWG-tekening",
      "Seriewerk én enkelstuks",
    ],
  },
  {
    slug: "plooien",
    name: "Plooien",
    icon: "FoldVertical",
    tagline: "Kantwerk & profielen",
    description:
      "Plooien en kanten van plaatwerk tot exacte hoeken en profielen. Voor kaders, bekledingen, gevelpanelen en constructiedelen.",
    points: [
      "Precieze plooihoeken",
      "Profielen en kaders op maat",
      "Plaatdiktes voor diverse toepassingen",
      "Afgestemd op laswerk en montage",
    ],
  },
  {
    slug: "montage",
    name: "Montage",
    icon: "Wrench",
    tagline: "Plaatsing op de werf",
    description:
      "Professionele montage en plaatsing op locatie. Ons team zorgt voor een veilige, correcte en nauwkeurige installatie ter plaatse.",
    points: [
      "Montage op de werf",
      "Eigen ervaren montageteam",
      "Veilig en volgens planning",
      "Particulier en industrieel",
    ],
  },
  {
    slug: "herstellingen",
    name: "Herstellingen",
    icon: "Hammer",
    tagline: "Reparatie & versteviging",
    description:
      "Herstellen, verstevigen en aanpassen van bestaande staalconstructies. Snelle, vakkundige reparaties die jaren meegaan.",
    points: [
      "Herstel van staal en inox",
      "Verstevigen en aanpassen",
      "Lasreparaties ter plaatse of in atelier",
      "Snelle interventie",
    ],
  },
  {
    slug: "onderhoud",
    name: "Onderhoud",
    icon: "ShieldCheck",
    tagline: "Behoud en bescherming",
    description:
      "Preventief en correctief onderhoud van staalconstructies, trappen, leuningen en poorten — voor een lange levensduur.",
    points: [
      "Periodiek onderhoud",
      "Behandeling tegen corrosie",
      "Controle van constructies",
      "Onderhoudscontracten mogelijk",
    ],
  },
  {
    slug: "tekenwerk",
    name: "Tekenwerk",
    icon: "Ruler",
    tagline: "Engineering & 3D",
    description:
      "Van idee naar uitvoerbaar plan. Wij tekenen en engineeren uw project in 2D en 3D, klaar voor productie en montage.",
    points: [
      "2D- en 3D-tekenwerk",
      "Productieklare plannen",
      "Maatvoering en detaillering",
      "Advies over uitvoerbaarheid",
    ],
  },
];

export type Application = {
  slug: string;
  name: string;
  icon: string;
  description: string;
  points: string[];
};

export const applications: Application[] = [
  {
    slug: "particulieren",
    name: "Particulieren",
    icon: "Home",
    description:
      "Voor de particulier maken we maatwerk dat blijft: stalen trappen, leuningen, balustrades, poorten en stalen schrijnwerk — afgestemd op uw woning en smaak.",
    points: [
      "Trappen & leuningen op maat",
      "Poorten en hekwerk",
      "Stalen ramen en deuren",
      "Balustrades in staal, inox of glas",
    ],
  },
  {
    slug: "industrie",
    name: "Industrie",
    icon: "Factory",
    description:
      "Voor industriële klanten leveren we robuuste staalconstructies, bordessen, trappen en herstellingen — betrouwbaar en volgens planning.",
    points: [
      "Staalconstructies & bordessen",
      "Industriële trappen en leuningen",
      "Montage en herstellingen",
      "Onderhoud op contract",
    ],
  },
  {
    slug: "infrastructuur",
    name: "Infrastructuur",
    icon: "Building2",
    description:
      "Voor de publieke ruimte realiseren we gevelconstructies, fietsenstallingen, luifels en draagstructuren — duurzaam en onderhoudsarm.",
    points: [
      "Gevel- en draagconstructies",
      "Fietsenstallingen & overkappingen",
      "Gegalvaniseerde constructies",
      "Publieke en semi-publieke projecten",
    ],
  },
];

export type ProcessStep = {
  n: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    n: "01",
    title: "Eerste contact",
    description:
      "U vertelt ons uw idee of stuurt uw plannen door. We luisteren, denken mee en geven eerlijk advies.",
  },
  {
    n: "02",
    title: "Opmeting & advies",
    description:
      "We komen ter plaatse opmeten en bekijken samen de mogelijkheden, materialen en afwerking.",
  },
  {
    n: "03",
    title: "Offerte",
    description:
      "U ontvangt een duidelijke, transparante offerte zonder verrassingen.",
  },
  {
    n: "04",
    title: "Tekenwerk & engineering",
    description:
      "Na goedkeuring werken we uw project uit in productieklare 2D- en 3D-tekeningen.",
  },
  {
    n: "05",
    title: "Productie",
    description:
      "In ons atelier wordt uw project vakkundig gelast, gesneden en geplooid op maat.",
  },
  {
    n: "06",
    title: "Afwerking",
    description:
      "Stralen, galvaniseren of lakken — elke constructie wordt duurzaam beschermd en strak afgewerkt.",
  },
  {
    n: "07",
    title: "Montage & oplevering",
    description:
      "Ons team plaatst alles correct en veilig op locatie. We leveren netjes op en blijven beschikbaar voor nazorg.",
  },
];

export type Category = {
  slug: string;
  name: string;
  description: string;
};

export const categories: Category[] = [
  {
    slug: "trappen",
    name: "Trappen",
    description:
      "Stalen binnen- en buitentrappen op maat — van strakke spiltrappen tot robuuste gegalvaniseerde buitentrappen.",
  },
  {
    slug: "leuningen",
    name: "Leuningen",
    description:
      "Leuningen en balustrades in staal, inox of glas. Veilig, strak en perfect op maat afgewerkt.",
  },
  {
    slug: "poorten",
    name: "Poorten",
    description:
      "Stalen poorten en hekwerk — manueel of gemotoriseerd, sober of decoratief.",
  },
  {
    slug: "fietsenstallingen",
    name: "Fietsenstallingen",
    description:
      "Fietsenstallingen en overkappingen voor de publieke ruimte, bedrijven en residenties.",
  },
  {
    slug: "staalconstructies",
    name: "Staalconstructies",
    description:
      "Draagstructuren, bordessen en industriële staalbouw — berekend, gelast en gemonteerd.",
  },
  {
    slug: "gevelconstructies",
    name: "Gevelconstructies",
    description:
      "Stalen gevelconstructies en draagstructuren voor bekleding, met oog voor detail en duurzaamheid.",
  },
  {
    slug: "stalen-schrijnwerk",
    name: "Stalen schrijnwerk",
    description:
      "Stalen ramen, deuren en taatsdeuren met fijne profielen — tijdloos en op maat.",
  },
];

/** Hero imagery per application (maps to optimized files in /public). */
export const applicationImages: Record<string, string> = {
  particulieren: "/images/categories/trappen.webp",
  industrie: "/images/categories/staalconstructies.webp",
  infrastructuur: "/images/categories/fietsenstallingen.webp",
};

/** Which realisatie categories are most relevant per application. */
export const applicationCategories: Record<string, string[]> = {
  particulieren: ["trappen", "leuningen", "poorten", "stalen-schrijnwerk"],
  industrie: ["staalconstructies", "trappen", "leuningen"],
  infrastructuur: ["gevelconstructies", "fietsenstallingen", "staalconstructies"],
};

/**
 * Image per service (Diensten mega-menu, homepage cards & detail page).
 * Lassen = echte lasfoto, tekenwerk = technische tekening, montage = de
 * plaatsing op de werf. Voor lasersnijden/plooien/herstellingen/onderhoud
 * is er geen letterlijke techniekfoto aangeleverd → dichtstbijzijnde,
 * eerlijke staalfoto.
 */
export const serviceImages: Record<string, string> = {
  lassen: "/images/banners/banner-04.webp", // iemand aan het lassen (vonken)
  lasersnijden: "/images/categories/gevelconstructies.webp", // gesneden/geperforeerde panelen
  plooien: "/images/categories/stalen-schrijnwerk.webp", // geplooide profielen
  montage: "/images/feature/atelier.webp", // plaatsing op de werf (kraan)
  herstellingen: "/images/categories/poorten.webp",
  onderhoud: "/images/categories/trappen.webp",
  tekenwerk: "/images/banners/banner-05.webp", // technische tekening + gereedschap
};

export const certifications = [
  "Vakkundig laswerk",
  "Eigen engineering",
  "Eigen montageteam",
  "Belgisch vakmanschap",
];

/**
 * Extra, factual intro paragraph per service (rendered on the detail page
 * for SEO depth). Describes the technique and how Thimafer applies it —
 * consistent with each service's `points`, no invented specifics.
 */
export const serviceIntros: Record<string, string> = {
  lassen:
    "Lassen is het permanent verbinden van metalen door ze plaatselijk te laten smelten. Bij Thimafer gebeurt dat met MIG/MAG-, TIG- en elektrodelassen, afhankelijk van het materiaal en de toepassing. Zo verbinden we staal, inox en aluminium tot sterke, strak afgewerkte constructies — van fijn sierwerk tot zware staalbouw.",
  lasersnijden:
    "Bij lasersnijden wordt plaatmateriaal met een gefocuste laserstraal nauwkeurig en herhaalbaar gesneden. We werken op basis van uw digitale tekening (DXF/DWG) en snijden zo complexe contouren, perforaties en sierpanelen in staal, inox en aluminium — zowel enkelstuks als seriewerk.",
  plooien:
    "Plooien — of kanten — vormt plaatmateriaal tot exacte hoeken en profielen. Met de juiste plooihoeken maken we kaders, bekledingen, gevelpanelen en constructiedelen die naadloos aansluiten op het las- en montagewerk.",
  montage:
    "Een constructie is pas af wanneer ze correct geplaatst is. Ons eigen montageteam zorgt voor een veilige en nauwkeurige installatie op de werf, zowel bij particulieren als op industriële sites — volgens planning en met respect voor de omgeving.",
  herstellingen:
    "Bestaande staalconstructies raken na verloop van tijd soms beschadigd of hebben aanpassing nodig. We herstellen, verstevigen en passen staal en inox aan — in ons atelier of ter plaatse — zodat uw constructie weer jaren meekan.",
  onderhoud:
    "Met periodiek onderhoud blijven trappen, leuningen, poorten en staalconstructies veilig en mooi. We controleren constructies en behandelen ze tegen corrosie, indien gewenst via een onderhoudscontract.",
  tekenwerk:
    "Elk project begint bij een goed plan. We tekenen en engineeren uw constructie in 2D en 3D tot productieklare plannen, met de juiste maatvoering en detaillering — en denken mee over de uitvoerbaarheid.",
};

/**
 * Factual descriptive copy per realisatie category (rendered on the
 * category page when the slug matches). Describes the product type;
 * no invented project specifics.
 */
export const categoryCopy: Record<string, string> = {
  trappen:
    "Een stalen trap combineert sterkte met een strakke, tijdloze look. We maken binnen- en buitentrappen op maat — van rechte steektrappen en bordestrappen tot spiltrappen — in staal, eventueel gecombineerd met hout, glas of inox. Buitentrappen worden verzinkt of gelakt, zodat ze jarenlang weer en wind trotseren.",
  leuningen:
    "Een leuning of balustrade zorgt voor veiligheid én afwerking. We maken leuningen op maat in staal, inox of met glasvulling, voor trappen, bordessen, terrassen en mezzanines — strak gelast en netjes afgewerkt.",
  poorten:
    "Een stalen poort of hekwerk beveiligt en verfraait uw oprit of terrein. We maken manuele of gemotoriseerde poorten, schuif- of draaipoorten, sober of decoratief — telkens op maat van de opening en de gewenste stijl.",
  fietsenstallingen:
    "Fietsenstallingen en overkappingen in staal zijn robuust en onderhoudsarm. Ideaal voor de publieke ruimte, scholen, bedrijven en residenties — verzinkt voor een lange levensduur.",
  staalconstructies:
    "Staalconstructies vormen de ruggengraat van gebouwen en installaties. We maken draagstructuren, bordessen, kolommen en liggers — berekend, gelast en gemonteerd volgens de eisen van uw project.",
  gevelconstructies:
    "Stalen gevelconstructies dragen en omkaderen gevelbekleding. Met oog voor detail en duurzaamheid maken we draagstructuren die zowel technisch als esthetisch kloppen.",
  "stalen-schrijnwerk":
    "Stalen ramen, deuren en taatsdeuren met fijne profielen zijn tijdloos en sterk. We maken stalen schrijnwerk op maat — vaak met een industriële uitstraling — voor binnen en buiten.",
};

/** Frequently asked questions — only verifiable answers (drives FAQ rich results). */
export const faqs: { q: string; a: string }[] = [
  {
    q: "In welke regio is Thimafer actief?",
    a: "Thimafer is gevestigd in de regio Gent en werkt in heel Oost-Vlaanderen.",
  },
  {
    q: "Werken jullie voor particulieren én bedrijven?",
    a: "Ja. We werken zowel voor particulieren als voor industriële klanten en voor projecten in de publieke ruimte.",
  },
  {
    q: "Welke diensten biedt Thimafer aan?",
    a: "Lassen, lasersnijden, plooien, montage, herstellingen, onderhoud en tekenwerk — alle metaalbewerking onder één dak.",
  },
  {
    q: "In welke materialen werken jullie?",
    a: "Voornamelijk in staal, maar ook in inox (RVS) en aluminium.",
  },
  {
    q: "Plaatsen jullie de constructies ook zelf?",
    a: "Ja, montage en plaatsing op locatie maken deel uit van onze diensten. We doen dit met een eigen montageteam.",
  },
  {
    q: "Verzorgen jullie ook het tekenwerk?",
    a: "Ja. We tekenen en engineeren projecten in 2D en 3D tot productieklare plannen, klaar voor productie en montage.",
  },
  {
    q: "Hoe vraag ik een offerte aan?",
    a: "Via de offertepagina, of telefonisch en per e-mail. Hoe meer details u over uw project meegeeft, hoe gerichter ons voorstel.",
  },
  {
    q: "Wat zijn jullie openingsuren?",
    a: "We zijn bereikbaar op werkdagen van 07:00 tot 17:00.",
  },
];
