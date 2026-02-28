import Hero from '../../components/Hero'
import { BaseUrl } from '../../utils/BaseUrl'
import PageMetadata from '../../components/common/PageMetadata'
import { goScreen, Hero1, logo, pngLogo } from '../../assets'
import React, { useEffect } from 'react'
import { prefetchSubCategory, prefetchProducts } from '../../utils/prefetchUtils'
import axiosInstance from '../../utils/axiosInstance'

// Import components directly for SSR compatibility
import CustomPackaging from '../../components/customPackaging'
import CustomBoxMaterial from '../../components/CustomBoxMaterial/CustomBoxMaterial'
import GetPriceQuote from '../../components/GetPriceQuote/GetPriceQuote'
import SpecialPackaging from '../../components/SpecialPackaging/SpecialPackaging'
import CustomPackagingApart from '../../components/CustomPackagingApart/CustomPackagingApart'
import TemplateToDesign from '../../components/TemplateToDesign/TemplateToDesign'
import ProductionUnits from '../../components/ProductionUnits/ProductionUnits'
import CustomPackagingProduced from '../../components/CustomPackagingProduced'
import PackagingBanner from '../../components/common/PackagingBanner'
import WeFulfil from '../../components/WeFulfil/WeFulfil'
import CustomerReviews from '../../components/CustomerReviews'
import InspirationPackaging from '../../components/InspirationPackaging'
import ImportanceCustomPackaging from '../../components/ImportanceCustomPackaging'
import Blog from '../../components/blog/Blog'
import FAQ from '../../components/FAQ/FAQ'

export const Home = React.memo(({ bannerData: propBannerData }) => {
  // Get bannerData from server data if available
  const serverBannerData = typeof window !== 'undefined' && window.__SERVER_DATA__?.bannerData 
    ? window.__SERVER_DATA__.bannerData 
    : propBannerData;
  const bannerData = serverBannerData || propBannerData;

  // Prefetch data on home page load for faster navigation
  useEffect(() => {
    // Prefetch subcategories from Hero buttons (priority for user experience)
    const heroSubCategories = [
      'fashion-apparel-packaging-boxes',
      'food-packaging-boxes',
      'cbd-packaging-boxes',
      'custom-cardboard-boxes'
    ];
    
    // Prefetch all hero subcategories in parallel with priority
    heroSubCategories.forEach(slug => {
      prefetchSubCategory(slug, true); // true = priority
    });

    // Prefetch kraft-packaging-boxes from PackagingBanner
    prefetchSubCategory('kraft-packaging-boxes', true);

    // Prefetch popular products from first page (non-blocking, lower priority)
    // This helps when users navigate to product pages
    // Use requestIdleCallback for non-critical prefetching
    const prefetchPopularProducts = async () => {
      try {
        // Use axiosInstance with optimized timeout
        const response = await axiosInstance.get('/products/getAll', {
          params: { page: 1, perPage: 10 },
          timeout: 6000, // 6 second timeout for prefetch
        });
        const products = response?.data?.data || [];
        if (products.length > 0) {
          // Extract slugs and prefetch first 5 popular products
          const productSlugs = products
            .slice(0, 5)
            .filter(p => p?.slug)
            .map(p => p.slug);
          if (productSlugs.length > 0) {
            prefetchProducts(productSlugs, false); // false = lower priority
          }
        }
      } catch (error) {
        // Silently fail - prefetch is optional
      }
    };

    // Use requestIdleCallback if available, otherwise setTimeout with minimal delay
    if (window.requestIdleCallback) {
      window.requestIdleCallback(prefetchPopularProducts, { timeout: 2000 });
    } else {
      setTimeout(prefetchPopularProducts, 100);
    }
  }, []); // Run only once on mount

  const metadata = {
    title: "Affordable, High-Quality Custom Packaging Boxes – Wholesale | Umbrella Custom Packaging",
    description: "Get high-quality custom packaging boxes at wholesale prices. We offer affordable packaging for businesses of all sizes. Enjoy bulk discounts, free design support, and fast shipping.",
    keywords: "custom packaging, wholesale boxes, packaging solutions, affordable packaging, custom boxes, packaging design, eco-friendly packaging",
    author: "Umbrella Custom Packaging",
    canonicalUrl: BaseUrl,
    robots:'index, follow',
    ogUrl: BaseUrl,
    ogImage: `${BaseUrl}${Hero1}`,
    ogImageWidth: "768",
    ogImageHeight: "499",
    ogImageType: "images/webp",
    modifiedTime: "2025-06-13T15:18:43+00:00",
    homeSchema : {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Umbrella Custom Packaging",
  "hasMap": "https://www.google.com/maps/place/Umbrella+Custom+Packaging+USA/@34.0304757,-118.4009978,17z/data=!3m2!4b1!5s0x80c2bbd3055d51a3:0x68496cbd465819b1!4m6!3m5!1s0x80c2bbbf80eec803:0x8425555061bf7fe8!8m2!3d34.0304757!4d-118.4009978!16s%2Fg%2F11smvg80n4?entry=ttu&g_ep=EgoyMDI1MDcxMy4wIKXMDSoASAFQAw%3D%3D",
  "url": "https://umbrellapackaging.com",
  "logo": `${BaseUrl}/umbrella-logo.png`,
  "image": `${BaseUrl}${Hero1}`,
  "telephone": "+1-747-247-0456",
  "description": "Get high-quality custom packaging boxes at wholesale prices. We offer affordable packaging for businesses of all sizes. Enjoy bulk discounts, free design support, and fast, reliable shipping. Order now for unmatched prices!",
  "founder": {
    "@type": "Person",
    "name": "Scott Ray"
  },
  "foundingDate": "2020-06-01",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "9854 National Blvd #1042",
    "addressLocality": "Los Angeles",
    "addressRegion": "CA",
    "postalCode": "90034",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 34.030563,
    "longitude": -118.40069
  },
  "priceRange": "$$",
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Eco-Friendly Materials",
      "value": "Yes"
    }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+1-747-247-0456",
      "contactType": "sales",
      "contactOption": "TollFree",
      "areaServed": "US",
      "availableLanguage": "en",
      "email": "sales@umbrellapackaging.com"
    }
  ],
  "sameAs": [
    "https://www.upwork.com/umbrellapackaging",
    "https://www.facebook.com/umbrellapackaging",
    "https://www.instagram.com/umbrellacustompackaging/",
    "https://www.youtube.com/channel/UCkxeWyAJqxjFSzlbnSoIVLQ",
    "https://www.linkedin.com/company/umbrellacustompackaging/",
    "https://x.com/umbrellapack"
  ]
}

  };


     
  return (
    <>
      <PageMetadata {...metadata} />

      <main>
       
        <Hero />
       <CustomPackaging />
          <CustomBoxMaterial />
          <GetPriceQuote />
          <SpecialPackaging />
          <CustomPackagingApart />
          <TemplateToDesign />
          <ProductionUnits />
          <CustomPackagingProduced />
          <PackagingBanner url="/sub-category/kraft-packaging-boxes" title={'Order Kraft Packaging For Sustainable Future.'} subTitle={"Go Green with Umbrella Custom Packaging Go For Kraft Packaging"} bgImage={goScreen} />
          <WeFulfil />
       
          <CustomerReviews />
        
          <InspirationPackaging />
        
          <ImportanceCustomPackaging initialBannerData={bannerData} />
     
          <Blog />
          <FAQ />
     
      </main>
    </>
  )
})
