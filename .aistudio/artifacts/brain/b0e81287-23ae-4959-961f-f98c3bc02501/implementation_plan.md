# Temo Store - Category & Product File Modularization Plan

This plan separates and modularizes all 10 categories and their respective products into dedicated, maintainable files under `src/data/categories/` while maintaining `src/data/products.ts` as the central export barrel to preserve complete backward compatibility across the entire application:

***

## 1. Directory & File Architecture

Create the dedicated directory `src/data/categories/` with 10 category modules + 1 index aggregator:

1. **`src/data/categories/tech.ts`**:
   - Category metadata: `techCategory` (ID 1: التقنية والأجهزة الذكية)
   - Products: `techProducts` (IDs 1–10: Anker, Apple, Baseus, Sony, Samsung, DJI, Xiaomi, Lenovo, UGREEN, Belkin)

2. **`src/data/categories/beauty.ts`**:
   - Category metadata: `beautyCategory` (ID 2: العناية الشخصية والجمال)
   - Products: `beautyProducts` (IDs 11–20: The Ordinary, CeraVe, Cosrx, Rare Beauty, Dyson, Olaplex, L'Oréal, Laneige, Kiehl's, La Roche-Posay)

3. **`src/data/categories/fashion.ts`**:
   - Category metadata: `fashionCategory` (ID 3: الأزياء والملابس العصرية)
   - Products: `fashionProducts` (IDs 21–30: Nike, Adidas, Zara, Under Armour, Lululemon, Puma, New Balance, Gymshark, Calvin Klein, Tommy Hilfiger)

4. **`src/data/categories/home.ts`**:
   - Category metadata: `homeCategory` (ID 4: المنزل الذكي وحلول التنظيم)
   - Products: `homeProducts` (IDs 31–40: IKEA, Joseph Joseph, OXO, Simplehuman, Tupperware, Muji, Philips Home, Brabantia, Yamazaki, LocknLock)

5. **`src/data/categories/fitness.ts`**:
   - Category metadata: `fitnessCategory` (ID 5: اللياقة البدنية والرياضة)
   - Products: `fitnessProducts` (IDs 41–50: Theragun, Bowflex, Garmin, Fitbit, Lululemon Studio, TRX, Under Armour Fit, Gymshark Tech, Decathlon, Manduka)

6. **`src/data/categories/decor.ts`**:
   - Category metadata: `decorCategory` (ID 6: الإضاءة المودرن وديكور المنزل)
   - Products: `decorProducts` (IDs 51–60: Philips Hue, Nanoleaf, Xiaomi Smart Home, Marshall, IKEA Symfonisk, Jo Malone, Diptyque, West Elm, Zara Home, Govee)

7. **`src/data/categories/kitchen.ts`**:
   - Category metadata: `kitchenCategory` (ID 7: أجهزة المطبخ والطهي العصري)
   - Products: `kitchenProducts` (IDs 61–70: Ninja Kitchen, KitchenAid, Nespresso, De'Longhi, Instant Pot, Philips Kitchen, Nutribullet, Smeg, Cuisinart, Tefal)

8. **`src/data/categories/auto.ts`**:
   - Category metadata: `autoCategory` (ID 8: إلكترونيات ومستلزمات السيارات)
   - Products: `autoProducts` (IDs 71–80: Baseus Auto, 70mai, Bosch, Michelin, Anker Roav, Meguiar's, Chemical Guys, Black+Decker, Philips Auto, Solar TPMS)

9. **`src/data/categories/travel.ts`**:
   - Category metadata: `travelCategory` (ID 9: السفر والمقتنيات اليومية)
   - Products: `travelProducts` (IDs 81–90: Stanley Quencher, Samsonite Proxis, Ray-Ban Meta, Hydro Flask, Osprey, Bellroy, Tumi Alpha 3, Bose QuietComfort, Victorinox, Anker 737)

10. **`src/data/categories/babyPet.ts`**:
    - Category metadata: `babyPetCategory` (ID 10: مستلزمات الأطفال ورعاية الأليف)
    - Products: `babyPetProducts` (IDs 91–100: Chicco Bravo, Fisher-Price, Furbo 360, PetSafe, Philips Avent, Stokke Tripp Trapp, KONG Toys, Maxi-Cosi, Britax Römer, Purina Pro)

11. **`src/data/categories/index.ts`**:
    - Re-exports all individual categories and product arrays, plus aggregated `ALL_CATEGORIES` and `ALL_PRODUCTS`.

***

## 2. Backward Compatible Barrel (`src/data/products.ts`)
- Import all categories and products from `src/data/categories/index.ts`.
- Export `CATEGORIES` and `PRODUCTS` identically so that every existing component and hook continues to work seamlessly without breaking changes.

***

## 3. Verification Plan
- Execute `compile_applet` and `lint_applet` to confirm zero TypeScript compilation or export errors.
- Verify total category count is exactly 10 and total product count is exactly 100.
- Check catalog filtering and product cards render properly across all views.
