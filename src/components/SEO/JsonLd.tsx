export interface OrganizationJsonLdProps {
  name: string;
  url: string;
  logo?: string;
  telephone?: string;
  sameAs?: string[];
  description?: string;
}

export function OrganizationJsonLd({
  name,
  url,
  logo,
  telephone,
  sameAs,
  description,
}: OrganizationJsonLdProps) {
  if (!name || !url) return null;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
  };

  if (logo) data.logo = logo;
  if (telephone) data.telephone = telephone;
  if (sameAs && sameAs.length > 0) data.sameAs = sameAs;
  if (description) data.description = description;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export interface WebSiteJsonLdProps {
  url: string;
  name: string;
  description?: string;
}

export function WebSiteJsonLd({ url, name, description }: WebSiteJsonLdProps) {
  if (!url || !name) return null;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url,
    name,
    potentialAction: {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        urlTemplate: `${url}/ara?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  if (description) data.description = description;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export interface FAQPageJsonLdProps {
  questions: { question: string; answer: string }[];
}

export function FAQPageJsonLd({ questions }: FAQPageJsonLdProps) {
  if (!questions || questions.length === 0) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer.replace(/<[^>]*>/g, ""),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export interface BreadcrumbListJsonLdProps {
  items: { name: string; url: string }[];
}

export function BreadcrumbListJsonLd({ items }: BreadcrumbListJsonLdProps) {
  if (!items || items.length === 0) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export interface ServiceJsonLdProps {
  name: string;
  url: string;
  description: string;
  provider: { name: string; url: string };
}

export function ServiceJsonLd({
  name,
  url,
  description,
  provider,
}: ServiceJsonLdProps) {
  if (!name || !url || !description) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    url,
    description,
    provider: {
      "@type": "Organization",
      name: provider.name,
      url: provider.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export interface ArticleJsonLdProps {
  title: string;
  url: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  publisherName?: string;
}

export function ArticleJsonLd({
  title,
  url,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
  publisherName,
}: ArticleJsonLdProps) {
  if (!title || !url || !description) return null;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    url,
    description,
  };

  if (image) data.image = image;
  if (datePublished) data.datePublished = datePublished;
  if (dateModified) data.dateModified = dateModified;
  if (authorName) {
    data.author = {
      "@type": "Person",
      name: authorName,
    };
  }
  if (publisherName) {
    data.publisher = {
      "@type": "Organization",
      name: publisherName,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
