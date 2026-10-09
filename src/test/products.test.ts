import { describe, expect, it } from 'vitest';
import { materials, products } from '@/lib/products';

describe('Material collection', () => {
 it('has additional products with real photograph assets', () => {
  expect(materials.length).toBeGreaterThanOrEqual(8);
  expect(new Set(materials.map(p => p.id)).size).toBe(materials.length);
  for (const material of materials) {
   expect(products.some(p => p.id === material.category)).toBe(true);
   expect(material.image).toContain('/__l5e/assets-v1/');
   expect(material.source).toMatch(/^https:\/\//);
   expect(material.credit.length).toBeGreaterThan(0);
  }
 });
 it('provides examples in each supplier category', () => {
  for (const category of products) expect(materials.some(p => p.category === category.id)).toBe(true);
 });
});