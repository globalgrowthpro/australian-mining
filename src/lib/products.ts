import heroStoneSupply from '@/assets/hero-stone-supply.png';
import heroPremiumSupply from '@/assets/hero-premium-supply.png';
import heroOnyxBlocks from '@/assets/hero-onyx-blocks.png';
import heroMarbleSlabs from '@/assets/hero-marble-slabs.png';
import heroStoneFinishing from '@/assets/hero-stone-finishing.png';

import productStone from '@/assets/product-stone.png';
import productBlocks from '@/assets/product-blocks.png';
import productSlabs from '@/assets/product-slabs.png';
import productPolishing from '@/assets/product-polishing.png';
import onyxBlocks from '@/assets/onyx-blocks.png';
import stoneBrochure from '@/assets/stone-brochure.png';

export type Material = {
  id: string;
  category: string;
  name: string;
  image: string;
  alt: string;
  description: string;
  detail: string;
  source: string;
  credit: string;
};

export type HeroSlide = {
  image: string;
  alt: string;
  caption: string;
  credit: string;
  source: string;
};

export const collectionHero = heroStoneSupply;

export const heroSlides: HeroSlide[] = [
  {
    image: heroStoneSupply,
    alt: 'Australian Mining & Manufacturing - From Nature to Timeless Spaces',
    caption: 'From Nature to Timeless Spaces',
    credit: 'Australian Mining & Manufacturing · Showcase',
    source: 'https://australian-mining.com.au',
  },
  {
    image: heroPremiumSupply,
    alt: 'Premium Stone Supply - Marble, Onyx, Travertine, Granite & Custom Dimensions',
    caption: 'Premium Stone Supply',
    credit: 'Australian Mining & Manufacturing · Showcase',
    source: 'https://australian-mining.com.au',
  },
  {
    image: heroOnyxBlocks,
    alt: 'Premium Onyx Blocks, Slabs, Flooring & Feature Walls',
    caption: 'Premium Onyx Blocks & Slabs',
    credit: 'Australian Mining & Manufacturing · Showcase',
    source: 'https://australian-mining.com.au',
  },
  {
    image: heroMarbleSlabs,
    alt: 'Natural Stone Marble Slabs - Flooring, Wall Cladding, Countertops',
    caption: 'Natural Marble Slabs Showcase',
    credit: 'Australian Mining & Manufacturing · Showcase',
    source: 'https://australian-mining.com.au',
  },
  {
    image: heroStoneFinishing,
    alt: 'Stone Finishing & Polishing Products - Pads, Abrasives & Chemicals',
    caption: 'Stone Finishing & Polishing',
    credit: 'Australian Mining & Manufacturing · Showcase',
    source: 'https://australian-mining.com.au',
  },
];

export const products = [
  {
    id: 'stone',
    number: '01',
    name: 'Natural stone',
    tag: 'THE MATERIAL',
    image: productStone,
    description: 'Natural stone for modern architecture, residential, commercial, and architectural projects.',
    detail: 'Timeless beauty and durability. Countertops, staircases, wall cladding, and custom specifications.',
  },
  {
    id: 'blocks',
    number: '02',
    name: 'Stone blocks',
    tag: 'THE FOUNDATION',
    image: productBlocks,
    description: 'Solid natural stone blocks sourced from trusted suppliers to meet your project requirements.',
    detail: 'Sourced from trusted quarries. Share your preferred material, dimensions, quantity, and delivery location.',
  },
  {
    id: 'slabs',
    number: '03',
    name: 'Stone slabs',
    tag: 'THE SURFACE',
    image: productSlabs,
    description: 'A wide range of natural stone slabs in different colors, patterns, and architectural finishes.',
    detail: 'Marble slabs, granite slabs, and onyx slabs with unique veins and rich colors for luxury surfaces.',
  },
  {
    id: 'polishing',
    number: '04',
    name: 'Polishing products',
    tag: 'THE FINISH',
    image: productPolishing,
    description: 'High-quality polishing products, abrasives, and sealers to bring out natural stone beauty.',
    detail: 'Polishing pads, diamond abrasives & discs, polishing compounds, and protective stone sealers.',
  },
];

export const materials: Material[] = [
  {
    id: 'natural-stone-architecture',
    category: 'stone',
    name: 'Natural Stone for Architecture',
    image: productStone,
    alt: 'Australian Mining & Manufacturing Natural Stone Showcase for modern architecture',
    description: 'Timeless beauty and durability for residential, commercial, and architectural projects.',
    detail: 'Ideal for stone blocks, stone slabs, countertops, staircases, and exterior wall cladding.',
    source: 'https://australian-mining.com.au',
    credit: 'Australian Mining & Manufacturing · Showcase',
  },
  {
    id: 'marble-slabs-showcase',
    category: 'slabs',
    name: 'Natural Marble Slabs',
    image: heroMarbleSlabs,
    alt: 'Australian Mining Marble Slabs Showcase displaying polished bookmatched marble slabs',
    description: 'Elegant natural marble slabs with unique veins and rich colors for flooring and countertops.',
    detail: 'Available in bookmatched, honed, or polished finishes for luxury interior and architectural spaces.',
    source: 'https://australian-mining.com.au',
    credit: 'Australian Mining & Manufacturing · Showcase',
  },
  {
    id: 'natural-stone-blocks',
    category: 'blocks',
    name: 'Natural Stone Blocks',
    image: productBlocks,
    alt: 'Natural Stone Blocks Showcase with massive cut marble blocks in quarry yard',
    description: 'Solid natural stone blocks sourced from trusted quarries for processing and fabrication.',
    detail: 'Specify the required stone type, block dimensions, quantity, and delivery destination.',
    source: 'https://australian-mining.com.au',
    credit: 'Australian Mining & Manufacturing · Showcase',
  },
  {
    id: 'premium-onyx-blocks',
    category: 'blocks',
    name: 'Premium Onyx Blocks',
    image: heroOnyxBlocks,
    alt: 'Premium Onyx Blocks Showcase with glowing golden-amber translucent onyx block',
    description: 'Natural beauty, exceptional elegance, and translucent banding for high-end luxury projects.',
    detail: 'Suitable for backlit onyx feature walls, luxury flooring, and custom architectural statements.',
    source: 'https://australian-mining.com.au',
    credit: 'Australian Mining & Manufacturing · Showcase',
  },
  {
    id: 'stone-finishing-polishing',
    category: 'polishing',
    name: 'Stone Finishing & Polishing',
    image: productPolishing,
    alt: 'Australian Stone Finishing Showcase displaying polishing equipment, diamond pads, and stone sealer',
    description: 'High-quality polishing products to bring out the natural beauty and durability of your stone.',
    detail: 'Complete range: Polishing pads, diamond abrasives & discs, polishing compounds, and stone sealers.',
    source: 'https://australian-mining.com.au',
    credit: 'Australian Mining & Manufacturing · Showcase',
  },
  {
    id: 'architectural-stone-slabs',
    category: 'slabs',
    name: 'Architectural Stone Slabs',
    image: productSlabs,
    alt: 'Australian Natural Stone Slabs Showcase featuring marble, granite, and onyx slabs',
    description: 'A wide range of natural stone slabs in different colors, patterns, and finishes.',
    detail: 'Supplying Marble Slabs, Granite Slabs, and Onyx Slabs tailored to your dimensional requirements.',
    source: 'https://australian-mining.com.au',
    credit: 'Australian Mining & Manufacturing · Showcase',
  },
  {
    id: 'premium-stone-supply',
    category: 'stone',
    name: 'Premium Stone Supply',
    image: heroPremiumSupply,
    alt: 'Premium Stone Supply Showcase for residential, commercial, and architectural projects',
    description: 'Natural stone blocks and slabs in a wide range of materials, finishes, and dimensions.',
    detail: 'Extensive portfolio including Marble, Onyx, Travertine, Granite, and custom cut-to-size dimensions.',
    source: 'https://australian-mining.com.au',
    credit: 'Australian Mining & Manufacturing · Showcase',
  },
  {
    id: 'timeless-spaces-supply',
    category: 'blocks',
    name: 'Quarry Stone Supply',
    image: heroStoneSupply,
    alt: 'From Nature to Timeless Spaces - Premium natural stone supply showcase',
    description: 'Premium natural stone blocks and slabs for residential and commercial architectural projects worldwide.',
    detail: 'Sourced from nature and prepared for interior solutions, exterior cladding, and architectural projects.',
    source: 'https://australian-mining.com.au',
    credit: 'Australian Mining & Manufacturing · Showcase',
  },
  {
    id: 'onyx-blocks-supply',
    category: 'stone',
    name: 'Onyx Blocks & Slabs',
    image: onyxBlocks,
    alt: 'Onyx Blocks Premium Natural Stone Supply Showcase',
    description: 'Selected premium onyx blocks and slabs characterized by exquisite translucency and warm gold tones.',
    detail: 'Ideal for backlighting, bespoke reception desks, luxury bathrooms, and feature wall installations.',
    source: 'https://australian-mining.com.au',
    credit: 'Australian Mining & Manufacturing · Showcase',
  },
  {
    id: 'stone-supply-brochure',
    category: 'blocks',
    name: 'Stone Supply Brochure',
    image: stoneBrochure,
    alt: 'Australian Mining & Manufacturing Stone Supply Brochure showcasing quarry blocks and finished surfaces',
    description: 'Sourced from trusted suppliers to meet your project requirements with the right material and finish.',
    detail: 'Review available quarry blocks, finished surfaces, and polishing products ready for export and distribution.',
    source: 'https://australian-mining.com.au',
    credit: 'Australian Mining & Manufacturing · Showcase',
  },
];

export function pageHead(title: string, description: string) {
  return {
    meta: [
      { title: `${title} | Australian Mining & Manufacturing` },
      { name: 'description', content: description },
      { property: 'og:title', content: `${title} | Australian Mining & Manufacturing` },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  };
}