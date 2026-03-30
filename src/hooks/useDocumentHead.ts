import { useLayoutEffect, useState } from "react";

interface HeadConfig {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  jsonLd?: object | null;
}

export function useDocumentHead(config: HeadConfig, enabled = true) {
  const { title, description, canonicalUrl, ogTitle, ogDescription, jsonLd } = config;
  const serializedJsonLd = jsonLd ? JSON.stringify(jsonLd) : "";
  const targetKey = enabled
    ? JSON.stringify([
        title ?? "",
        description ?? "",
        canonicalUrl ?? "",
        ogTitle ?? "",
        ogDescription ?? "",
        serializedJsonLd,
      ])
    : "";
  const [appliedKey, setAppliedKey] = useState("");

  useLayoutEffect(() => {
    if (!enabled) {
      setAppliedKey("");
      return;
    }

    const cleanups: (() => void)[] = [];

    if (title) {
      const prev = document.title;
      document.title = title;
      cleanups.push(() => { document.title = prev; });
    }

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      const existed = !!el;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      const prev = el.content;
      el.content = content;
      cleanups.push(() => {
        if (existed) el!.content = prev;
        else el!.remove();
      });
    };

    if (description) setMeta("description", description);
    if (ogTitle) setMeta("og:title", ogTitle, true);
    if (ogDescription) setMeta("og:description", ogDescription, true);

    if (canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      const existed = !!link;
      const prev = link?.href;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonicalUrl;
      cleanups.push(() => {
        if (existed && prev) link!.href = prev;
        else if (!existed) link!.remove();
      });
    }

    if (serializedJsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = serializedJsonLd;
      document.head.appendChild(script);
      cleanups.push(() => script.remove());
    }

    setAppliedKey(targetKey);

    return () => cleanups.forEach((fn) => fn());
  }, [enabled, title, description, canonicalUrl, ogTitle, ogDescription, serializedJsonLd, targetKey]);

  return enabled && appliedKey === targetKey;
}
