interface PageSEOData {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export const createSEOData = (
  title: string,
  description: string,
  options: Partial<PageSEOData> = {},
): PageSEOData => {
  const baseUrl = "https://nordengineering.ru";
  const defaultOgImage = `${baseUrl}/og-image.jpg`;

  return {
    title,
    description,
    keywords: options.keywords,
    canonical: options.canonical,
    ogTitle: options.ogTitle || title,
    ogDescription: options.ogDescription || description,
    ogImage: options.ogImage || defaultOgImage,
    ogType: options.ogType || "website",
    noindex: options.noindex || false,
    nofollow: options.nofollow || false,
  };
};

export const seoPages = {
  home: createSEOData(
    "НОРДИНЖИНИРИНГ - Вентиляционное и климатическое оборудование",
    "Профессиональные решения в области вентиляции и климатического оборудования. Проектирование, монтаж и обслуживание систем любой сложности. 18+ лет опыта, 1000+ проектов.",
    {
      keywords:
        "вентиляция, кондиционирование, климатическое оборудование, монтаж, проектирование, обслуживание, Москва",
      canonical: "https://nordengineering.ru/",
      ogTitle: "НОРДИНЖИНИРИНГ - Лидер в области климатических решений",
      ogDescription:
        "Профессиональные решения в области вентиляции и климатического оборудования с 2005 года. Полный цикл услуг от проектирования до обслуживания.",
      ogImage: "https://nordengineering.ru/og-home.jpg",
    },
  ),

  catalog: createSEOData(
    "Каталог климатического оборудования - НОРДИНЖИНИРИНГ",
    "Широкий ассортимент вентиляционного и климатического оборудования от ведущих производителей. Кондиционеры, вентиляторы, системы очистки воздуха. Гарантия качества.",
    {
      keywords:
        "каталог оборудования, кондиционеры, вентиляторы, очистка воздуха, климатическое оборудование",
      canonical: "https://nordengineering.ru/catalog",
      ogImage: "https://nordengineering.ru/og-catalog.jpg",
    },
  ),

  services: createSEOData(
    "Услуги по монтажу и обслуживанию климатических систем",
    "Полный спектр услуг: проектирование, монтаж, техническое обслуживание и ремонт систем вентиляции и кондиционирования. Профессиональная команда с опытом 18+ лет.",
    {
      keywords:
        "монтаж вентиляции, обслуживание кондиционеров, проектирование климатических систем, ремонт вентиляции",
      canonical: "https://nordengineering.ru/services",
      ogImage: "https://nordengineering.ru/og-services.jpg",
    },
  ),

  about: createSEOData(
    "О компании НОРДИНЖИНИРИНГ - Эксперты в области климатических систем",
    "Компания НОРДИНЖИНИРИНГ - ведущий поставщик климатического оборудования с 2005 года. Более 1000 реализованных проектов, команда профессионалов, собственный сервисный центр.",
    {
      keywords:
        "о компании, климатические системы, вентиляция, история компании, команда профессионалов",
      canonical: "https://nordengineering.ru/about",
      ogImage: "https://nordengineering.ru/og-about.jpg",
    },
  ),

  contacts: createSEOData(
    "Контакты НОРДИНЖИНИРИНГ - Свяжитесь с нами",
    "Контактная информация компании НОРДИНЖИНИРИНГ. Адрес офиса, телефоны, email. Консультации по выбору и установке климатического оборудования. Выезд специалиста.",
    {
      keywords:
        "контакты, адрес, телефон, консультация, выезд специалиста, климатическое оборудование",
      canonical: "https://nordengineering.ru/contacts",
      ogImage: "https://nordengineering.ru/og-contacts.jpg",
    },
  ),

  blog: createSEOData(
    "Блог о климатических системах и вентиляции - НОРДИНЖИНИРИНГ",
    "Полезные статьи о выборе, установке и обслуживании климатического оборудования. Советы экспертов, обзоры новинок, инструкции по эксплуатации.",
    {
      keywords:
        "блог, статьи, климатические системы, советы экспертов, обслуживание оборудования",
      canonical: "https://nordengineering.ru/blog",
      ogType: "blog",
      ogImage: "https://nordengineering.ru/og-blog.jpg",
    },
  ),

  projects: createSEOData(
    "Наши проекты - Реализованные объекты НОРДИНЖИНИРИНГ",
    "Портфолио выполненных проектов по установке климатических систем. Жилые комплексы, офисные центры, производственные объекты. Фото до и после.",
    {
      keywords:
        "проекты, портфолио, реализованные объекты, установка климатических систем",
      canonical: "https://nordengineering.ru/projects",
      ogImage: "https://nordengineering.ru/og-projects.jpg",
    },
  ),

  reviews: createSEOData(
    "Отзывы клиентов о работе НОРДИНЖИНИРИНГ",
    "Честные отзывы клиентов о качестве услуг и оборудования НОРДИНЖИНИРИНГ. Рейтинги, рекомендации, опыт сотрудничества с нашей компанией.",
    {
      keywords: "отзывы, клиенты, рейтинг, рекомендации, качество услуг",
      canonical: "https://nordengineering.ru/reviews",
      ogImage: "https://nordengineering.ru/og-reviews.jpg",
    },
  ),

  faq: createSEOData(
    "Часто задаваемые вопросы - FAQ НОРДИНЖИНИРИНГ",
    "Ответы на популярные вопросы о выборе, установке и обслуживании климатического оборудования. Полезная информация для клиентов.",
    {
      keywords:
        "FAQ, часто задаваемые вопросы, климатическое оборудование, установка, обслуживание",
      canonical: "https://nordengineering.ru/faq",
      ogImage: "https://nordengineering.ru/og-faq.jpg",
    },
  ),
};

export const generateProductSEO = (
  productName: string,
  category: string,
  description: string,
) => {
  return createSEOData(
    `${productName} - Купить в НОРДИНЖИНИРИНГ`,
    `${description} ✓ Официальная гарантия ✓ Профессиональный монтаж ✓ Сервисное обслуживание ✓ Доставка по Москве и области`,
    {
      keywords: `${productName}, ${category}, купить, цена, характеристики, монтаж`,
      ogType: "product",
    },
  );
};

export const generateCategorySEO = (
  categoryName: string,
  description: string,
) => {
  return createSEOData(
    `${categoryName} - Каталог НОРДИНЖИНИРИНГ`,
    `${description} Большой выбор ${categoryName.toLowerCase()} от ведущих производителей. Консультации специалистов, доставка, монтаж.`,
    {
      keywords: `${categoryName}, каталог, купить, цена, характеристики, доставка`,
      ogType: "website",
    },
  );
};

export const generateBlogPostSEO = (
  title: string,
  excerpt: string,
  category: string,
  tags: string[],
) => {
  return createSEOData(`${title} - Блог НОРДИНЖИНИРИНГ`, excerpt, {
    keywords: `${tags.join(", ")}, ${category}, статья, блог`,
    ogType: "article",
  });
};
