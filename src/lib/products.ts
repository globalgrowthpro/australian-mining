import marblePhoto from '@/assets/08_marble_veining.jpg.asset.json';
import blockPhoto from '@/assets/01_marble_block.jpg.asset.json';
import travertinePhoto from '@/assets/02_travertine.jpg.asset.json';
import limestonePhoto from '@/assets/03_limestone.jpg.asset.json';
import blueGranitePhoto from '@/assets/04_granite_countertop.jpg.asset.json';
import creamGranitePhoto from '@/assets/05_granite_texture.jpg.asset.json';
import finishingPhoto from '@/assets/06_diamond_disc.jpg.asset.json';
import slabPhoto from '@/assets/07_granite_slab_showroom.jpg.asset.json';

export type Material = { id: string; category: string; name: string; image: string; alt: string; description: string; detail: string; source: string; credit: string };
export const collectionHero = marblePhoto.url;
const stones = marblePhoto.url, blocks = blockPhoto.url, slabs = slabPhoto.url, polishing = finishingPhoto.url;

export const materials: Material[] = [
 { id: 'marble', category: 'stone', name: 'Veined marble', image: marblePhoto.url, alt: 'Photograph of a beige marble surface with natural brown veining', description: 'Expressive veining and natural variation for architectural surfaces.', detail: 'Share your preferred colour, intended application, dimensions and finish.', source: 'https://commons.wikimedia.org', credit: 'Wikimedia Commons' },
 { id: 'blue-granite', category: 'stone', name: 'Blue Pearl stone', image: blueGranitePhoto.url, alt: 'Photograph of polished Blue Pearl larvikite with blue-grey crystals', description: 'A crystalline blue-grey surface, commonly sold as Blue Pearl granite.', detail: 'Photograph depicts larvikite. Confirm the material type, surface finish and quantity required.', source: 'https://commons.wikimedia.org/wiki/File:Blue_Pearl_Granite_(larvikite)_(Larvik_Batholith,_292-298_Ma,_Early_Permian;_near_Larvik,_Norway)_2.jpg', credit: 'James St. John · CC BY 2.0 · resized' },
 { id: 'cream-granite', category: 'stone', name: 'Cream granite', image: creamGranitePhoto.url, alt: 'Photograph of a pale cream granite surface with mineral patterning', description: 'Light-toned stone with a softly mottled mineral pattern.', detail: 'Enquire about colour options, material suitability, quantity and finish.', source: 'https://commons.wikimedia.org/wiki/File:Cream_granite_rock_seamless_stone_surface_texture.jpg', credit: 'Sisters.seamless · CC0 · resized' },
 { id: 'marble-blocks', category: 'blocks', name: 'Marble blocks', image: blockPhoto.url, alt: 'Real photograph of cut Aurisina marble blocks in an outdoor material yard', description: 'Cut stone blocks for further processing and fabrication.', detail: 'Share the required material, block dimensions, quantity and delivery location. Image depicts Aurisina Fiorita marble.', source: 'https://commons.wikimedia.org/wiki/File:Blocco_di_marmo_Aurisina_Fiorita.jpg', credit: 'Alessandro Cragnolini · CC BY-SA 4.0 · resized' },
 { id: 'granite-slabs', category: 'slabs', name: 'Patterned granite slabs', image: slabPhoto.url, alt: 'Photograph of a polished decorative granite slab surface', description: 'Distinctive mineral patterning for interior and architectural surfaces.', detail: 'Specify your preferred colour, slab dimensions, thickness and finish.', source: 'https://commons.wikimedia.org', credit: 'Wikimedia Commons' },
 { id: 'limestone', category: 'stone', name: 'Sawn limestone', image: limestonePhoto.url, alt: 'Real close-up photograph of a sawn limestone block surface', description: 'A subtle, textured stone surface with naturally occurring variation.', detail: 'Tell us your application, dimensions and quantity. Suitability is confirmed on enquiry.', source: 'https://commons.wikimedia.org/wiki/File:Sawn_limestone_block_texture.jpg', credit: 'Titus Tscharntke · public domain · resized' },
 { id: 'travertine', category: 'stone', name: 'Travertine', image: travertinePhoto.url, alt: 'Real photograph of a travertine specimen with warm bands and natural pores', description: 'Naturally banded stone with individual texture and character.', detail: 'This photograph shows a material specimen, not a finished tile or slab. Discuss colour, fill and finish requirements.', source: 'https://commons.wikimedia.org/wiki/File:Travertin_1.jpg', credit: 'Karelj · public domain · resized' },
 { id: 'surface-finishing', category: 'polishing', name: 'Diamond surface finishing', image: finishingPhoto.url, alt: 'Real photograph of a double-ring diamond grinding cup wheel on a light background', description: 'Diamond abrasive products for stone surface preparation.', detail: 'The image shows a grinding cup wheel, not a polishing pad. Tell us the stone, tool compatibility and finishing stage you need.', source: 'https://commons.wikimedia.org/wiki/File:Diamatschleifteller_doppel_ring.JPG', credit: 'Diatools · CC BY-SA 3.0 · resized' },
];

export const products = [
  { id: 'stone', number: '01', name: 'Natural stone', tag: 'THE MATERIAL', image: stones, description: 'Natural stone for your material and project requirements.', detail: 'Tell us the stone type, colour, intended use, and quantity you need.' },
  { id: 'blocks', number: '02', name: 'Stone blocks', tag: 'THE FOUNDATION', image: blocks, description: 'Solid stone blocks for processing and fabrication.', detail: 'Share your preferred material, block dimensions, quantity, and delivery location.' },
  { id: 'slabs', number: '03', name: 'Stone slabs', tag: 'THE SURFACE', image: slabs, description: 'Stone slabs for architectural and interior applications.', detail: 'Let us know your material preference, slab dimensions, thickness, finish, and quantity.' },
  { id: 'polishing', number: '04', name: 'Polishing products', tag: 'THE FINISH', image: polishing, description: 'Products for stone polishing and surface finishing.', detail: 'Specify the stone surface, polishing product you require, and quantity.' },
];

export function pageHead(title: string, description: string) {
  return { meta: [{ title: `${title} | Australian Mining & Manufacturing` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} | Australian Mining & Manufacturing` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] };
}