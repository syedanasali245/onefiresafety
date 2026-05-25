export type Product = {
  title: string;
  slug: string;
  category: string;
  type: string;
  description: string;
};

export type ProductTypeGroup = {
  type: string;
  products: Product[];
};

export type ProductCategoryGroup = {
  category: string;
  types: ProductTypeGroup[];
};

export const MAIN_CATEGORIES = [
  "Fire Fighting Systems",
  "Fire Alarm Systems",
  "Emergency & Safety Systems",
  "Fire Rated Doors",
] as const;

const catalog: { category: string; types: { type: string; items: string[] }[] }[] = [
  {
    category: "Fire Fighting Systems",
    types: [
      {
        type: "Fire Cabinets",
        items: [
          "Single Door Surface Mounted Cabinet",
          "Single Door Recessed Cabinet",
          "Double Door Fire Cabinet",
          "Horizontal Fire Cabinet",
          "Vertical Fire Cabinet",
          "Hose Reel Cabinet",
          "Landing Valve Cabinet",
          "Foam System Cabinet",
        ],
      },
      {
        type: "Fire Sprinkler Systems",
        items: [
          "Upright Sprinklers",
          "Pendant Sprinklers",
          "Sidewall Sprinklers",
          "Recessed Sprinklers",
          "ESFR Sprinklers",
          "Storage Rack Sprinklers",
          "Concealed Sprinklers",
          "Quick Response Sprinklers",
        ],
      },
      {
        type: "Fire Pumps",
        items: [
          "EDJ Complete Pump Set",
          "Horizontal Split Case Pumps",
          "Vertical Turbine Pumps",
        ],
      },
      {
        type: "Fire Valves",
        items: [
          "Gate Valves",
          "Check Valves",
          "Alarm Valves",
          "Pressure Reducing Valves",
        ],
      },
      {
        type: "Suppression Systems",
        items: [
          "Gas Suppression Systems",
          "Foam Suppression Systems",
          "Aerosol Suppression Systems",
          "Kitchen Hood Suppression Systems",
          "Water Mist Systems",
          "Clean Agent Suppression Systems",
          "Electrical Panel Suppression Systems",
          "Data Center Fire Suppression Systems",
        ],
      },
    ],
  },
  {
    category: "Fire Alarm Systems",
    types: [
      {
        type: "Addressable Fire Alarm Systems",
        items: [
          "Addressable Fire Alarm Panels",
          "Intelligent Smoke Detectors",
          "Intelligent Heat Detectors",
          "Addressable Modules",
          "Addressable Sounders",
          "Addressable Manual Call Points",
        ],
      },
      {
        type: "Conventional Fire Alarm Systems",
        items: [
          "Conventional Fire Alarm Panels",
          "Smoke Detectors",
          "Heat Detectors",
          "Manual Call Points",
          "Alarm Sounders",
          "Flashers",
          "Sounder Bases",
        ],
      },
      {
        type: "Detection Systems",
        items: [
          "Beam Detectors",
          "Flame Detectors",
          "Gas Detectors",
          "Aspirating Smoke Detection Systems",
          "Multi Sensor Detectors",
        ],
      },
      {
        type: "Notification Systems",
        items: [
          "Alarm Sirens",
          "Horn Speakers",
          "Voice Evacuation Systems",
          "Emergency Announcement Systems",
          "Strobe Lights",
        ],
      },
      {
        type: "Fire Alarm Accessories",
        items: ["Fire Alarm Cables", "Batteries", "Power Supply Units", "Modules", "Junction Boxes"],
      },
    ],
  },
  {
    category: "Emergency & Safety Systems",
    types: [
      {
        type: "Emergency Exit Systems",
        items: [
          "Emergency Exit Signs",
          "LED Exit Signs",
          "Photoluminescent Exit Signs",
          "Double Side Exit Signs",
          "Emergency Directional Signs",
        ],
      },
      {
        type: "Safety Equipment",
        items: [
          "Safety Gloves",
          "Fire Resistant Gloves",
          "Industrial Safety Gloves",
          "Safety Helmets",
          "Safety Goggles",
          "Reflective Safety Jackets",
          "Safety Shoes",
          "Face Shields",
        ],
      },
      {
        type: "Fire Safety Equipment",
        items: [
          "Fire Blankets",
          "Fire Buckets",
          "Fire Extinguishers",
          "Fire Hose Reels",
          "Fire Hoses",
          "Nozzles",
          "Hose Cabinets",
        ],
      },
      {
        type: "PPE Equipment",
        items: [
          "Respirators",
          "Ear Protection",
          "Protective Coveralls",
          "Chemical Protection Suits",
          "Welding Protection Equipment",
        ],
      },
    ],
  },
  {
    category: "Fire Rated Doors",
    types: [
      {
        type: "Door Types",
        items: [
          "Steel Fire Rated Doors",
          "Wooden Fire Rated Doors",
          "Emergency Exit Doors",
          "Double Leaf Fire Doors",
          "Single Leaf Fire Doors",
          "Panic Bar Doors",
          "Acoustic Fire Doors",
        ],
      },
      {
        type: "Door Accessories",
        items: ["Panic Bars", "Door Closers", "Fire Rated Hinges", "Vision Panels", "Door Seals"],
      },
    ],
  },
];

export function slugify(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function productDescription(title: string, type: string, category: string): string {
  return `${title} — certified ${type.toLowerCase()} equipment for ${category.toLowerCase()} in commercial, industrial and public buildings.`;
}

function buildProduct(title: string, category: string, type: string): Product {
  return {
    title,
    slug: slugify(title),
    category,
    type,
    description: productDescription(title, type, category),
  };
}

export const PRODUCT_CATALOG: ProductCategoryGroup[] = catalog.map((cat) => ({
  category: cat.category,
  types: cat.types.map((t) => ({
    type: t.type,
    products: t.items.map((title) => buildProduct(title, cat.category, t.type)),
  })),
}));

export const PRODUCTS: Product[] = PRODUCT_CATALOG.flatMap((cat) =>
  cat.types.flatMap((t) => t.products),
);

export const FILTER_CATEGORIES = ["All", ...MAIN_CATEGORIES] as const;

export function getProductsByCategory(category: string): ProductCategoryGroup | undefined {
  return PRODUCT_CATALOG.find((c) => c.category === category);
}

export function getCatalogForFilter(category: string): ProductCategoryGroup[] {
  if (category === "All") return PRODUCT_CATALOG;
  const group = getProductsByCategory(category);
  return group ? [group] : [];
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameType = PRODUCTS.filter((p) => p.type === product.type && p.slug !== product.slug);
  if (sameType.length >= limit) return sameType.slice(0, limit);
  const sameCategory = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug && p.type !== product.type,
  );
  return [...sameType, ...sameCategory].slice(0, limit);
}

export const FEATURED_PRODUCTS = [
  "Fire Extinguishers",
  "Addressable Fire Alarm Panels",
  "ESFR Sprinklers",
  "Steel Fire Rated Doors",
  "LED Exit Signs",
  "EDJ Complete Pump Set",
  "Intelligent Smoke Detectors",
  "Emergency Exit Doors",
]
  .map((title) => PRODUCTS.find((p) => p.title === title))
  .filter((p): p is Product => Boolean(p));
