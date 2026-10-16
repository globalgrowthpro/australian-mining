import { createFileRoute, Link } from '@tanstack/react-router';
import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Site } from '@/components/site';
import { MaterialCard } from '@/components/material-card';
import { materials, products, pageHead } from '@/lib/products';

export const Route = createFileRoute('/products')({ validateSearch: (search: Record<string, unknown>): { category?: string } => ({ category: typeof search['category'] === 'string' && products.some(p => p.id === search['category']) ? search['category'] : 'all' }), head: () => pageHead('Our products', 'Explore natural stone, blocks, slabs, and polishing products from Australian Mining & Manufacturing.'), component: Products });
function Products() {
 const { category } = Route.useSearch();
 const [query, setQuery] = useState('');
 const shown = materials.filter(p => (!category || category === 'all' || p.category === category) && `${p.name} ${p.description}`.toLowerCase().includes(query.trim().toLowerCase()));
 return <Site>
  <section className="bg-card pt-14 pb-10 md:pt-16"><div className="site-container">
   <div className="flex items-start justify-between gap-8"><div><p className="eyebrow mb-4">THE MATERIAL COLLECTION</p><h1 className="section-title text-4xl md:text-5xl">Our products</h1><p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">Explore stone materials, blocks, slabs and surface finishing products. Start with the material. We’ll discuss the specifications.</p></div><span className="hidden border-l border-border pl-8 pt-1 text-xs leading-6 text-muted-foreground md:block">Natural variation.<br />Considered selection.</span></div>
   <div className="catalog-toolbar mt-9"><nav aria-label="Product categories" className="flex flex-wrap gap-2">{[{id:'all',name:'All products'},...products].map(p => <Button key={p.id} asChild variant={category === p.id ? 'default' : 'ghost'} size="sm"><Link to="/products" search={{ category: p.id }} aria-current={category === p.id ? 'page' : undefined}>{p.name}</Link></Button>)}</nav><label className="catalog-search"><Search className="size-4 shrink-0 text-muted-foreground" /><input aria-label="Search products" placeholder="Search materials…" value={query} onChange={e => setQuery(e.target.value)} />{query && <Button variant="ghost" size="icon" className="size-5 shrink-0" onClick={() => setQuery('')} aria-label="Clear search"><X /></Button>}</label></div>
  </div></section>
  <section className="pb-16 pt-7"><div className="site-container"><div className="mb-6 flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-muted-foreground" aria-live="polite">{shown.length} {shown.length === 1 ? 'product example' : 'product examples'}</p><p className="text-[11px] text-muted-foreground">Real photographs · Availability on enquiry</p></div>
   <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{shown.map(p => <MaterialCard key={p.id} material={p} />)}</div>
   {!shown.length && <div className="py-20 text-center"><Search className="mx-auto size-8 text-muted-foreground" /><h2 className="mt-5 text-xl">No matching materials</h2><p className="mt-3 text-sm text-muted-foreground">Try another material name or choose a different category.</p><Button variant="outline" className="mt-5" onClick={() => setQuery('')}>Clear search</Button></div>}
   <p className="mt-10 border-t border-border pt-6 text-xs leading-6 text-muted-foreground">This collection presents material and product examples, not confirmed stock. Photographs are sourced from independent photographers; natural colour, texture, sizes and finishes vary. Please confirm your requirements and availability before ordering.</p>
  </div></section>
 </Site>;
}