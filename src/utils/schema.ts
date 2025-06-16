// Organization Schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "НОРДИНЖИНИРИНГ",
  url: "https://nordengineering.ru",
  logo: "https://nordengineering.ru/logo.png",
  description:
    "Профессиональные решения в области вентиляции и климатического оборудования. Проектирование, монтаж и обслуживание систем любой сложности.",
  foundingDate: "2005",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Примерная, д. 123",
    addressLocality: "Москва",
    postalCode: "123456",
    addressCountry: "RU",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+7-123-456-78-90",
    contactType: "customer service",
    availableLanguage: "Russian",
  },
  sameAs: ["https://wa.me/71234567890", "https://t.me/nordengineering"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Климатическое оборудование",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Кондиционеры",
      },
      {
        "@type": "OfferCatalog",
        name: "Вентиляционные системы",
      },
      {
        "@type": "OfferCatalog",
        name: "Системы очистки воздуха",
      },
    ],
  },
};

// Website Schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "НОРДИНЖИНИРИНГ",
  url: "https://nordengineering.ru",
  description:
    "Профессиональные решения в области вентиляции и климатического оборудования",
  publisher: {
    "@type": "Organization",
    name: "НОРДИНЖИНИРИНГ",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://nordengineering.ru/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

// Local Business Schema
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "НОРДИНЖИНИРИНГ",
  image: "https://nordengineering.ru/logo.png",
  description:
    "Профессиональные решения в области вентиляции и климатического оборудования",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Примерная, д. 123",
    addressLocality: "Москва",
    postalCode: "123456",
    addressCountry: "RU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "55.7558",
    longitude: "37.6176",
  },
  telephone: "+7-123-456-78-90",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "16:00",
    },
  ],
  priceRange: "$$",
  url: "https://nordengineering.ru",
};

// Product Schema Generator
export const generateProductSchema = (product: {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  model: string;
  images: string[];
  rating?: number;
  reviewCount?: number;
  category: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: product.description,
  image: product.images,
  brand: {
    "@type": "Brand",
    name: product.brand,
  },
  model: product.model,
  sku: product.id,
  category: product.category,
  offers: {
    "@type": "Offer",
    url: `https://nordengineering.ru/catalog/${product.category}/${product.id}`,
    priceCurrency: "RUB",
    price: product.price,
    availability: "https://schema.org/InStock",
    seller: {
      "@type": "Organization",
      name: "НОРДИНЖИНИРИНГ",
    },
  },
  ...(product.rating &&
    product.reviewCount && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviewCount,
      },
    }),
});

// Article Schema Generator
export const generateArticleSchema = (article: {
  title: string;
  excerpt: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  category: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.excerpt,
  image:
    article.image || "https://nordengineering.ru/default-article-image.jpg",
  author: {
    "@type": "Person",
    name: article.author,
  },
  publisher: {
    "@type": "Organization",
    name: "НОРДИНЖИНИРИНГ",
    logo: {
      "@type": "ImageObject",
      url: "https://nordengineering.ru/logo.png",
    },
  },
  datePublished: article.datePublished,
  dateModified: article.dateModified || article.datePublished,
  url: article.url,
  articleSection: article.category,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": article.url,
  },
});

// Service Schema Generator
export const generateServiceSchema = (service: {
  name: string;
  description: string;
  serviceType: string;
  areaServed: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.name,
  description: service.description,
  serviceType: service.serviceType,
  provider: {
    "@type": "Organization",
    name: "НОРДИНЖИНИРИНГ",
    url: "https://nordengineering.ru",
  },
  areaServed: {
    "@type": "Place",
    name: service.areaServed,
  },
});

// FAQ Schema Generator
export const generateFAQSchema = (
  faqs: Array<{ question: string; answer: string }>,
) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

// Review Schema Generator
export const generateReviewSchema = (
  reviews: Array<{
    rating: number;
    reviewBody: string;
    author: string;
    datePublished: string;
  }>,
) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "НОРДИНЖИНИРИНГ",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue:
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length,
    reviewCount: reviews.length,
  },
  review: reviews.map((review) => ({
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
    },
    reviewBody: review.reviewBody,
    author: {
      "@type": "Person",
      name: review.author,
    },
    datePublished: review.datePublished,
  })),
});

// Breadcrumb Schema Generator
export const generateBreadcrumbSchema = (
  breadcrumbs: Array<{ name: string; url: string }>,
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: crumb.url,
  })),
});
