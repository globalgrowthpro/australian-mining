import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, ArrowUpRight, Layers3, Box, Gem, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Site, QuoteBand } from '@/components/site';
import { pageHead, products } from '@/lib/products';
import hero from '@/assets/stone-collection.jpg';

export const Route = createFileRoute('/')({ head: () => pageHead('Natural stone, blocks, slabs & polishing products', 'Australian Mining & Manufacturing supplies natural stone, stone blocks, slabs, and polishing products. Explore our products and discuss your requirements.'), component: Index });

function Index() {
 const icons = [Gem, Box, Layers3, Sparkles];
 return <Site>
  <section className="stone-hero">
   <img src={hero} alt="Representative display of veined marble slabs and cut stone blocks" width={1920} height={1024} fetchPriority="high" />
   <div className="site-container hero-content fade-in">
    <div className="eyebrow mb-6 flex items-center gap-3"><span className="h-px w-8 bg-gold" />NATURAL STONE. CONSIDERED SUPPLY.</div>
    <h1>Australian Mining<br />& Manufacturing</h1>
    <div className="my-7 h-px w-16 bg-gold" />
    <p className="max-w-[470px] text-[16px] leading-[1.8]">Stone, blocks, slabs, and polishing products.<br className="hidden md:block" /> Materials for your next project, from the foundation to the finish.</p>
    <div className="mt-9 flex flex-wrap gap-3"><Button asChild variant="hero" size="lg"><Link to="/products">Explore our products <ArrowUpRight /></Link></Button><Button asChild variant="heroOutline" size="lg"><Link to="/contact">Request a quote <ArrowRight /></Link></Button></div>
   </div>
   <span className="hero-footnote">Representative material imagery</span>
  </section>
  <div className="border-b border-border bg-card"><div className="site-container grid grid-cols-2 gap-6 py-7 md:grid-cols-4">{products.map((p,i) => { const Icon = icons[i]; return <Link key={p.id} to="/products" search={{ category: p.id }} className="flex items-center justify-center gap-3 text-xs font-medium md:text-sm">{Icon && <Icon className="size-5 text-primary" strokeWidth={1.4} />}{p.name}</Link>; })}</div></div>
  <section className="section">
   <div className="site-container">
    <div className="mb-10 flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow mb-4">OUR PRODUCT COLLECTION</p><h2 className="section-title">From raw material to refined finish.</h2></div><Link to="/products" className="flex items-center gap-3 border-b border-primary pb-2 text-xs font-medium text-primary">View all products <ArrowUpRight className="size-4" /></Link></div>
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">{products.map(p => <Link key={p.id} to="/products" search={{ category: p.id }} className="product-card"><div className="overflow-hidden rounded-sm"><img src={p.image} alt={p.name + ' — representative product image'} className="product-image" width={768} height={512} loading="lazy" /></div><div className="mt-5 flex items-center justify-between"><span className="eyebrow text-[9px]">{p.tag}</span><span className="text-[10px] text-muted-foreground">/{p.number}</span></div><div className="mt-2 flex items-center justify-between gap-2"><h3 className="text-[19px] font-semibold">{p.name}</h3><ArrowUpRight className="product-arrow size-4 text-primary" /></div><p className="mt-3 text-[13px] leading-6 text-muted-foreground">{p.description}</p></Link>)}</div>
   </div>
  </section>
  <section className="border-y border-border bg-card"><div className="site-container grid items-center gap-12 py-16 md:grid-cols-2"><div><p className="eyebrow mb-4">A FOCUSED APPROACH</p><h2 className="section-title">Stone is our business.<br />Your requirements come first.</h2><Button asChild variant="link" className="mt-5 px-0"><Link to="/about">About our company <ArrowUpRight /></Link></Button></div><div><p className="text-[15px] leading-8 text-muted-foreground">Australian Mining & Manufacturing is focused on the sale and supply of natural stone, stone blocks, slabs, and polishing products.</p><p className="mt-4 text-[15px] leading-8 text-muted-foreground">Whether you’re selecting material or planning a surface finish, start with the product, dimensions, and quantity you need. We’ll discuss the details with you.</p><div className="mt-7 flex items-center gap-3 border-t border-border pt-5 text-xs text-primary"><span className="h-px w-7 bg-gold" />Stone supply. Not quarry operations.</div></div></div></section>
  <section className="section"><div className="site-container"><p className="eyebrow mb-4">YOUR NEXT STEP</p><div className="grid gap-12 lg:grid-cols-[1fr_2fr]"><h2 className="section-title">Let’s get the<br />details right.</h2><div className="grid gap-8 sm:grid-cols-3">{[{name:'Share your requirements',text:'Tell us your product, dimensions, finish, and quantity.'},{name:'Discuss the options',text:'Review material suitability and availability with our team.'},{name:'Request a quotation',text:'Confirm the details for a quotation tailored to your enquiry.'}].map((s,i) => <div key={s.name} className="border-t border-border pt-5"><span className="font-display text-xl text-primary">0{i+1}</span><h3 className="mt-5 text-sm font-semibold">{s.name}</h3><p className="mt-3 text-xs leading-6 text-muted-foreground">{s.text}</p></div>)}</div></div></div></section>
  <QuoteBand />
 </Site>;
}
