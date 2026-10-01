/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { CURRENCIES } from './data/currencies';
import { PRODUCTS } from './data/products';
import { CartItem, CurrencyConfig, OrderDetails, Product } from './types';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TrustGuarantees } from './components/TrustGuarantees';
import { CategoryNav } from './components/CategoryNav';
import { CatalogSection } from './components/CatalogSection';
import { GoldenBundles } from './components/GoldenBundles';
import { SocialProof } from './components/SocialProof';
import { ExpressCheckout } from './components/ExpressCheckout';
import { PaymentFAQ } from './components/PaymentFAQ';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { DigitalInvoiceModal } from './components/DigitalInvoiceModal';
import { FloatingQuickCart } from './components/FloatingQuickCart';
import { BackToTop } from './components/BackToTop';
import { CenturyOfferBanner } from './components/CenturyOfferBanner';
import { CompareModal } from './components/CompareModal';
import { FloatingCompareDock } from './components/FloatingCompareDock';
import { WishlistDrawer } from './components/WishlistDrawer';
import { TrackOrderModal } from './components/TrackOrderModal';

export default function App() {
  // 1. Currency State (Default USD, switchable to SAR, EGP, AED, JOD)
  const [currency, setCurrency] = useState<CurrencyConfig>(CURRENCIES.USD);

  // 2. Cart State with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('temo_cart_items');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // ignore
    }
    // Default initial starter items: item #1 (Power Bank) and #4 (ANC Earbuds)
    const item1 = PRODUCTS.find((p) => p.id === 1);
    const item4 = PRODUCTS.find((p) => p.id === 4);
    const initial: CartItem[] = [];
    if (item1) initial.push({ product: item1, quantity: 1 });
    if (item4) initial.push({ product: item4, quantity: 1 });
    return initial;
  });

  useEffect(() => {
    try {
      localStorage.setItem('temo_cart_items', JSON.stringify(cart));
    } catch (e) {
      // ignore
    }
  }, [cart]);

  // 3. Category & Filter States
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | 'all'>('all');
  const [selectedBrand, setSelectedBrand] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // 4. Modals & Overlays
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState('ONLINE5');

  // 5. Compare State (up to 3 products)
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // 6. Wishlist State with localStorage persistence
  const [wishlistIds, setWishlistIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('temo_wishlist_ids');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    // Default initial starter favorites: #15 (Dyson), #22 (Adidas Ultraboost), #81 (Stanley Quencher)
    return [15, 22, 81];
  });

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('temo_wishlist_ids', JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  const wishlistProducts = useMemo(() => {
    return PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  }, [wishlistIds]);

  const handleToggleFavorite = (product: Product) => {
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      }
      return [...prev, product.id];
    });
  };

  const handleRemoveFavorite = (productId: number) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  };

  const handleClearWishlist = () => {
    setWishlistIds([]);
  };

  // 7. Recently Viewed Products with localStorage
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('temo_recently_viewed');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [1, 4, 15, 22]; // Default curated initial trail
  });

  useEffect(() => {
    try {
      localStorage.setItem('temo_recently_viewed', JSON.stringify(recentlyViewedIds));
    } catch {
      // ignore
    }
  }, [recentlyViewedIds]);

  const handleTrackRecentlyViewed = (product: Product) => {
    setRecentlyViewedIds((prev) => {
      const filtered = prev.filter((id) => id !== product.id);
      return [product.id, ...filtered].slice(0, 8);
    });
  };

  const recentlyViewedProducts = useMemo(() => {
    return recentlyViewedIds
      .map((id) => PRODUCTS.find((p) => p.id === id))
      .filter((p): p is Product => !!p);
  }, [recentlyViewedIds]);

  // 8. Personalized 'Recommended for You' tag system
  // Recommends products matching user cart categories, wishlist categories, or top rated
  const recommendedProductIds = useMemo(() => {
    const activeCategoryIds = new Set<number>();
    cart.forEach((item) => activeCategoryIds.add(item.product.categoryId));
    wishlistIds.forEach((id) => {
      const p = PRODUCTS.find((prod) => prod.id === id);
      if (p) activeCategoryIds.add(p.categoryId);
    });

    if (activeCategoryIds.size === 0) {
      // Fallback: Recommend top featured items across categories
      return [1, 15, 22, 61, 81];
    }

    const recs = PRODUCTS.filter(
      (p) => activeCategoryIds.has(p.categoryId) && !cart.some((item) => item.product.id === p.id)
    )
      .slice(0, 8)
      .map((p) => p.id);

    return recs.length > 0 ? recs : [1, 15, 22, 61, 81];
  }, [cart, wishlistIds]);

  // Derived filtered & sorted 100 products
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Filter by Category
    if (selectedCategoryId !== 'all') {
      list = list.filter((p) => p.categoryId === selectedCategoryId);
    }

    // Filter by Brand
    if (selectedBrand !== 'الكل') {
      list = list.filter((p) => p.brand === selectedBrand);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    // Sort
    switch (sortBy) {
      case 'discount-desc':
        list.sort((a, b) => b.discountPercent - a.discountPercent);
        break;
      case 'price-asc':
        list.sort((a, b) => a.discountPrice - b.discountPrice);
        break;
      case 'price-desc':
        list.sort((a, b) => b.discountPrice - a.discountPrice);
        break;
      case 'savings-desc':
        list.sort((a, b) => b.savings - a.savings);
        break;
      case 'featured':
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return list;
  }, [selectedCategoryId, selectedBrand, searchQuery, sortBy]);

  // Comparison Handlers
  const handleToggleCompare = (product: Product) => {
    setCompareProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 3) {
        alert('يمكنك مقارنة 3 منتجات كحد أقصى في وقت واحد لتوفير رؤية متوازنة.');
        return prev;
      }
      return [...prev, product];
    });
  };

  const handleRemoveCompareProduct = (id: number) => {
    setCompareProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleClearCompareAll = () => {
    setCompareProducts([]);
  };

  // Cart Handlers
  const handleAddToCart = (product: Product) => {
    handleTrackRecentlyViewed(product);
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleQuickBuy = (product: Product) => {
    handleTrackRecentlyViewed(product);
    // Add to cart if not present
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) return prev;
      return [...prev, { product, quantity: 1 }];
    });
    // Scroll directly to express checkout
    const checkoutEl = document.getElementById('checkout-section');
    if (checkoutEl) {
      checkoutEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenQuickView = (product: Product) => {
    setActiveModalProduct(product);
    handleTrackRecentlyViewed(product);
  };

  const handleUpdateQuantity = (productId: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderComplete = (order: OrderDetails) => {
    setCompletedOrder(order);
    setCart([]);
  };

  const cartProductIds = useMemo(() => cart.map((i) => i.product.id), [cart]);
  const totalCartCount = useMemo(() => cart.reduce((sum, i) => sum + i.quantity, 0), [cart]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Cairo',sans-serif]">
      
      {/* 1. Sticky Announcement Bar (Live 4-Hour Countdown & Currency Selector) */}
      <AnnouncementBar
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToCheckout={() => handleScrollToSection('checkout-section')}
      />

      {/* 2. Top Navigation Header (3-Zone Top Bar Contract) */}
      <Header
        currentCurrency={currency}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToSection={handleScrollToSection}
        favoritesCount={wishlistIds.length}
        onOpenFavorites={() => setIsWishlistOpen(true)}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
      />

      {/* 3. Hero Section (Persuasive Copy, 4-Hour Clock Widget, CTAs) */}
      <HeroSection
        onScrollToCheckout={() => handleScrollToSection('checkout-section')}
        onScrollToCatalog={() => handleScrollToSection('catalog-section')}
      />

      {/* 4. Financial Trust Badges & Online Payment Guarantees */}
      <TrustGuarantees />

      {/* 4.5. عرض القرن (Offer of the Century: 100% Matching Order Value) */}
      <CenturyOfferBanner
        currency={currency}
        onExploreCatalog={() => handleScrollToSection('catalog-section')}
      />

      {/* 5. 10-Category Quick Navigation Bar, Brand Selector & Voice Search */}
      <CategoryNav
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={(id) => {
          setSelectedCategoryId(id);
          handleScrollToSection('catalog-section');
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalProductsCount={filteredProducts.length}
        selectedBrand={selectedBrand}
        onSelectBrand={setSelectedBrand}
      />

      {/* 6. Comprehensive 100 Products Catalog */}
      <CatalogSection
        products={filteredProducts}
        selectedCategoryId={selectedCategoryId}
        searchQuery={searchQuery}
        currency={currency}
        cartProductIds={cartProductIds}
        compareProductIds={compareProducts.map((p) => p.id)}
        wishlistProductIds={wishlistIds}
        recommendedProductIds={recommendedProductIds}
        onAddToCart={handleAddToCart}
        onQuickBuy={handleQuickBuy}
        onOpenQuickView={handleOpenQuickView}
        onSelectCategory={setSelectedCategoryId}
        onToggleCompare={handleToggleCompare}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* 7. Online Golden Bundles (Buy 2 Get 1 Free, Free Shipping, ONLINE5 Code) */}
      <GoldenBundles
        onApplyCoupon={(code) => {
          setAppliedCoupon(code);
          handleScrollToSection('checkout-section');
        }}
        onScrollToCheckout={() => handleScrollToSection('checkout-section')}
      />

      {/* 8. Verified Social Proof & Customer Reviews */}
      <SocialProof />

      {/* 9. Express Online Checkout Form */}
      <ExpressCheckout
        cart={cart}
        currency={currency}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={setAppliedCoupon}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOrderComplete={handleOrderComplete}
        onScrollToCatalog={() => handleScrollToSection('catalog-section')}
      />

      {/* 10. Online Payment FAQ Accordion */}
      <PaymentFAQ />

      {/* 11. Footer & Safety Certifications */}
      <Footer />

      {/* Slide-over Cart Drawer with Recently Viewed Section */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onScrollToCheckout={() => handleScrollToSection('checkout-section')}
        recentlyViewedProducts={recentlyViewedProducts}
        onAddToCart={handleAddToCart}
        onOpenQuickView={handleOpenQuickView}
      />

      {/* Quick View Product Modal with Dynamic Delivery Date & Social Sharing */}
      <ProductModal
        product={activeModalProduct}
        currency={currency}
        onClose={() => setActiveModalProduct(null)}
        onAddToCart={handleAddToCart}
        onQuickBuy={handleQuickBuy}
      />

      {/* Verified Post-Order Digital Invoice Modal */}
      <DigitalInvoiceModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

      {/* Floating Compare Tray Dock */}
      <FloatingCompareDock
        products={compareProducts}
        currency={currency}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        onRemoveProduct={handleRemoveCompareProduct}
        onClearAll={handleClearCompareAll}
      />

      {/* Side-by-Side Product Compare Modal */}
      <CompareModal
        products={compareProducts}
        currency={currency}
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        onRemoveProduct={handleRemoveCompareProduct}
        onAddToCart={handleAddToCart}
      />

      {/* Wishlist Favorites Slide-Over Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        currency={currency}
        onAddToCart={handleAddToCart}
        onRemoveFavorite={handleRemoveFavorite}
        onClearWishlist={handleClearWishlist}
        onOpenQuickView={handleOpenQuickView}
      />

      {/* Track Order Live Delivery Progress Modal */}
      <TrackOrderModal
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
        recentOrder={completedOrder}
      />

      {/* Floating Quick Cart Access Button */}
      <FloatingQuickCart
        cart={cart}
        currency={currency}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToCheckout={() => handleScrollToSection('checkout-section')}
      />

      {/* Scroll-Aware Back to Top Button */}
      <BackToTop />

    </div>
  );
}
