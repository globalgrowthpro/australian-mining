import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides } from '@/lib/products';

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const paused = useRef(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (reduced.current) return;
    const id = window.setInterval(() => {
      if (!paused.current) setIndex(i => (i + 1) % heroSlides.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, []);

  const go = (next: number) => setIndex((next + heroSlides.length) % heroSlides.length);

  return <div className="hero-slider" onMouseEnter={() => { paused.current = true; }} onMouseLeave={() => { paused.current = false; }} onFocus={() => { paused.current = true; }} onBlur={() => { paused.current = false; }}>
    {heroSlides.map((slide, i) => <img key={slide.image} src={slide.image} alt={i === index ? slide.alt : ''} aria-hidden={i !== index} className={`hero-slide${i === index ? ' active' : ''}`} loading={i === 0 ? 'eager' : 'lazy'} fetchPriority={i === 0 ? 'high' : undefined} />)}
    <div className="hero-caption" aria-live="polite">{heroSlides[index].caption} · Material example<br />Photo: {heroSlides[index].credit}</div>
    <button type="button" className="hero-nav hero-nav--prev" aria-label="Previous slide" onClick={() => go(index - 1)}><ChevronLeft /></button>
    <button type="button" className="hero-nav hero-nav--next" aria-label="Next slide" onClick={() => go(index + 1)}><ChevronRight /></button>
    <div className="hero-dots" role="group" aria-label="Hero slides">
      {heroSlides.map((slide, i) => <button key={slide.image} type="button" className="hero-dot" aria-current={i === index} aria-label={`Show slide ${i + 1}: ${slide.caption}`} onClick={() => go(i)} />)}
    </div>
  </div>;
}
