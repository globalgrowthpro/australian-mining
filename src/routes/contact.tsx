import { createFileRoute } from '@tanstack/react-router';
import { Download, Lock, Mail, MapPin, Phone } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Site } from '@/components/site';
import { Button } from '@/components/ui/button';
import { products, pageHead, collectionHero } from '@/lib/products';
const slabs = collectionHero;
const stones = collectionHero;

const EMAIL = 'ateff9612@gmail.com';
const PHONE = '+61 450 995 387';

export const Route = createFileRoute('/contact')({ validateSearch: (search: Record<string, unknown>): { product?: string; material?: string } => ({ product: typeof search['product'] === 'string' && products.some(p => p.id === search['product']) ? search['product'] : '', material: typeof search['material'] === 'string' ? search['material'].slice(0, 100) : '' }), head: () => pageHead('Contact us', 'Contact Australian Mining & Manufacturing about natural stone, blocks, slabs, and polishing products.'), component: Contact });

function Contact() {
 const { product, material } = Route.useSearch();
 const [prepared, setPrepared] = useState(false);
 function submit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const text = 'Australian Mining & Manufacturing — Product enquiry\n\n' + Array.from(data.entries()).map(([key, value]) => `${key}: ${value}`).join('\n');
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
  const link = document.createElement('a'); link.href = url; link.download = 'stone-product-enquiry.txt'; link.click(); URL.revokeObjectURL(url); setPrepared(true);
 }
 const info = [
  { icon: Mail, label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: Phone, label: 'Phone', value: PHONE, href: `tel:${PHONE.replace(/\s/g, '')}` },
  { icon: MapPin, label: 'Location', value: 'Australia', note: 'Full address to be confirmed.' },
 ];
 return <Site>
  <section className="relative overflow-hidden border-b border-border">
   <img src={slabs} alt="" className="absolute inset-y-0 right-0 hidden h-full w-3/5 object-cover md:block" />
   <div className="absolute inset-0 hidden bg-gradient-to-r from-background via-background/90 to-transparent md:block" />
   <div className="site-container relative py-20">
    <p className="eyebrow">CONTACT US</p><span className="mt-3 block h-0.5 w-10 bg-gold" />
    <h1 className="mt-6 font-display text-5xl font-semibold leading-tight md:text-6xl">Let’s discuss<br /><span className="text-primary">your project.</span></h1>
    <p className="mt-6 max-w-lg leading-7 text-muted-foreground">Get in touch about natural stone, blocks, slabs, or polishing products. Tell us what you need and we’ll help you find the right material.</p>
   </div>
  </section>
  <section className="section bg-muted/40"><div className="site-container grid gap-8 md:grid-cols-[1fr_1.4fr]">
   <aside className="rounded-lg border border-border bg-card p-8">
    <h2 className="text-3xl font-semibold">Contact information</h2><span className="mt-3 block h-0.5 w-10 bg-gold" />
    <p className="mt-5 leading-7 text-muted-foreground">Reach out to discuss materials, quantities, or to request a quote.</p>
    <ul className="mt-8 space-y-6">{info.map(i => <li key={i.label} className="flex items-center gap-5"><span className="grid size-14 shrink-0 place-items-center rounded-full bg-secondary text-primary"><i.icon className="size-6" /></span><div><p className="font-semibold">{i.label}</p>{i.href ? <a href={i.href} className="hover:text-primary">{i.value}</a> : <p>{i.value}</p>}{i.note && <p className="text-xs text-muted-foreground">{i.note}</p>}</div></li>)}</ul>
    <img src={stones} alt="Natural stone selection" loading="lazy" className="mt-8 aspect-[4/3] w-full rounded-md object-cover" />
   </aside>
   <form onSubmit={submit} onChange={() => setPrepared(false)} className="space-y-5 rounded-lg border border-border bg-card p-8">
    <h2 className="text-3xl font-semibold">Prepare an enquiry</h2><span className="block h-0.5 w-10 bg-gold" />
    <p className="leading-7 text-muted-foreground">Fill in your requirements, download them, and email the file to us at <a href={`mailto:${EMAIL}`} className="text-primary underline">{EMAIL}</a>.</p>
    <div className="grid gap-5 sm:grid-cols-2">
     <label className="text-sm font-medium">Full name *<input name="Full name" required autoComplete="name" placeholder="Enter your full name" className="form-field" /></label>
     <label className="text-sm font-medium">Email *<input type="email" name="Email" required autoComplete="email" placeholder="Enter your email address" className="form-field" /></label>
     <label className="text-sm font-medium">Company name<input name="Company" autoComplete="organization" placeholder="Enter company name" className="form-field" /></label>
     <label className="text-sm font-medium">Phone<input type="tel" name="Phone" autoComplete="tel" placeholder="Enter your phone number" className="form-field" /></label>
    </div>
    <label className="block text-sm font-medium">Product category *<select key={product} name="Product" required defaultValue={product} className="form-field"><option value="" disabled>Select a product</option>{products.map(p => <option value={p.id} key={p.id}>{p.name}</option>)}<option value="general">General enquiry</option></select></label>
    <label className="block text-sm font-medium">Project / delivery location<input name="Location" placeholder="Enter project location" className="form-field" /></label>
     <label className="block text-sm font-medium">Your requirements *<textarea key={material} defaultValue={material ? `Product of interest: ${material}\n` : ''} name="Requirements" required maxLength={3000} rows={5} className="form-field" placeholder="Material, dimensions, thickness, finish, and quantity…" /></label>
    <div className="flex gap-4 rounded-md bg-secondary/40 p-4"><Lock className="mt-0.5 size-5 shrink-0 text-primary" /><p className="text-xs leading-6 text-muted-foreground"><strong className="block text-sm text-foreground">Your information stays with you</strong>Details stay in your browser until you download them. Nothing is sent or stored by this website.</p></div>
    <Button type="submit" size="lg" className="w-full"><Download />Download enquiry</Button>
    {prepared && <div role="status" className="border-l-2 border-primary bg-secondary/30 p-4 text-sm leading-6">Your file is ready. Attach it to an email to {EMAIL} — it has not been sent yet.</div>}
   </form>
  </div></section>
 </Site>;
}
