import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";

function TableOfContent({ content }) {
    const [openTable, setTableOpen] = useState(true);
    const [headings, setHeadings] = useState([]);

    useEffect(() => {
        if (content) {
            // Parse HTML content and extract headings
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, 'text/html');
            const headingElements = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));
            
            // Process headings and ensure they have proper IDs
            const processedHeadings = headingElements.map((heading, index) => {
                // Generate consistent ID if not exists
                if (!heading.id) {
                    heading.id = `section-${index}-${heading.textContent
                        .toLowerCase()
                        .replace(/[^\w\s]/g, '')
                        .replace(/\s+/g, '-')}`;
                }
                return {
                    text: heading.textContent,
                    id: heading.id,
                    level: parseInt(heading.tagName.substring(1))
                };
            });

            setHeadings(processedHeadings);

            // Add IDs to actual headings in the DOM
            const contentElement = document.getElementById('blog-content');
            if (contentElement) {
                const domHeadings = contentElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
                domHeadings.forEach((heading, index) => {
                    if (!heading.id) {
                        heading.id = `section-${index}-${heading.textContent
                            .toLowerCase()
                            .replace(/[^\w\s]/g, '')
                            .replace(/\s+/g, '-')}`;
                    }
                });
            }
        }
    }, [content]);

    const scrollToHeading = (id, event) => {
        event.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            // Calculate position with offset for fixed headers
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Update URL without triggering jump
            if (history.pushState) {
                history.pushState(null, null, `#${id}`);
            } else {
                window.location.hash = `#${id}`;
            }
        }
    };

    return (
        <div className='sticky top-5'>
            <div className='bg-white rounded-lg border shadow overflow-hidden'>
                <div 
                    className='flex items-center justify-between p-4 cursor-pointer'
                    onClick={() => setTableOpen(!openTable)}
                >
                    <span className='text-xl font-semibold'>Table of Contents</span>
                    <IoIosArrowDown className={`transition-transform ${openTable ? 'rotate-180' : ''}`} />
                </div>
                
                {openTable && (
                    <div className='border-t max-h-96 overflow-y-auto'>
                        <ul className='p-4 space-y-2'>
                            {headings.map((heading, index) => (
                                <li 
                                    key={`${heading.id}-${index}`} 
                                    className={`text-sm hover:text-[#4440E6] cursor-pointer transition-colors ${
                                        heading.level === 1 ? 'pl-0 font-semibold' : 
                                        heading.level === 2 ? 'pl-2' : 
                                        'pl-4'
                                    }`}
                                >
                                    <a 
                                        href={`#${heading.id}`}
                                        onClick={(e) => scrollToHeading(heading.id, e)}
                                        className='block hover:underline flex items-start'
                                    >
                                        <span className='text-gray-500 mr-2 min-w-[20px]'>{index + 1}.</span>
                                        <span>
                                            {heading.text.length > 25 
                                                ? `${heading.text.substring(0, 28)}...` 
                                                : heading.text}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TableOfContent;