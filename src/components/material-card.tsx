import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { products, type Material } from '@/lib/products';

export function MaterialCard({ material }: { material: Material }) {
 const category = products.find(p => p.id === material.category);
 return <article className="catalog-card">
  <Dialog>
   <div className="catalog-photo relative">
    <img src={material.image} alt={material.alt} width={800} height={600} loading="lazy" />
    <DialogTrigger asChild><Button variant="outline" size="icon" className="absolute bottom-3 right-3 bg-card" aria-label={`View ${material.name}`} title={`View ${material.name}`}><Maximize2 /></Button></DialogTrigger>
   </div>
   <div className="p-5">
    <p className="eyebrow text-[10px]">{category?.name}</p>
    <DialogTrigger asChild><Button variant="link" className="mt-2 h-auto justify-start whitespace-normal p-0 text-left text-lg font-semibold text-foreground no-underline">{material.name}</Button></DialogTrigger>
    <p className="mt-2 min-h-12 text-xs leading-6 text-muted-foreground">{material.description}</p>
    <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-4"><span className="text-[10px] text-muted-foreground">Material example</span><Button asChild variant="link" size="sm" className="h-auto px-0"><Link to="/contact" search={{ product: material.category, material: material.name }}>Enquire <ArrowUpRight /></Link></Button></div>
   </div>
   <DialogContent className="material-dialog">
    <img src={material.image} alt={material.alt} className="material-detail-photo" width={1000} height={600} />
    <div className="p-6 sm:p-8">
     <p className="eyebrow mb-3">{category?.name}</p>
     <DialogTitle className="text-2xl leading-tight">{material.name}</DialogTitle>
     <DialogDescription className="mt-4 leading-7">{material.description} {material.detail}</DialogDescription>
     <p className="mt-4 border-t border-border pt-4 text-xs leading-6 text-muted-foreground">Photograph shows a material example, not our inventory. Colour, dimensions, finish and availability must be confirmed with your enquiry.</p>
     <Button asChild size="lg" className="mt-5"><Link to="/contact" search={{ product: material.category, material: material.name }}>Enquire about this product <ArrowUpRight /></Link></Button>
     <p className="source-credit mt-5">Photo: <a href={material.source} target="_blank" rel="noopener noreferrer" className="underline">{material.credit}</a></p>
    </div>
   </DialogContent>
  </Dialog>
 </article>;
}