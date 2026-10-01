import { Category, Product } from '../../types';
import { techCategory, techProducts } from './tech';
import { beautyCategory, beautyProducts } from './beauty';
import { fashionCategory, fashionProducts } from './fashion';
import { homeCategory, homeProducts } from './home';
import { fitnessCategory, fitnessProducts } from './fitness';
import { decorCategory, decorProducts } from './decor';
import { kitchenCategory, kitchenProducts } from './kitchen';
import { autoCategory, autoProducts } from './auto';
import { travelCategory, travelProducts } from './travel';
import { babyPetCategory, babyPetProducts } from './babyPet';

// Re-export individual category modules and product arrays
export {
  techCategory,
  techProducts,
  beautyCategory,
  beautyProducts,
  fashionCategory,
  fashionProducts,
  homeCategory,
  homeProducts,
  fitnessCategory,
  fitnessProducts,
  decorCategory,
  decorProducts,
  kitchenCategory,
  kitchenProducts,
  autoCategory,
  autoProducts,
  travelCategory,
  travelProducts,
  babyPetCategory,
  babyPetProducts,
};

// Aggregated 10 categories
export const ALL_CATEGORIES: Category[] = [
  techCategory,
  beautyCategory,
  fashionCategory,
  homeCategory,
  fitnessCategory,
  decorCategory,
  kitchenCategory,
  autoCategory,
  travelCategory,
  babyPetCategory,
];

// Aggregated 100 products (10 per category)
export const ALL_PRODUCTS: Product[] = [
  ...techProducts,
  ...beautyProducts,
  ...fashionProducts,
  ...homeProducts,
  ...fitnessProducts,
  ...decorProducts,
  ...kitchenProducts,
  ...autoProducts,
  ...travelProducts,
  ...babyPetProducts,
];
