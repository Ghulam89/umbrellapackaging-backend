import React, { useEffect, useMemo, useState, useCallback } from "react";
import CategoryCard from "../common/CategoryCard";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";
import { useIntersectionObserver } from "../../utils/useIntersectionObserver";
import img1 from '../../images/Apparel And Fashion Boxes.webp'
import img2 from '../../images/Custom Bakery Boxes.webp'
import img3 from '../../images/Cbd Boxes.webp'
import img4 from '../../images/Candle Boxes.webp'
import img5 from '../../images/Cardboard Boxes.webp'
import img6 from '../../images/Chocolate Boxes.webp'
import img7 from '../../images/Cosmetics Boxes.webp'
import img8 from '../../images/Custom Display boxes.webp'
import img9 from '../../images/food boxes.webp'
import img10 from '../../images/gift boxes.webp'
import img11 from '../../images/Jewelry Boxes.webp'
import img12 from '../../images/Kraft Packaging.webp'
import img13 from '../../images/Magnetic Closure Boxes.webp'
import img14 from '../../images/Mailer Boxes.webp'
import img15 from '../../images/Custom Pillow Boxes.webp'
import img16 from '../../images/Retail Boxes.webp'
import img17 from '../../images/Custom Rigid Boxes.webp'
import img18 from '../../images/Subscription Boxeswebp.webp'

 const SkeletonLoader = React.memo(() => (
    <div className="w-full bg-white rounded-lg overflow-hidden animate-pulse">
      <div className="h-44 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
    </div>
));


const CustomPackaging =React.memo(() => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Use Intersection Observer to defer API call until component is visible
  const [componentRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '200px', // Start loading 200px before visible
    triggerOnce: true
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BaseUrl}/category/getAll?categories=Rigid Boxes,Retail Boxes,Subscription Boxes,Custom Display Boxes​,Apparel and Fashion Boxes,Candle Boxes,Bakery Boxes,Cardboard boxes,CBD Boxes,Chocolate Boxes,Cosmetics and Beauty Boxes,Food Boxes,Gift Boxes,Jewelry Boxes,Kraft Packaging,Magnetic Closure Boxes,Mailer Boxes,Pillow Boxes, `,
        { timeout: 5000 }
      );
      setCategories(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      // Keep categories empty to use Categorydata as fallback
    } finally {
      setLoading(false);
    }
  }, []);

  // Only fetch when component is visible
  useEffect(() => {
    if (isVisible && categories.length === 0 && !loading) {
      fetchData();
    }
  }, [isVisible, fetchData, categories.length, loading]);

 const skeletons = useMemo(
    () => Array.from({ length: 6 }).map((_, index) => <SkeletonLoader key={index} />),
    []
  );

  const Categorydata = [
    {
      id:1,
      title: 'Apparel and Fashion Boxes',
      image: img1,
      slug: 'fashion-apparel-packaging-boxes',
      imageAltText: 'Apparel and Fashion Boxes - Custom packaging boxes for clothing and fashion items',
    },
    {
      id:2,
      title: 'Bakery Boxes',
      image: img2,
      slug: 'bakery-packaging-boxes',
      imageAltText: 'Bakery Boxes - Custom packaging boxes for bakery products and baked goods',
    },
    {
      id:3,
      title: 'CBD Boxes',
      image: img3,
      slug: 'cbd-packaging-boxes',
      imageAltText: 'CBD Boxes - Custom packaging boxes for CBD products',
    },
    {
      id:4,
      title: 'Candle Boxes',
      image: img4,
      slug: 'candle-packaging-boxes',
      imageAltText: 'Candle Boxes - Custom packaging boxes for candles',
    },
    {
      id:5,
      title: 'Cardboard boxes',
      image: img5,
      slug: 'custom-cardboard-boxes',
      imageAltText: 'Cardboard Boxes - Custom cardboard packaging boxes',
    },
    {
      id:6,
      title: 'Chocolate Boxes',
      image: img6,
      slug: 'chocolate-packaging-boxes',
      imageAltText: 'Chocolate Boxes - Custom packaging boxes for chocolates and confectionery',
    },
    {
      id:7,
      title: 'Cosmetics and Beauty Boxes',
      image: img7,
      slug: 'cosmetics-packaging-boxes',
      imageAltText: 'Cosmetics and Beauty Boxes - Custom packaging boxes for cosmetics and beauty products',
    },
    {
      id:8,
      title: 'Custom Display Boxes​',
      image: img8,
      slug: 'custom-display-packaging-boxes',
      imageAltText: 'Custom Display Boxes - Custom display packaging boxes for retail products',
    },
    {
      id:9,
      title: 'Food Boxes',
      image: img9,
      slug: 'food-packaging-boxes',
      imageAltText: 'Food Boxes - Custom packaging boxes for food products',
    },
    {
      id:10,
      title: 'Gift Boxes',
      image: img10,
      slug: 'gift-packaging-boxes',
      imageAltText: 'Gift Boxes - Custom gift packaging boxes',
    },
    {
      id:11,
      title: 'Jewelry Boxes',
      image: img11,
      slug: 'jewelry-packaging-boxes',
      imageAltText: 'Jewelry Boxes - Custom packaging boxes for jewelry and accessories',
    },
    {
      id:12,
      title: 'Kraft Packaging',
      image: img12,
      slug: 'kraft-packaging-boxes',
      imageAltText: 'Kraft Packaging - Eco-friendly kraft packaging boxes',
    },
    {
      id:13,
      title: 'Magnetic Closure Boxes',
      image: img13,
      slug: 'custom-magnetic-closure-boxes',
      imageAltText: 'Magnetic Closure Boxes - Custom boxes with magnetic closure mechanism',
    },
    {
      id:14,
      title: 'Mailer Boxes',
      image: img14,
      slug: 'custom-mailer-packaging-boxes',
      imageAltText: 'Mailer Boxes - Custom mailer packaging boxes for shipping',
    },
    {
      id:15,
      title: 'Pillow Boxes',
      image: img15,
      slug: 'custom-pillow-boxes',
      imageAltText: 'Pillow Boxes - Custom pillow-shaped packaging boxes',
    },
    {
      id:16,
      title: 'Retail Boxes',
      image: img16,
      slug: 'retail-packaging-boxes',
      imageAltText: 'Retail Boxes - Custom packaging boxes for retail products',
    },
    {
      id:17,
      title: 'Rigid Boxes',
      image: img17,
      slug: 'custom-rigid-boxes',
      imageAltText: 'Rigid Boxes - Custom rigid packaging boxes with sturdy construction',
    },
    {
      id:18,
      title: 'Subscription Boxes',
      image: img18,
      slug: 'subscription-packaging-boxes',
      imageAltText: 'Subscription Boxes - Custom packaging boxes for subscription services',
    },
  ]

  return (
    <div ref={componentRef} className="sm:max-w-6xl max-w-[95%] pt-2 mx-auto">
      <div className="bg-[#F7F7F7] text-center my-7 py-4 sm:px-5 px-2 rounded-md w-full">
        <h1 className="sm:text-[35px] text-[25px] font-sans font-[600] text-[#333333]">
          Discover Our Custom Packaging Variety
        </h1>
        <p className="pt-3 pb-6 text-sm">
          Check out all the different types of boxes we have at Umbrella Custom Packaging! 
          We have special categories for boxes that you can customize just the way you like. 
          Choose the size, the material, or how it looks. So, have a look and pick the perfect box for you!
        </p>

        <div className="grid sm:grid-cols-3 grid-cols-2 mx-auto gap-5 mt-3.5 justify-between">
             {loading || (!isVisible && Categorydata.length === 0)
            ? skeletons
            :Categorydata.length > 0
            ? Categorydata.map((item) => (
                <CategoryCard key={item.id || item.slug} data={item} />
              ))
            : (
              <p className="col-span-full text-center text-gray-500">
                No categories available.
              </p>
            )}
        </div>
      </div>
    </div>
  );
});

export default CustomPackaging;
