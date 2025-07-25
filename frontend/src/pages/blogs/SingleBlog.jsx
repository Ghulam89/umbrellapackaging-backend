import React, { useEffect, useState } from 'react';
import TableOfContent from './TableOfContent';
import Button from '../../components/common/Button';
import { BaseUrl } from '../../utils/BaseUrl';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import PageMetadata from '../../components/common/PageMetadata';

function SingleBlog({ serverData }) {
    const { slug } = useParams();
    // Use serverData only for the initial render (SSR/hydration)
    const [singleBlog, setSingleBlog] = useState(serverData || {});
    const [blogs, setBlogs] = useState([])
    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/blog/get?slug=${slug}`);
            setSingleBlog(response?.data?.data);
        } catch (error) {
            console.error("Error fetching blog:", error);
        }
    };

    const fetchAllBlogs = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/blog/getAll`);
            setBlogs(response?.data?.data);
        } catch (error) {

        }
    };

    useEffect(() => {
        fetchBlogs();
        fetchAllBlogs();
    }, [slug]);



  const faqItemSchema = singleBlog?.qna?.map((item, index) => {
  return {
    "@context": "https://schema.org",
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer 
    }
  };
});

    const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItemSchema || []
};
console.log(singleBlog);

    return (
        <>
            {/* Only render Helmet meta tags when singleBlog is available */}
               <PageMetadata
                   title={singleBlog?.metaTitle || serverData?.metaTitle || "Custom Packaging Solutions"}
                   description={singleBlog?.metaDescription || serverData?.metaDescription || ""}
                   keywords={singleBlog?.keywords || serverData?.keywords || ""}
                   ogUrl={`${BaseUrl}/blog/${slug}`}
                   ogImage={`${BaseUrl}/${singleBlog?.image}`}
                   ogImageWidth="1200"
                   ogImageHeight="630"
                   canonicalUrl={`${BaseUrl}/blog/${slug}`}
                   faqItemSchema={faqSchema}
                   // robots={categoryData?.robots || serverData?.robots || "index, follow"}
                   robots={"noindex, nofollow"}
                 />

            <div className='max-w-7xl mx-auto py-6 px-4'>
                <div className='flex gap-8 md:flex-row flex-col'>
                    <div className='md:w-8/12 w-full space-y-6'>
                        <h1 className='text-3xl font-bold text-gray-800'>{singleBlog?.title}</h1>

                        {singleBlog?.image && (
                            <img
                                src={`${BaseUrl}/${singleBlog.image}`}
                                className='rounded-lg w-full h-auto max-h-96 object-cover'
                                alt={singleBlog?.imageAltText}
                            />
                        )}

                        <div className='flex justify-end'>
                            <Button
                                label={"Get A Quote"}
                                className="bg-[#4440E6] text-white w-64 px-6 py-2 rounded-md hover:bg-[#3935c7] transition-colors"
                            />
                        </div>

                        <div
                            className="text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: singleBlog?.content }}
                        />
                    </div>

                    <div className='md:w-4/12 w-full'>
                        <TableOfContent content={singleBlog?.content} />

                        <div className='mt-8 bg-white'>
                            <h3 className='text-lg font-semibold mb-4'>Latest Articles</h3>
                            <ul className='space-y-3'>
                                {
                                    blogs?.map((item, index) => {
                                        return (
                                            <li className='pb-2'>
                                                <div className=' flex  gap-3'>
                                                    <div className=' w-4/12 h-28'>
                                                        <img src={`${BaseUrl}/${item?.image}`} className=' w-full h-full object-cover object-center rounded-lg' />
                                                    </div>
                                                    <div className=' w-8/12'>
                                                        <Link to="#" className='text-[#4440E6] hover:underline'>
                                                            {item?.title}
                                                        </Link>
                                                        <div
                                                            className="text-gray-600 mb-4 flex-1 line-clamp-3"
                                                            dangerouslySetInnerHTML={{ __html: item?.content }}
                                                        />
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                                <Button
                                    label={"Get A Quote"}
                                    className="bg-[#4440E6] text-white  w-full px-6 py-2 rounded-md hover:bg-[#3935c7] transition-colors"
                                />

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default SingleBlog;