import { useEffect } from "react";

const SITE_NAME = "Velora";
const AUTHOR = "Omid Teimory";
const BASE_URL =
  typeof window !== "undefined"
    ? window.location.origin
    : "https://velora.local";

const DEFAULT_META = {
  title: `${SITE_NAME} | Modern fashion by ${AUTHOR}`,
  description:
    "Velora is a curated fashion destination for Men, Women, Watches, and Accessories - crafted and developed by Omid Teimory.",
  keywords:
    "Velora, Omid Teimory, fashion store, watches, accessories, men clothing, women clothing, ecommerce",
  image:
    "https://dummyimage.com/1200x630/f97316/ffffff&text=Velora+by+Omid+Teimory",
};

const setMetaTag = (selector, attribute, content) => {
  if (typeof document === "undefined") return;
  const head = document.head || document.getElementsByTagName("head")[0];
  let tag = head.querySelector(selector);
  if (!tag) {
    const name = selector.match(/name="([^"]+)"/)?.[1];
    const property = selector.match(/property="([^"]+)"/)?.[1];
    const tagName = selector.startsWith("link") ? "link" : "meta";
    tag = document.createElement(tagName);
    if (name) tag.setAttribute("name", name);
    if (property) tag.setAttribute("property", property);
    if (tagName === "link") {
      const rel = selector.match(/rel="([^"]+)"/)?.[1] || "canonical";
      tag.setAttribute("rel", rel);
    }
    head.appendChild(tag);
  }
  tag.setAttribute(attribute, content);
};

const setJsonLd = (id, payload) => {
  if (typeof document === "undefined" || !payload) return;
  const head = document.head || document.getElementsByTagName("head")[0];
  let script = document.getElementById(id);
  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    head.appendChild(script);
  }
  script.textContent = JSON.stringify(payload);
};

export function Seo(meta = {}) {
  const merged = { ...DEFAULT_META, ...meta };
  const canonicalUrl =
    merged.url ||
    (typeof window !== "undefined"
      ? `${BASE_URL}${window.location.pathname}${window.location.search}`
      : BASE_URL);

  useEffect(() => {
    if (typeof document === "undefined") return;

    document.title = merged.title;

    setMetaTag('meta[name="description"]', "content", merged.description);
    setMetaTag('meta[name="keywords"]', "content", merged.keywords);
    setMetaTag('meta[name="author"]', "content", AUTHOR);
    setMetaTag(
      'meta[name="copyright"]',
      "content",
      `Copyright 2025 ${AUTHOR} - Developed by ${AUTHOR}`
    );
    setMetaTag('meta[name="theme-color"]', "content", "#f97316");
    setMetaTag('meta[name="robots"]', "content", merged.robots || "index,follow");
    setMetaTag('link[rel="canonical"]', "href", canonicalUrl);

    // Open Graph
    setMetaTag('meta[property="og:title"]', "content", merged.title);
    setMetaTag('meta[property="og:description"]', "content", merged.description);
    setMetaTag('meta[property="og:image"]', "content", merged.image);
    setMetaTag('meta[property="og:url"]', "content", canonicalUrl);
    setMetaTag('meta[property="og:type"]', "content", merged.type || "website");
    setMetaTag('meta[property="og:site_name"]', "content", SITE_NAME);

    // Twitter
    setMetaTag('meta[name="twitter:card"]', "content", "summary_large_image");
    setMetaTag('meta[name="twitter:title"]', "content", merged.title);
    setMetaTag(
      'meta[name="twitter:description"]',
      "content",
      merged.description
    );
    setMetaTag('meta[name="twitter:image"]', "content", merged.image);

    // Structured data
    setJsonLd("velora-schema", {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
      logo: merged.image,
      sameAs: [
        "https://www.linkedin.com/in/omid-teimory",
        "https://github.com/omidteimory",
      ],
      founder: {
        "@type": "Person",
        name: AUTHOR,
      },
    });

    if (merged.structuredData) {
      setJsonLd("velora-page-schema", merged.structuredData);
    }
  }, [
    merged.title,
    merged.description,
    merged.keywords,
    merged.image,
    merged.url,
    merged.type,
    merged.structuredData,
  ]);

  return null;
}

export const seoDefaults = { ...DEFAULT_META, siteName: SITE_NAME, author: AUTHOR };
