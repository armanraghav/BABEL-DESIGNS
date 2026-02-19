import { useEffect } from "react";

export interface SeoOptions {
  title: string;
  description?: string;
  canonicalPath?: string;
  noIndex?: boolean;
  structuredData?: Record<string, unknown>;
}

const upsertMeta = (selector: string, attrs: Record<string, string>) => {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attrs).forEach(([key, value]) => element?.setAttribute(key, value));
};

const upsertLink = (selector: string, attrs: Record<string, string>) => {
  let element = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }
  Object.entries(attrs).forEach(([key, value]) => element?.setAttribute(key, value));
};

const upsertJsonLd = (data?: Record<string, unknown>) => {
  const id = "babel-jsonld";
  const existing = document.getElementById(id);

  if (!data) {
    existing?.remove();
    return;
  }

  const script = existing ?? document.createElement("script");
  script.id = id;
  script.setAttribute("type", "application/ld+json");
  script.textContent = JSON.stringify(data);
  if (!existing) document.head.appendChild(script);
};

export const useSeo = ({ title, description, canonicalPath, noIndex, structuredData }: SeoOptions) => {
  useEffect(() => {
    document.title = title;

    if (description) {
      upsertMeta("meta[name='description']", {
        name: "description",
        content: description,
      });
      upsertMeta("meta[property='og:description']", {
        property: "og:description",
        content: description,
      });
      upsertMeta("meta[name='twitter:description']", {
        name: "twitter:description",
        content: description,
      });
    }

    upsertMeta("meta[property='og:title']", { property: "og:title", content: title });
    upsertMeta("meta[name='twitter:title']", { name: "twitter:title", content: title });
    upsertMeta("meta[name='robots']", { name: "robots", content: noIndex ? "noindex, nofollow" : "index, follow" });

    if (canonicalPath && typeof window !== "undefined") {
      const canonicalUrl = new URL(canonicalPath, window.location.origin).toString();
      upsertLink("link[rel='canonical']", { rel: "canonical", href: canonicalUrl });
      upsertMeta("meta[property='og:url']", { property: "og:url", content: canonicalUrl });
    }

    upsertJsonLd(structuredData);
  }, [title, description, canonicalPath, noIndex, structuredData]);
};
