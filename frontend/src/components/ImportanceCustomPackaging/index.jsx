import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '../../utils/BaseUrl';

const ImportanceCustomPackaging = React.memo(() => {
  const [banner, setBanner] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const closeImageViewer = () => {
    setIsViewerOpen(false);
    document.body.style.overflow = 'auto';
  };

  const openImageViewer = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    setIsViewerOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const fetchBanner = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BaseUrl}/banner/getAll`);
      const data = response?.data?.data?.[0] || {};
      setBanner(data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Failed to load banner data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  if (loading) {
    return (
      <div className="py-8 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-gray-600">Loading content...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-4 text-gray-600">{error}</p>
              <button 
                onClick={fetchBanner}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 bg-white">
      <div className="container mx-auto px-4 sm:px-0 max-w-6xl">
        <div className='text-center sm:pb-6 pb-3'>
          <h2 className="sm:text-[40px] sm:pb-10 pb-0 sm:pt-4 pt-0 text-[25px] flex md:flex-row flex-col justify-center sm:gap-1 gap-0 leading-9 font-sans font-[600] text-[#333333]">
            What Is Custom Packaging? <h2 className='m-0 sm:text-[40px] text-[25px] text-[#4440E6]'>A Complete Guide</h2>
          </h2>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 blog_content banner_content items-center">
          <div 
            dangerouslySetInnerHTML={{ __html: banner?.description }} 
            className="w-full lg:w-1/2 bg-gray-50 h-[430px] rounded-xl p-4 overflow-y-auto"
          />
          
          <div className="w-full relative lg:w-1/2">
            {banner?.image ? (
              <>
                <img 
                  src={`${BaseUrl}/${banner.image}`} 
                  alt="Custom packaging example" 
                  className="w-full h-auto rounded-xl shadow-md object-cover"
                  loading="lazy"
                />
                
                {banner?.videoLink && (
                  <div 
                    onClick={() => openImageViewer(banner.videoLink)} 
                    className="absolute border-[#FF931E] text-[#FF931E] p-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 rounded-full cursor-pointer hover:bg-orange-50 transition-colors"
                  >
                    <svg width={50} className='fill-current' viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                      <path d="M371.7 238l-176-107c-15.8-8.8-35.7 2.5-35.7 21v208c0 18.4 19.8 29.8 35.7 21l176-101c16.4-9.1 16.4-32.8 0-42zM504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256z"></path>
                    </svg>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {isViewerOpen && banner?.videoLink && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className='absolute top-4 right-4'>
            <button
              onClick={closeImageViewer}
              className="text-white text-3xl cursor-pointer hover:text-gray-300 bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
            >
              &times;
            </button>
          </div>

          <div className="w-full max-w-4xl aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={banner.videoLink}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
});

export default ImportanceCustomPackaging;
