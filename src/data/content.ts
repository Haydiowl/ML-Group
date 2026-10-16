/**
 * Single source of truth for the fragrance + home scent catalogue.
 *
 * The rendering contract is unchanged: `Category` still needs title/quantity/
 * image and `Product` still needs name/stock/price/isNew/image. Everything
 * else below is additive metadata so the same catalogue can back a detail
 * view, filters or search later without reshaping the objects.
 *
 * All products and copy are demonstration content for this storefront
 * concept. There are no verified supplier specifications, awards,
 * certifications, customer reviews or sales figures here, and none should be
 * added without a real source.
 */

export type Category = {
  title: string;
  /** Stable URL segment, e.g. /categories/home-diffusers */
  slug: string;
  quantity: string;
  image: string;
  /** Shown on the category page. */
  description: string;
};

/** Row-major order — the grid reads left-to-right, top-to-bottom:
 *  row 1 = Personal Fragrance | Home Diffusers,  row 2 = Scented Candles | Gift Sets. */
export const categories: Category[] = [
  {
    title: 'Personal Fragrance',
    slug: 'personal-fragrance',
    quantity: '',
    image: '/assets/category-personal-fragrance.jpg',
    description:
      'Eau de parfums, eau de toilette and discovery sets built around named note structures, from bright citrus through to resinous oud.',
  },
  {
    title: 'Home Diffusers',
    slug: 'home-diffusers',
    quantity: '',
    image: '/assets/category-home-diffusers.jpg',
    description:
      'Reed diffusers in refillable glass bottles, each sized for a specific room and each throwing its scent at a different strength.',
  },
  {
    title: 'Scented Candles',
    slug: 'scented-candles',
    quantity: '',
    image: '/assets/category-scented-candles.jpg',
    description:
      'Poured candles in lidded glass jars, from a clean green botanical blend to a balsamic amber written for evening use.',
  },
  {
    title: 'Gift Sets',
    slug: 'gift-sets',
    quantity: '',
    image: '/assets/category-gift-sets.jpg',
    description:
      'Discovery sets for personal fragrance and home scent, sized as an introduction to the collection rather than a single full bottle.',
  },
];


export type ScentType = 'Personal Fragrance' | 'Home Fragrance';

export type Product = {
  /* ---- fields the existing components render (unchanged contract) ---- */
  name: string;
  /** Availability. Shown in the card's meta line, as before. */
  stock: string;
  price: string;
  isNew?: boolean;
  image: string;

  /* ---- identity ---- */
  id: string;
  slug: string;
  /** Shown on the card meta line instead of a bare availability string. */
  detail: string;
  /** Numeric price, used for sorting. */
  priceValue: number;

  /* ---- taxonomy ---- */
  type: ScentType;
  category: string;
  subcategory: string;

  /* ---- content ---- */
  alt: string;
  short: string;
  description: string;
  fragranceFamily?: string;
  topNotes?: string[];
  heartNotes?: string[];
  baseNotes?: string[];
  /** Personal fragrance only. */
  concentration?: string;
  /** Home fragrance only. */
  diffuserType?: string;
  capacity?: string;
  refillable?: boolean;
  room?: string;

  featured?: boolean;
  bestseller?: boolean;
};

/* The card renders `name` + `detail` + `price`. `detail` carries the variant
   line (size and format) so each product reads as a distinct scent item
   rather than sixteen copies of "In Stock". */

export const products: Product[] = [
  /* ------------------------------------------------------------------
     Personal fragrance
     ------------------------------------------------------------------ */
  {
    id: 'citrus-bloom-edt',
    slug: 'citrus-bloom-eau-de-toilette',
    name: 'Citrus Bloom Eau de Toilette',
    detail: '100 ml · Eau de Toilette',
    price: '$58',
    priceValue: 58,
    stock: 'In Stock',
    isNew: true,
    image: '/assets/product-citrus-bloom-edt.jpg',
    alt: 'Clear glass eau de toilette bottle photographed against a splash of water',
    type: 'Personal Fragrance',
    category: 'Personal Fragrance',
    subcategory: 'Fresh & Citrus',
    fragranceFamily: 'Citrus Floral',
    topNotes: ['Bergamot', 'Lemon Peel', 'Pink Pepper'],
    heartNotes: ['Neroli', 'Green Tea', 'Jasmine'],
    baseNotes: ['White Musk', 'Cedar'],
    concentration: 'Eau de Toilette',
    short: 'A bright, sparkling citrus opening that settles into soft white musk.',
    description:
      'Opens on cold bergamot and lemon peel with a flicker of pink pepper, then softens into neroli and green tea at the heart. A clean white musk and cedar base keeps it close to the skin rather than filling the room. Designed for daytime wear in spring and summer, and for anyone who wants a fragrance that reads as fresh without being sharp.',
    featured: true,
    bestseller: true,
  },
  {
    id: 'velvet-rose-edp',
    slug: 'velvet-rose-eau-de-parfum',
    name: 'Velvet Rose Eau de Parfum',
    detail: '50 ml · Eau de Parfum',
    price: '$96',
    priceValue: 96,
    stock: 'In Stock',
    image: '/assets/product-velvet-rose-edp.jpg',
    alt: 'Perfume bottle resting on knitted fabric beside pale roses',
    type: 'Personal Fragrance',
    category: 'Personal Fragrance',
    subcategory: 'Floral',
    fragranceFamily: 'Floral Musky',
    topNotes: ['Lychee', 'Blackcurrant', 'Pear'],
    heartNotes: ['Damask Rose', 'Peony', 'Violet Leaf'],
    baseNotes: ['Soft Musk', 'Cashmere Wood', 'Patchouli'],
    concentration: 'Eau de Parfum',
    short: 'A dense damask rose softened with cashmere wood and musk.',
    description:
      'A ripe floral that opens sweet and slightly tart on lychee and blackcurrant, then settles into damask rose and peony. The base is where it becomes distinctive: cashmere wood and a restrained patchouli give the rose weight without making it heavy. Suited to evening wear, autumn, or any occasion where a soft floral might feel too casual.',
    featured: true,
    bestseller: true,
  },
  {
    id: 'white-musk-fragrance',
    slug: 'white-musk-fragrance',
    name: 'White Musk Fragrance',
    detail: '50 ml · Eau de Parfum',
    price: '$72',
    priceValue: 72,
    stock: 'In Stock',
    image: '/assets/product-white-musk-fragrance.jpg',
    alt: 'Minimal square frosted glass fragrance bottle on a grey background',
    type: 'Personal Fragrance',
    category: 'Personal Fragrance',
    subcategory: 'Musk',
    fragranceFamily: 'Clean Musk',
    topNotes: ['Cotton Flower', 'Bergamot', 'Aldehydes'],
    heartNotes: ['White Musk', 'Iris', 'Rice Steam'],
    baseNotes: ['Ambrette', 'Sandalwood', 'Skin Musk'],
    concentration: 'Eau de Parfum',
    short: 'A clean, skin-like musk that reads as freshly laundered.',
    description:
      'Built around the softest part of the musk family. Cotton flower and a light aldehyde opening give it the impression of clean linen, iris and rice steam keep the middle quiet and translucent, and ambrette with sandalwood leaves a warm skin trace. Intended as an easy everyday scent that sits close and never competes with the person wearing it.',
    bestseller: true,
  },
  {
    id: 'amber-wood-edp',
    slug: 'amber-wood-eau-de-parfum',
    name: 'Amber Wood Eau de Parfum',
    detail: '50 ml · Eau de Parfum',
    price: '$88',
    priceValue: 88,
    stock: 'In Stock',
    image: '/assets/product-amber-wood-edp.jpg',
    alt: 'Small amber fragrance bottle on a stone pedestal against a beige backdrop',
    type: 'Personal Fragrance',
    category: 'Personal Fragrance',
    subcategory: 'Amber & Oriental',
    fragranceFamily: 'Woody Amber',
    topNotes: ['Bergamot', 'Cardamom', 'Saffron'],
    heartNotes: ['Cedarwood', 'Jasmine', 'Cinnamon Leaf'],
    baseNotes: ['Amber', 'Sandalwood', 'Soft Leather'],
    concentration: 'Eau de Parfum',
    short: 'Warm woods and amber, sharpened by saffron and cardamom.',
    description:
      'Cardamom and saffron give the opening some brightness before it settles into cedarwood and jasmine. The base is the point of the composition: amber, sandalwood and a suggestion of soft leather give it warmth and a low, woody depth that lasts through an evening. Made for cooler weather and for people who prefer something drier and less sweet than a typical amber fragrance.',
    featured: true,
  },
  {
    id: 'midnight-oud-edp',
    slug: 'midnight-oud-eau-de-parfum',
    name: 'Midnight Oud Eau de Parfum',
    detail: '75 ml · Eau de Parfum',
    price: '$145',
    priceValue: 145,
    stock: 'In Stock',
    image: '/assets/product-midnight-oud-edp.jpg',
    alt: 'Rounded dark fragrance bottle with flowers arranged beside it',
    type: 'Personal Fragrance',
    category: 'Personal Fragrance',
    subcategory: 'Woody',
    fragranceFamily: 'Oud & Woods',
    topNotes: ['Plum', 'Pink Pepper', 'Elemi'],
    heartNotes: ['Rose Absolute', 'Oud', 'Sandalwood'],
    baseNotes: ['Labdanum', 'Leather', 'Ambergris'],
    concentration: 'Eau de Parfum',
    short: 'Resinous oud tempered with plum and rose absolute.',
    description:
      'An oud that is rounded rather than raw. Plum and pink pepper soften the opening, rose absolute keeps the heart floral against the resinous oud, and a labdanum, leather and ambergris base gives it depth that carries into the evening. This is the most concentrated and least casual fragrance in the collection, intended for cooler months and smaller doses.',
  },
  {
    id: 'signature-discovery-set',
    slug: 'signature-scent-discovery-set',
    name: 'Scent Discovery Set',
    detail: '6 × 2 ml · Discovery Set',
    price: '$44',
    priceValue: 44,
    stock: 'In Stock',
    isNew: true,
    image: '/assets/product-signature-discovery-set.jpg',
    alt: 'A group of small unlabelled sample bottles arranged on a pale surface',
    type: 'Personal Fragrance',
    category: 'Gift Sets',
    subcategory: 'Discovery Set',
    fragranceFamily: 'Mixed',
    short: 'Six 2 ml vials spanning the citrus, floral, woody and musk families.',
    description:
      'A way into the collection rather than a single scent. Six 2 ml vials cover a fresh citrus, a soft floral, a woody amber, a clean musk, a resinous oud and a light fresh option, which is enough to wear each one properly before deciding. Packs flat for travel and works as a gift for someone whose taste you are still learning.',
    bestseller: true,
  },

  /* ------------------------------------------------------------------
     Home fragrance
     ------------------------------------------------------------------ */
  {
    id: 'soft-linen-reed-diffuser',
    slug: 'soft-linen-reed-diffuser',
    name: 'Soft Linen Diffuser',
    detail: '200 ml · Reed Diffuser',
    price: '$54',
    priceValue: 54,
    stock: 'In Stock',
    isNew: true,
    image: '/assets/product-soft-linen-reed-diffuser.jpg',
    alt: 'Reed diffuser bottle with natural reeds and dried flowers on burlap',
    type: 'Home Fragrance',
    category: 'Home Diffusers',
    subcategory: 'Reed Diffuser',
    fragranceFamily: 'Clean Floral',
    topNotes: ['Sea Salt', 'Bergamot'],
    heartNotes: ['Cotton Blossom', 'White Rose'],
    baseNotes: ['Soft Musk', 'Pale Woods'],
    diffuserType: 'Reed diffuser',
    capacity: '200 ml',
    refillable: true,
    room: 'Bedroom, hallway, bathroom',
    short: 'A clean cotton-and-musk scent suited to bedrooms and hallways.',
    description:
      'Opens on sea salt and bergamot, dries down to cotton blossom and white rose, and settles into a soft musk over pale woods. Aimed at smaller rooms and lighter moments rather than statement scent. Comes with eight reeds; the fragrance throws gently at first and grows stronger as more reeds are added.',
    featured: true,
  },
  {
    id: 'amber-woods-reed-diffuser',
    slug: 'amber-woods-reed-diffuser',
    name: 'Amber Woods Diffuser',
    detail: '250 ml · Reed Diffuser',
    price: '$62',
    priceValue: 62,
    stock: 'In Stock',
    image: '/assets/product-amber-woods-reed-diffuser.jpg',
    alt: 'Reed diffuser with dried botanicals photographed against a deep red background',
    type: 'Home Fragrance',
    category: 'Home Diffusers',
    subcategory: 'Reed Diffuser',
    fragranceFamily: 'Woody Amber',
    topNotes: ['Orange Peel', 'Black Pepper'],
    heartNotes: ['Cedar', 'Clove', 'Dried Fig'],
    baseNotes: ['Amber', 'Vanilla Absolute', 'Tonka'],
    diffuserType: 'Reed diffuser',
    capacity: '250 ml',
    refillable: true,
    room: 'Living room, study, hallway',
    short: 'Cedar, dried fig and amber for living spaces and cooler months.',
    description:
      'Orange peel and black pepper open it up, cedar and clove give it structure through the middle, and dried fig with vanilla absolute and tonka build a warm base that suits a living room or study. The larger 250 ml bottle suits open-plan spaces. Ships with ten reeds.',
    bestseller: true,
  },
  {
    id: 'cedar-vetiver-reed-diffuser',
    slug: 'cedar-vetiver-reed-diffuser',
    name: 'Cedar & Vetiver Diffuser',
    detail: '200 ml · Reed Diffuser',
    price: '$58',
    priceValue: 58,
    stock: 'In Stock',
    image: '/assets/product-cedar-vetiver-reed-diffuser.jpg',
    alt: 'Square clear glass reed diffuser with black reeds on a white surface',
    type: 'Home Fragrance',
    category: 'Home Diffusers',
    subcategory: 'Reed Diffuser',
    fragranceFamily: 'Woody Green',
    topNotes: ['Grapefruit', 'Bay Leaf'],
    heartNotes: ['Cedarwood', 'Vetiver', 'Cypress'],
    baseNotes: ['Moss', 'Sandalwood', 'Ambrette'],
    diffuserType: 'Reed diffuser',
    capacity: '200 ml',
    refillable: true,
    room: 'Entryway, bathroom, home office',
    short: 'A dry, green woody throw that suits entries and workspaces.',
    description:
      'Grapefruit and bay leaf open brightly, then the middle turns dry and earthy with cedarwood, vetiver and cypress. A moss, sandalwood and ambrette base gives it a quietly textured finish. Designed for entryways and home offices where a sharper green scent reads as tidy rather than sweet.',
  },
  {
    id: 'white-tea-fig-diffuser',
    slug: 'white-tea-and-fig-reed-diffuser',
    name: 'White Tea & Fig Diffuser',
    detail: '180 ml · Reed Diffuser',
    price: '$52',
    priceValue: 52,
    stock: 'In Stock',
    isNew: true,
    image: '/assets/product-white-tea-fig-diffuser.jpg',
    alt: 'Reed diffuser on a wooden windowsill beside a stack of books',
    type: 'Home Fragrance',
    category: 'Home Diffusers',
    subcategory: 'Reed Diffuser',
    fragranceFamily: 'Tea & Fruity',
    topNotes: ['Fig Leaf', 'Bergamot', 'Green Mandarin'],
    heartNotes: ['White Tea', 'Fig', 'Honey'],
    baseNotes: ['Blonde Woods', 'Soft Musk'],
    diffuserType: 'Reed diffuser',
    capacity: '180 ml',
    refillable: true,
    room: 'Bedroom, reading nook',
    short: 'Green fig leaf and white tea for reading spaces and bedrooms.',
    description:
      'Fig leaf and green mandarin give it a green-fruity lift, white tea keeps the heart light and slightly honeyed, and blonde woods with soft musk keep the base from getting heavy. A 180 ml bottle sized for a bedroom or reading nook rather than a main living space.',
  },
  {
    id: 'fig-cedar-candle',
    slug: 'fig-and-cedar-scented-candle',
    name: 'Fig & Cedar Scented Candle',
    detail: '220 g · Scented Candle',
    price: '$38',
    priceValue: 38,
    stock: 'In Stock',
    image: '/assets/product-fig-cedar-candle.jpg',
    alt: 'Scented candle in a glass jar with a wooden lid beside dried foliage',
    type: 'Home Fragrance',
    category: 'Scented Candles',
    subcategory: 'Candle',
    fragranceFamily: 'Woody Fruity',
    topNotes: ['Fig Leaf', 'Grapefruit Peel'],
    heartNotes: ['Fig', 'Cedar', 'Violet'],
    baseNotes: ['Blonde Wood', 'Vanilla', 'Ambrette'],
    capacity: '220 g',
    room: 'Living room, dining area',
    short: 'A woody fig candle in a lidded glass jar for living spaces.',
    description:
      'Fig leaf and grapefruit peel open into a ripe fig heart with cedar and a little violet, closing on blonde wood and a soft vanilla. Poured into a lidded glass jar so the lid doubles as a coaster. A 220 g candle burns for roughly 45 hours before needing a trim.',
  },
  {
    id: 'golden-amber-candle',
    slug: 'golden-amber-scented-candle',
    name: 'Golden Amber Scented Candle',
    detail: '220 g · Scented Candle',
    price: '$40',
    priceValue: 40,
    stock: 'In Stock',
    image: '/assets/product-golden-amber-candle.jpg',
    alt: 'Lit candle in a glass jar on a pink backdrop with decorative elements',
    type: 'Home Fragrance',
    category: 'Scented Candles',
    subcategory: 'Candle',
    fragranceFamily: 'Amber & Balsamic',
    topNotes: ['Bitter Orange', 'Saffron'],
    heartNotes: ['Frankincense', 'Labdanum', 'Immortelle'],
    baseNotes: ['Amber', 'Benzoin', 'Vanilla'],
    capacity: '220 g',
    room: 'Dining area, living room',
    short: 'Balsamic amber and incense for evenings and dining rooms.',
    description:
      'Bitter orange and saffron at the top, frankincense, labdanum and immortelle through the middle, and a benzoin and vanilla amber base. Written specifically for evening use — the incense notes are the strongest thing in the collection and suit a dining table or a room you light at the end of the day.',
    bestseller: true,
  },
  {
    id: 'botanical-calm-candle',
    slug: 'botanical-calm-scented-candle',
    name: 'Botanical Calm Candle',
    detail: '180 g · Scented Candle',
    price: '$36',
    priceValue: 36,
    stock: 'In Stock',
    image: '/assets/product-botanical-calm-candle.jpg',
    alt: 'Green glass candle jar with a lit candle and botanical leaves',
    type: 'Home Fragrance',
    category: 'Scented Candles',
    subcategory: 'Candle',
    fragranceFamily: 'Green Herbal',
    topNotes: ['Eucalyptus', 'Lemon', 'Basil Leaf'],
    heartNotes: ['Lavender', 'Shiso', 'Geranium'],
    baseNotes: ['Vetiver', 'Moss', 'Soft Cedar'],
    capacity: '180 g',
    room: 'Bathroom, home office, bedroom',
    short: 'Eucalyptus, lavender and vetiver in a smaller 180 g jar.',
    description:
      'Eucalyptus and lemon with basil leaf open it, lavender, shiso and geranium keep the middle herbal and slightly cool, and vetiver, moss and soft cedar ground it. The smallest candle in the range at 180 g, which suits a bathroom or office where a larger jar would be too much.',
  },
  {
    id: 'botanical-calm-fragrance-oil',
    slug: 'botanical-calm-fragrance-oil',
    name: 'Botanical Calm Oil',
    detail: '30 ml · Fragrance Oil',
    price: '$34',
    priceValue: 34,
    stock: 'In Stock',
    isNew: true,
    image: '/assets/product-botanical-calm-fragrance-oil.jpg',
    alt: 'Amber glass essential oil bottles arranged on a wooden surface',
    type: 'Home Fragrance',
    category: 'Home Diffusers',
    subcategory: 'Fragrance Oil',
    fragranceFamily: 'Green Herbal',
    topNotes: ['Lavender', 'Eucalyptus', 'Lemon Peel'],
    heartNotes: ['Geranium', 'Shiso', 'Cypress'],
    baseNotes: ['Vetiver', 'Sandalwood'],
    capacity: '30 ml',
    refillable: true,
    room: 'Diffusers, oil burners, linen',
    short: 'A concentrated green oil for diffusers, burners or linen.',
    description:
      'A more concentrated format than the room sprays, intended to be used sparingly in a diffuser or oil burner rather than worn. Lavender, eucalyptus and lemon peel over geranium, shiso and cypress, with vetiver and sandalwood underneath. Two or three drops in a diffuser; a few more if you are refreshing bedding.',
  },
  {
    id: 'fragrance-refill-bottle',
    slug: 'fragrance-refill-bottle',
    name: 'Fragrance Refill Bottle',
    detail: '100 ml · Refill',
    price: '$28',
    priceValue: 28,
    stock: 'In Stock',
    image: '/assets/product-fragrance-refill-bottle.jpg',
    alt: 'Amber glass dropper refill bottle on a wooden surface',
    type: 'Home Fragrance',
    category: 'Home Diffusers',
    subcategory: 'Refill',
    fragranceFamily: 'Unisex Woods',
    topNotes: ['Grapefruit', 'Juniper'],
    heartNotes: ['Cedar', 'Lavender', 'Violet'],
    baseNotes: ['Amber', 'Sandalwood', 'Tonka'],
    capacity: '100 ml',
    refillable: true,
    room: 'Compatible with 200 ml reed diffusers',
    short: 'A 100 ml refill that fits the 200 ml reed diffusers.',
    description:
      'The same woody base as the 200 ml reed diffusers, decanted into a smaller dropper bottle so an existing diffuser can be topped up instead of replaced. Fits the 200 ml Soft Linen and Cedar & Vetiver diffusers; not compatible with the 250 ml bottle, which takes a larger refill. Refill fittings are sold with the original product.',
  },
  {
    id: 'home-fragrance-discovery-collection',
    slug: 'home-fragrance-discovery-collection',
    name: 'Home Discovery Collection',
    detail: '4 × 10 ml · Discovery Set',
    price: '$48',
    priceValue: 48,
    stock: 'In Stock',
    isNew: true,
    image: '/assets/product-home-fragrance-discovery-collection.jpg',
    alt: 'A row of small amber glass bottles on a white background',
    type: 'Home Fragrance',
    category: 'Gift Sets',
    subcategory: 'Discovery Set',
    fragranceFamily: 'Mixed',
    capacity: '4 × 10 ml',
    short: 'Four 10 ml home fragrance vials — one candle, one diffuser, two oils.',
    description:
      'Four 10 ml vials covering a clean reed diffuser scent, a warm amber diffuser scent, a botanical oil and a woody oil, so you can try the home range before committing to a full bottle. Two of the vials can be decanted into the 200 ml diffusers to extend the trial.',
    bestseller: true,
  },
];

export const getCategoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);

/** Products assigned to a browsable category, in catalogue order. */
export const productsInCategory = (title: string) =>
  products.filter((p) => p.category === title);

/* Tile counts are derived from the catalogue rather than hand-written, so a
   product added, removed or recategorised can never leave a stale count on
   the homepage or a wrong total on the category page. */
for (const category of categories) {
  const count = productsInCategory(category.title).length;
  category.quantity = `${count} ${count === 1 ? 'pc' : 'pcs'}`;
}

export const getProductById = (id: string) => products.find((p) => p.id === id);
export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const productByIds = (ids: string[]) =>
  ids.map((id) => getProductById(id)).filter((p): p is Product => Boolean(p));

/** Distinct scent families present in the catalogue — the basis for filter facets. */
export const fragranceFamilies = Array.from(
  new Set(products.map((p) => p.fragranceFamily).filter((f): f is string => Boolean(f))),
).sort();

/** Real filter facets. The three pills below render in the existing filter row. */
export type FilterKey = 'all' | ScentType;

export const productFilters: { key: FilterKey; label: string; active: boolean }[] = [
  { key: 'all', label: 'All Items', active: true },
  { key: 'Personal Fragrance', label: 'Personal Fragrance', active: false },
  { key: 'Home Fragrance', label: 'Home Fragrance', active: false },
];

/** Products matching a filter facet, in catalogue order. */
export function filterProducts(key: FilterKey) {
  return key === 'all' ? products : products.filter((p) => p.type === key);
}

export type Testimonial = {
  review: string;
  name: string;
  role: string;
  avatar: string;
};

/** Demonstration testimonials for a concept storefront — not verified customer reviews. */
export const testimonialRows: Testimonial[][] = [
  [
    {
      review:
        'The Soft Linen diffuser has been the only scent in the flat nobody has complained\nabout. It reads as clean rather than sweet, which is rare for a reed diffuser.',
      name: 'Ethan Brooks',
      role: 'Interior stylist',
      avatar: '/assets/avatar-ethan-brooks.png',
    },
    {
      review:
        'I tried the discovery set before buying a full bottle and it genuinely saved me\nfrom a purchase I would have regretted. Four of the six are now in regular rotation.',
      name: 'Ava Mitchell',
      role: 'Buyer',
      avatar: '/assets/avatar-ava-mitchell.png',
    },
    {
      review:
        'Amber Wood sits close to the skin and lasts an evening without ever becoming\nloud. It is the first fragrance I have finished and immediately repurchased.',
      name: 'Ethan Walker',
      role: 'Architect',
      avatar: '/assets/avatar-ethan-walker.png',
    },
  ],
  [
    {
      review:
        'The refill bottle was the detail that convinced me. Replacing a whole diffuser\nevery couple of months felt wasteful, and this solves that without any fuss.',
      name: 'Emily Collins',
      role: 'Sustainability lead',
      avatar: '/assets/avatar-emily-collins.png',
    },
    {
      review:
        'Golden Amber is properly strong. In the dining room it carries, which is what I\nwanted, though it is far too much for a bedroom in my opinion.',
      name: 'James Walker',
      role: 'Restaurateur',
      avatar: '/assets/avatar-james-walker.png',
    },
    {
      review:
        'Ordering went smoothly and the bottles arrived properly sealed with no leaks.\nThe Botanical Calm oil is now the one I reach for when I want the flat to feel settled.',
      name: 'Isabella Reed',
      role: 'Photographer',
      avatar: '/assets/avatar-isabella-reed.png',
    },
  ],
];

export type Feature = {
  title: string;
  body: string;
  icon: 'spark' | 'gear';
};

export const features: Feature[] = [
  {
    title: 'Composed, Not Assembled',
    body: 'Every scent is built around a named note structure rather than a single hero ingredient.',
    icon: 'spark',
  },
  {
    title: 'Formats That Suit the Room',
    body: 'The same fragrance in formats made for skin, air and fabric, so layering actually works.',
    icon: 'gear',
  },
];

/** Illustrative storefront figures for a concept build — not verified sales data. */
export const stats = [
  { value: '16+', label: 'Scents in the Collection', size: 32 },
  { value: '9,000+', label: 'Community Members', size: 30.9 },
  { value: '1,000+', label: 'Orders This Month', size: 32 },
  { value: '299+', label: 'Reviews', size: 31.5 },
];

export type Post = {
  title: string;
  body: string;
  image: string;
};

export const posts: Post[] = [
  {
    title: 'Choosing Your Fragrance Family',
    body: 'How to narrow a large catalogue down to the one or two scents that suit you.',
    image: '/assets/blog-choosing-your-fragrance-family.jpg',
  },
  {
    title: 'Caring for a Reed Diffuser',
    body: 'Reed count, liquid colour and refill timing, explained simply.',
    image: '/assets/blog-how-to-care-for-a-reed-diffuser.jpg',
  },
  {
    title: 'Layering Home Fragrance',
    body: 'How to combine candles, diffusers and mists without muddying a room.',
    image: '/assets/blog-home-fragrance-layering-guide.jpg',
  },
];

export const navLinks = ['Categories', 'Products', 'Scent Guides', 'Newsletter'];

export const footerPages = ['Home', 'About', 'Blogs', '404'];

export const footerCategories = [
  'Personal Fragrance',
  'Home Diffusers',
  'Scented Candles',
  'Gift Sets',
];

export const socials = ['Twitter/X', 'Instagram', 'Framer '];

export const promoPrefix = 'Discover your signature scent  ';

export const promoCode = 'NEW SCENT COLLECTIONS';