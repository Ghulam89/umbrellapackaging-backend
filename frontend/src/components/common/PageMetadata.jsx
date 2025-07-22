import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
const PageMetadata = ({
    title ,
    description,
    keywords = '',
    author = '',
    ogUrl = '',
    ogImage = '',
    ogImageWidth = '',
    ogImageHeight = '',
    ogImageType = '',
    modifiedTime = '',
    canonicalUrl = '',
    breadcrumbSchema = {},
    homeSchema = {},
    productSchema = {},
    itemListSchema = {},
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
            {keywords && <meta name="keywords" content={keywords} />}
            {author && <meta name="author" content={author} />}
            <meta name="robots" content={robots} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            {ogUrl && <meta property="og:url" content={ogUrl} />}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {ogImage && <meta property="og:image" content={ogImage} />}
            {ogImageWidth && <meta property="og:image:width" content={ogImageWidth} />}
            {ogImageHeight && <meta property="og:image:height" content={ogImageHeight} />}
            {ogImageType && <meta property="og:image:type" content={ogImageType} />}
            <meta property="og:site_name" content="Umbrella Custom Packaging" />
            <meta property="og:locale" content="en_US" />
            {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            {ogImage && <meta name="twitter:image" content={ogImage} />}
            <meta name="twitter:site" content="@UmbrellaPackaging" />
            <meta name="twitter:creator" content="@UmbrellaPackaging" />

            {/* Canonical URL */}
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
            
            {/* Structured Data */}
            {breadcrumbSchema && Object.keys(breadcrumbSchema).length > 0 && (
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbSchema)}
                </script>
            )}
            {homeSchema && Object.keys(homeSchema).length > 0 && (
                <script type="application/ld+json">
                    {JSON.stringify(homeSchema)}
                </script>
            )}
            {productSchema && Object.keys(productSchema).length > 0 && (
                <script type="application/ld+json">
                    {JSON.stringify(productSchema)}
                </script>
            )}
            {itemListSchema && Object.keys(itemListSchema).length > 0 && (
                <script type="application/ld+json">
                    {JSON.stringify(itemListSchema)}
                </script>
            )}
        </Helmet>
    );
};

export default PageMetadata;