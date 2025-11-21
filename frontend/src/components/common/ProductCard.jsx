import React, { useState, useContext, createContext } from "react";
import { Link } from "react-router-dom";
import { BaseUrl } from "../../utils/BaseUrl";
import { prefetchProduct } from "../../utils/prefetchUtils";

// Context for product selection
const ProductSelectionContext = createContext();

export const ProductSelectionProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  
  const toggleProduct = (productId) => {
    setSelectedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  return (
    <ProductSelectionContext.Provider value={{ selectedProducts, toggleProduct }}>
      {children}
    </ProductSelectionContext.Provider>
  );
};

export const useProductSelection = () => {
  const context = useContext(ProductSelectionContext);
  if (!context) {
    return { selectedProducts: new Set(), toggleProduct: () => {} };
  }
  return context;
};

const ProductCard = ({data, disableSelection = false}) => {
  const { selectedProducts, toggleProduct } = useProductSelection();
  const isSelected = selectedProducts.has(data?._id);

  console.log(data)
  const handleMouseEnter = () => {
    if (data?.slug) {
      prefetchProduct(data.slug);
    }
  };

  // Prefetch product data on mousedown (before click)
  const handleMouseDown = () => {
    if (data?.slug) {
      prefetchProduct(data.slug, true);
    }
  };

  const handleProductClick = (e) => {
    // Only handle selection if not disabled and click is not on the link
    if (!disableSelection && !e.target.closest('a')) {
      e.preventDefault();
      e.stopPropagation();
      if (data?._id) {
        toggleProduct(data._id);
      }
    }
  };
  
  return (
    <>
      {disableSelection ? (
        // For related products - no selection, just navigation
        <Link 
          state={{ productSlug: data._id}} 
          to={`/${data?.slug}`}
          onMouseEnter={handleMouseEnter}
          onMouseDown={handleMouseDown}
          className="block"
        >
          <div className="">
            <div className="  ">
            <img src={`${BaseUrl}/${data?.images?.[0]?.url}`} alt="" className=" w-full sm:h-62 h-auto object-cover overflow-hidden  rounded-lg" />
            </div>
            <h3 className="  sm:text-base text-sm m-0 font-semibold text-[#333333]  text-center  uppercase sm:py-5 py-2">{data?.name}</h3>
          </div>
        </Link>
      ) : (
        // For category pages - with selection functionality
        <div 
          className={`transition-all ${isSelected ? 'ring-4 ring-[#4440E6] rounded-lg p-1' : ''}`}
          onClick={handleProductClick}
        >
          <Link 
            state={{ productSlug: data._id}} 
            to={`/${data?.slug}`}
            onMouseEnter={handleMouseEnter}
            onMouseDown={handleMouseDown}
            className="block"
            onClick={(e) => {
              // Allow navigation to work normally
              e.stopPropagation();
            }}
          >
            <div className="">
              <div className="  ">
              <img src={`${BaseUrl}/${data?.images?.[0]?.url}`} alt="" className=" w-full sm:h-62 h-auto object-cover overflow-hidden  rounded-lg" />
              </div>
              <h3 className="  sm:text-base text-sm m-0 font-semibold text-[#333333]  text-center  uppercase sm:py-5 py-2">{data?.name}</h3>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default ProductCard;
