export interface Product {
  id: string;
  name: string;
  collection: string;
  collectionSlug: string;
  price: number;
  description: string;
  philosophy: string;
  materials: string[];
  dimensions: string;
  image: string;
  images: string[];
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
}

export const collections: Collection[] = [
  {
    id: '1',
    slug: 'monolith',
    name: 'The Monolith Collection',
    tagline: 'Permanence in form',
    description: 'Inspired by ancient stone monuments, each piece embodies weight, presence, and timeless stability. Crafted from solid materials that age gracefully.',
    image: '/placeholder.svg',
  },
  {
    id: '2',
    slug: 'stillness',
    name: 'The Stillness Collection',
    tagline: 'Quiet refinement',
    description: 'Furniture designed for contemplation. Clean lines, soft curves, and materials that invite pause. A meditation on space and silence.',
    image: '/placeholder.svg',
  },
  {
    id: '3',
    slug: 'origin',
    name: 'The Origin Series',
    tagline: 'Return to essence',
    description: 'Stripped to fundamental forms, this collection celebrates raw materials in their most honest expression. Wood grain, stone texture, metal patina.',
    image: '/placeholder.svg',
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Monolith Console',
    collection: 'The Monolith Collection',
    collectionSlug: 'monolith',
    price: 4800,
    description: 'A commanding presence in any entrance. Solid travertine with hand-finished edges.',
    philosophy: 'The console stands as a testament to permanence—a piece that grows more beautiful with each passing year, acquiring the patina of lived experience.',
    materials: ['Italian Travertine', 'Bronze Hardware'],
    dimensions: 'W 160cm × D 45cm × H 85cm',
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  },
  {
    id: '2',
    name: 'Monolith Dining Table',
    collection: 'The Monolith Collection',
    collectionSlug: 'monolith',
    price: 12500,
    description: 'Where gatherings become rituals. A singular slab of limestone on a blackened steel base.',
    philosophy: 'The dining table is the altar of the home—a place where stories are shared and bonds are strengthened.',
    materials: ['Portuguese Limestone', 'Blackened Steel'],
    dimensions: 'W 280cm × D 110cm × H 76cm',
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  },
  {
    id: '3',
    name: 'Stillness Lounge Chair',
    collection: 'The Stillness Collection',
    collectionSlug: 'stillness',
    price: 3200,
    description: 'Designed for hours of quiet contemplation. Oak frame with natural linen upholstery.',
    philosophy: 'In stillness, we find ourselves. This chair invites moments of reflection and rest.',
    materials: ['White Oak', 'Belgian Linen', 'Horsehair Fill'],
    dimensions: 'W 78cm × D 85cm × H 72cm',
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  },
  {
    id: '4',
    name: 'Stillness Daybed',
    collection: 'The Stillness Collection',
    collectionSlug: 'stillness',
    price: 5600,
    description: 'A sanctuary for rest. Solid walnut platform with organic cotton mattress.',
    philosophy: 'The daybed exists between waking and dreaming—a liminal space for restoration.',
    materials: ['American Walnut', 'Organic Cotton', 'Natural Latex'],
    dimensions: 'W 200cm × D 90cm × H 35cm',
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  },
  {
    id: '5',
    name: 'Origin Shelf System',
    collection: 'The Origin Series',
    collectionSlug: 'origin',
    price: 2800,
    description: 'Modular shelving that celebrates the beauty of raw materials. Blackened oak and patinated brass.',
    philosophy: 'Objects deserve a stage that honors their presence without competing for attention.',
    materials: ['Blackened Oak', 'Patinated Brass'],
    dimensions: 'W 180cm × D 35cm × H 200cm',
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  },
  {
    id: '6',
    name: 'Origin Side Table',
    collection: 'The Origin Series',
    collectionSlug: 'origin',
    price: 1400,
    description: 'A study in essential form. Solid bronze with a hand-rubbed finish.',
    philosophy: 'The most profound design removes everything unnecessary, leaving only truth.',
    materials: ['Cast Bronze'],
    dimensions: 'Ø 45cm × H 50cm',
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  },
];

export const getProductsByCollection = (slug: string): Product[] => {
  return products.filter((p) => p.collectionSlug === slug);
};

export const getCollectionBySlug = (slug: string): Collection | undefined => {
  return collections.find((c) => c.slug === slug);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};
