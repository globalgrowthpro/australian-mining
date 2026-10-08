import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/company-logo.jpeg.asset.json';
import { products } from '@/lib/products';
import { BottomNav, InstallBanner, WhatsAppButton } from '@/components/mobile-extras';

const nav = [{ name: 'Home', to: '/' }, { name: 'Our products', to: '/products' }, { name: 'About us', to: '/about' }, { name: 'Contact', to: '/contact' }] as const;
export function Site({ children }: { children: ReactNode }) {
 const [open, setOpen] = useState(false);
 const trigger = useRef<HTMLButtonElement>(null);
 const mobileNav = useRef<HTMLElement>(null);
 useEffect(() => {
  if (!open) return;
  mobileNav.current?.querySelector<HTMLAnchorElement>('a')?.focus();
  function key(event: KeyboardEvent) {
   if (event.key === 'Escape') { setOpen(false); trigger.current?.focus(); }
   if (event.key === 'Tab') {
    const items = mobileNav.current?.querySelectorAll<HTMLAnchorElement>('a');
    if (!items?.length) return;
    const first = items[0], last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
   }
  }
  document.addEventListener('keydown', key);
  return () => document.removeEventListener('keydown', key);
 }, [open]);
 return <>
  <a href="#main-content" className="skip-link">Skip to content</a>
  <header className="site-header">
   <div className="site-container flex h-[112px] items-center justify-between gap-5 max-md:h-[88px]">
    <Link to="/" className="flex items-center gap-4 max-md:gap-2.5" aria-label="Australian Mining and Manufacturing home">
     <div className="brand-logo"><img src={logo.url} alt="Australian Mining & Manufacturing logo" width={74} height={74} /></div>
     <span className="font-display text-[15px] font-semibold leading-[1.5] max-md:text-[11px]">AUSTRALIAN MINING<span className="block text-[11px] font-normal tracking-[2px] max-md:text-[9px] max-md:tracking-[1px]">& MANUFACTURING</span></span>
    </Link>
    <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">{nav.map(item => <Link key={item.to} to={item.to} className="nav-link">{item.name}</Link>)}</nav>
    <Button asChild size="lg" className="hidden md:inline-flex"><Link to="/contact">Request a quote <ArrowUpRight /></Link></Button>
    <Button ref={trigger} variant="ghost" size="icon" className="lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
   </div>
   {open && <nav ref={mobileNav} id="mobile-menu" aria-label="Mobile navigation" className="site-container flex flex-col gap-3 border-t border-border py-5 lg:hidden">{nav.map(item => <Link to={item.to} key={item.to} className="nav-link" onClick={() => setOpen(false)}>{item.name}</Link>)}<Button asChild><Link to="/contact" onClick={() => setOpen(false)}>Request a quote <ArrowUpRight /></Link></Button></nav>}
  </header>
  <main id="main-content" className="max-md:pb-20">{children}</main>
  <WhatsAppButton />
  <InstallBanner />
  <BottomNav />
  <footer className="dark-band max-md:hidden">
   <div className="site-container grid gap-10 py-14 md:grid-cols-[2fr_1fr_1fr]">
    <div><div className="flex items-center gap-4"><div className="brand-logo"><img src={logo.url} alt="Company logo" width={74} height={74} loading="lazy" /></div><span className="font-display text-lg">Australian Mining<br />& Manufacturing</span></div><p className="mt-5 max-w-sm text-sm leading-7">Natural stone, blocks, slabs, and polishing products. A focused approach to stone supply.</p></div>
    <div><h3 className="mb-4 text-sm">Explore</h3><div className="flex flex-col gap-3 text-sm">{nav.map(item => <Link key={item.to} to={item.to}>{item.name}</Link>)}</div></div>
    <div><h3 className="mb-4 text-sm">Our products</h3><div className="flex flex-col gap-3 text-sm">{products.map(p => <Link key={p.id} to="/products" search={{ category: p.id }}>{p.name}</Link>)}</div></div>
   </div>
   <div className="site-container flex flex-wrap items-center justify-between gap-4 border-t border-background/15 py-6 text-[11px]"><p>© 2026 Australian Mining & Manufacturing</p><Link to="/privacy">Privacy</Link><p>Developer: Mr. Hafez Rahim</p></div>
  </footer>
 </>;
}
