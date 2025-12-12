import Hero from '../../components/Hero'
import { BaseUrl } from '../../utils/BaseUrl'
import PageMetadata from '../../components/common/PageMetadata'
import { goScreen, Hero1, logo, pngLogo } from '../../assets'
import React, { lazy, Suspense, useEffect } from 'react'
import { prefetchSubCategory, prefetchProducts } from '../../utils/prefetchUtils'
import axios from 'axios'

// Lazy load components below the fold for faster initial page load
// Only Hero loads immediately (above the fold)
const CustomPackaging = lazy(() => import('../../components/customPackaging'))
const CustomBoxMaterial = lazy(() => import('../../components/CustomBoxMaterial/CustomBoxMaterial'))
const GetPriceQuote = lazy(() => import('../../components/GetPriceQuote/GetPriceQuote'))
const SpecialPackaging = lazy(() => import('../../components/SpecialPackaging/SpecialPackaging'))
const CustomPackagingApart = lazy(() => import('../../components/CustomPackagingApart/CustomPackagingApart'))
const TemplateToDesign = lazy(() => import('../../components/TemplateToDesign/TemplateToDesign'))
const ProductionUnits = lazy(() => import('../../components/ProductionUnits/ProductionUnits'))
const CustomPackagingProduced = lazy(() => import('../../components/CustomPackagingProduced'))
const PackagingBanner = lazy(() => import('../../components/common/PackagingBanner'))
const WeFulfil = lazy(() => import('../../components/WeFulfil/WeFulfil'))
const CustomerReviews = lazy(() => import('../../components/CustomerReviews'))
const InspirationPackaging = lazy(() => import('../../components/InspirationPackaging'))
const ImportanceCustomPackaging = lazy(() => import('../../components/ImportanceCustomPackaging'))
const Blog = lazy(() => import('../../components/blog/Blog'))
const FAQ = lazy(() => import('../../components/FAQ/FAQ'))

// Lightweight loading placeholder component
const ComponentPlaceholder = ({ height = "h-64" }) => (
  <div className={`w-full ${height} bg-gray-100 animate-pulse rounded-lg`}></div>
)

// Loading placeholders
const BlogPlaceholder = () => (
  <div className="md:py-12 py-10">
    <div className="sm:max-w-6xl max-w-[95%] mx-auto text-center">
      <h2 className="sm:text-[35px] text-[25px] pb-5 font-sans font-[600] text-[#333333]">
        Blog & News
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-4">
              <div className="h-6 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const FAQPlaceholder = () => (
  <div className="bg-gray-100 py-12">
    <div className="sm:max-w-6xl max-w-[95%] mx-auto">
      <div className="text-center mb-8">
        <h2 className="sm:text-[35px] text-[25px] font-sans font-[600] text-[#333333]">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export const Home = React.memo(() => {
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
        const response = await axios.get(`${BaseUrl}/products/getAll?page=1&perPage=10`, {
          timeout: 5000
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
        {/* Above the fold - load immediately */}
        <Hero />
        
        {/* Lazy load components below the fold for faster initial page load */}
        <Suspense fallback={<ComponentPlaceholder />}>
          <CustomPackaging />
        </Suspense>
        <Suspense fallback={<ComponentPlaceholder />}>
          <CustomBoxMaterial />
        </Suspense>
        <Suspense fallback={<ComponentPlaceholder />}>
          <GetPriceQuote />
        </Suspense>
        <Suspense fallback={<ComponentPlaceholder />}>
          <SpecialPackaging />
        </Suspense>
        <Suspense fallback={<ComponentPlaceholder />}>
          <CustomPackagingApart />
        </Suspense>
        <Suspense fallback={<ComponentPlaceholder />}>
          <TemplateToDesign />
        </Suspense>
        <Suspense fallback={<ComponentPlaceholder />}>
          <ProductionUnits />
        </Suspense>
        <Suspense fallback={<ComponentPlaceholder />}>
          <CustomPackagingProduced />
        </Suspense>
        <Suspense fallback={<ComponentPlaceholder />}>
          <PackagingBanner url="/sub-category/kraft-packaging-boxes" title={'Order Kraft Packaging For Sustainable Future.'} subTitle={"Go Green with Umbrella Custom Packaging Go For Kraft Packaging"} bgImage={goScreen} />
        </Suspense>
        <Suspense fallback={<ComponentPlaceholder />}>
          <WeFulfil />
        </Suspense>
        <Suspense fallback={<ComponentPlaceholder />}>
          <CustomerReviews />
        </Suspense>
        <Suspense fallback={<ComponentPlaceholder />}>
          <InspirationPackaging />
        </Suspense>
        <Suspense fallback={<ComponentPlaceholder />}>
          <ImportanceCustomPackaging />
        </Suspense>
        
        {/* Below the fold - lazy load for faster initial render */}
        <Suspense fallback={<BlogPlaceholder />}>
          <Blog />
        </Suspense>
        <Suspense fallback={<FAQPlaceholder />}>
          <FAQ />
        </Suspense>
      </main>
    </>
  )
})