import type { Metadata } from "next";

/**
 * Deep merge two Metadata objects. Override values take precedence.
 */
export function mergeMetadata(
  base: Metadata,
  overrides: Metadata,
): Metadata {
  const merged: Metadata = { ...base };

  for (const key of Object.keys(overrides) as Array<keyof Metadata>) {
    const overrideVal = overrides[key];
    const baseVal = base[key];

    if (overrideVal === null || overrideVal === undefined) {
      // Override explicitly removes a field
      delete merged[key];
      continue;
    }

    if (
      baseVal &&
      typeof baseVal === "object" &&
      typeof overrideVal === "object" &&
      !Array.isArray(baseVal) &&
      !Array.isArray(overrideVal) &&
      key !== "metadataBase" &&
      key !== "alternates"
    ) {
      (merged as Record<string, unknown>)[key] = {
        ...(baseVal as Record<string, unknown>),
        ...(overrideVal as Record<string, unknown>),
      };
    } else {
      (merged as Record<string, unknown>)[key] = overrideVal;
    }
  }

  return merged;
}

export const defaultSeoFields: Metadata = {
  metadataBase: new URL("https://beydigitalmedia.com"),
  openGraph: {
    siteName: "Bey Digital Media",
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bey Digital Media - Dijital Pazarlama Ajansi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
