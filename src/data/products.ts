import { Category, Product } from '../types';
import {
  ALL_CATEGORIES,
  ALL_PRODUCTS,
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
} from './categories';

// Unified 10 Categories
export const CATEGORIES: Category[] = ALL_CATEGORIES;

// Unified 100 Audited Products (10 per category)
export const PRODUCTS: Product[] = ALL_PRODUCTS;

// Export individual category modules and arrays for direct modular imports
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
