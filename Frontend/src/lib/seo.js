import { absoluteUrl, getSiteUrl, resolveImageUrl } from "./site";

export const siteConfig = {
  name: "Velora",
  description:
    "Velora is a modern fashion store for elevated essentials, statement watches, and everyday accessories.",
  category: "fashion",
  creator: "Omid Teimory",
  locale: "en_US",
  currency: "USD",
  keywords: [
    "Velora",
    "fashion store",
    "online clothing store",
    "watches",
    "accessories",
    "new arrivals",
    "menswear",
    "womenswear",
  ],
};

const defaultRobots = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

const noIndexRobots = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
    "max-image-preview": "none",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

function dedupeKeywords(keywords = []) {
  return Array.from(new Set([...siteConfig.keywords, ...keywords].filter(Boolean)));
}

function formatSocialTitle(title) {
  return title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
}

export function sanitizeDescription(value) {
  const text = String(value || siteConfig.description)
    .replace(/\s+/g, " ")
    .trim();

  return text.slice(0, 160);
}

export function buildPageMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  path = "/",
  image = "/opengraph-image",
  keywords = [],
  noIndex = false,
  type = "website",
} = {}) {
  const cleanDescription = sanitizeDescription(description);
  const canonical = absoluteUrl(path);
  const socialTitle = formatSocialTitle(title);
  const socialImage = resolveImageUrl(image);

  return {
    title,
    description: cleanDescription,
    keywords: dedupeKeywords(keywords),
    category: siteConfig.category,
    alternates: {
      canonical,
    },
    openGraph: {
      title: socialTitle,
      description: cleanDescription,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: socialTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: cleanDescription,
      images: [socialImage],
    },
    robots: noIndex ? noIndexRobots : defaultRobots,
  };
}

export function buildNoIndexMetadata(options = {}) {
  return buildPageMetadata({
    ...options,
    noIndex: true,
  });
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: getSiteUrl(),
    logo: absoluteUrl("/favicon.ico"),
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    url: getSiteUrl(),
    potentialAction: {
      "@type": "SearchAction",
      target: `${getSiteUrl()}/products?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildWebPageSchema({ title, description, path = "/" }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: sanitizeDescription(description),
    url: absoluteUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: getSiteUrl(),
    },
  };
}

export function buildBreadcrumbSchema(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildCollectionPageSchema({
  title,
  description,
  path = "/products",
  products = [],
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description: sanitizeDescription(description),
    url: absoluteUrl(path),
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: products.length,
      itemListElement: products.slice(0, 12).map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/products/${product._id || product.id}`),
        name: product.name,
      })),
    },
  };
}

function buildReviewSchema(review) {
  return {
    "@type": "Review",
    author: {
      "@type": "Person",
      name: review.name,
    },
    reviewBody: review.comment,
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    datePublished: review.createdAt,
  };
}

export function buildProductSchema({ product, reviews = [] }) {
  if (!product) {
    return null;
  }

  const productId = product._id || product.id;
  const price = product.newPrice ?? product.price ?? 0;
  const validReviews = reviews.filter(
    (review) =>
      review &&
      review.name &&
      review.comment &&
      Number.isFinite(Number(review.rating)),
  );

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: sanitizeDescription(product.description),
    category: product.category,
    sku: String(productId || ""),
    image: [resolveImageUrl(product.imageUrl || product.image)],
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/products/${productId}`),
      price,
      priceCurrency: siteConfig.currency,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  if (validReviews.length > 0) {
    const ratingValues = validReviews.map((review) => Number(review.rating));
    const averageRating =
      ratingValues.reduce((sum, value) => sum + value, 0) / ratingValues.length;

    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: Number(averageRating.toFixed(1)),
      reviewCount: validReviews.length,
    };
    schema.review = validReviews.slice(0, 5).map(buildReviewSchema);
  }

  return schema;
}
