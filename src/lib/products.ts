import stones from '@/assets/stones.jpg';
import blocks from '@/assets/blocks.jpg';
import slabs from '@/assets/slabs.jpg';
import polishing from '@/assets/polishing.jpg';

export const products = [
  { id: 'stone', number: '01', name: 'Natural stone', tag: 'THE MATERIAL', image: stones, description: 'Natural stone for your material and project requirements.', detail: 'Tell us the stone type, colour, intended use, and quantity you need.' },
  { id: 'blocks', number: '02', name: 'Stone blocks', tag: 'THE FOUNDATION', image: blocks, description: 'Solid stone blocks for processing and fabrication.', detail: 'Share your preferred material, block dimensions, quantity, and delivery location.' },
  { id: 'slabs', number: '03', name: 'Stone slabs', tag: 'THE SURFACE', image: slabs, description: 'Stone slabs for architectural and interior applications.', detail: 'Let us know your material preference, slab dimensions, thickness, finish, and quantity.' },
  { id: 'polishing', number: '04', name: 'Polishing products', tag: 'THE FINISH', image: polishing, description: 'Products for stone polishing and surface finishing.', detail: 'Specify the stone surface, polishing product you require, and quantity.' },
];

export function pageHead(title: string, description: string) {
  return { meta: [{ title: `${title} | Australian Mining & Manufacturing` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} | Australian Mining & Manufacturing` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] };
}