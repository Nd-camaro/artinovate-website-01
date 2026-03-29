import { useEffect } from "react";

interface HeadConfig {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  jsonLd?: object | null;
}

export function useDocumentHead(config: HeadConfig) {
  useEffect(() => {
    const cleanups: (() => void)[] = [];

    if (config.title) {
      const prev = document.title;
      document.title = config.title;
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

    if (config.description) setMeta("description", config.description);
    if (config.ogTitle) setMeta("og:title", config.ogTitle, true);
    if (config.ogDescription) setMeta("og:description", config.ogDescription, true);

    if (config.canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      const existed = !!link;
      const prev = link?.href;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = config.canonicalUrl;
      cleanups.push(() => {
        if (existed && prev) link!.href = prev;
        else if (!existed) link!.remove();
      });
    }

    if (config.jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(config.jsonLd);
      document.head.appendChild(script);
      cleanups.push(() => script.remove());
    }

    return () => cleanups.forEach(fn => fn());
  }, [config.title, config.description, config.canonicalUrl, config.ogTitle, config.ogDescription, config.jsonLd]);
}
