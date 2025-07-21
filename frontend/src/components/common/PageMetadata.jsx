
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { BaseUrl } from '../../utils/BaseUrl';

const PageMetadata = ({
    title,
    description,
    keywords,
    author,
    ogUrl,
    ogImage,
    ogImageWidth,
    ogImageHeight,
    ogImageType,
    modifiedTime,
    canonicalUrl,
    breadcrumbSchema,
    homeSchema,
    productSchema,
    itemListSchema,
    robots
}) => {
    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <meta name="robots" content={robots} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={ogUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:width" content={ogImageWidth} />
            <meta property="og:image:height" content={ogImageHeight} />
            <meta property="og:image:type" content={ogImageType} />
            <meta property="og:site_name" content="Umbrella Custom Packaging" />
            <meta property="og:locale" content="en_US" />
            <meta property="article:modified_time" content={modifiedTime} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />
            <meta name="twitter:site" content="@UmbrellaPackaging" />
            <meta name="twitter:creator" content="@UmbrellaPackaging" />

            {/* Canonical URL */}
            <link rel="canonical" href={canonicalUrl} />
            <script type="application/ld+json">
                {JSON.stringify(breadcrumbSchema)}
            </script>
            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(homeSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(productSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(itemListSchema)}
            </script>
        </Helmet>
    );
};

export default PageMetadata;