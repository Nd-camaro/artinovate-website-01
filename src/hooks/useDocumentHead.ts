import { useLayoutEffect, useState } from "react";

interface HeadConfig {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  jsonLd?: object | null;
}

export function useDocumentHead(config: HeadConfig, enabled = true) {
  const { title, description, canonicalUrl, jsonLd } = config;
  const serializedJsonLd = jsonLd ? JSON.stringify(jsonLd) : "";
  const targetKey = enabled
    ? JSON.stringify([
        title ?? "",
        description ?? "",
        canonicalUrl ?? "",
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

    const titleElement = document.querySelector("title");
    if (title) {
      const prev = titleElement?.textContent ?? document.title;
      document.title = title;
      if (titleElement) {
        titleElement.textContent = title;
        console.log("Replaced <title> tag content.", title);
      } else {
        console.log("Replaced document.title.", title);
      }
      cleanups.push(() => {
        document.title = prev;
        if (titleElement) {
          titleElement.textContent = prev;
        }
      });
    }

    const replaceMetaContent = (name: string, content: string) => {
      const el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        console.warn(`Existing <meta name="${name}"> tag not found.`);
        return;
      }
      const prev = el.content;
      el.content = content;
      console.log(`Replaced <meta name="${name}"> content attribute.`, content);
      cleanups.push(() => {
        el.content = prev;
      });
    };

    const replaceMetaProperty = (property: string, content: string) => {
      let el = document.querySelector(
        `meta[property="${property}"]`
      ) as HTMLMetaElement | null;
      let created = false;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
        created = true;
      }
      const prev = el.content;
      el.content = content;
      cleanups.push(() => {
        if (created) {
          el?.remove();
        } else if (el) {
          el.content = prev;
        }
      });
    };

    if (description) replaceMetaContent("description", description);

    // Keep social preview tags in sync with the current route
    if (title) {
      replaceMetaProperty("og:title", title);
      replaceMetaContent("twitter:title", title);
    }
    if (description) {
      replaceMetaProperty("og:description", description);
      replaceMetaContent("twitter:description", description);
    }
    if (canonicalUrl) {
      replaceMetaProperty("og:url", canonicalUrl);
    }

    if (canonicalUrl) {
      const link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        console.warn('Existing <link rel="canonical"> tag not found.');
      } else {
        const prev = link.href;
        link.href = canonicalUrl;
        console.log('Replaced <link rel="canonical"> href attribute.', canonicalUrl);
        cleanups.push(() => {
          link.href = prev;
        });
      }
    }

    const previousJsonLdScripts = Array.from(
      document.querySelectorAll('script[type="application/ld+json"]')
    ).map((script) => script.cloneNode(true) as HTMLScriptElement);

    document
      .querySelectorAll('script[type="application/ld+json"]')
      .forEach((script) => script.remove());
    console.log("Removed existing homepage JSON-LD script tags.");

    if (serializedJsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = serializedJsonLd;
      document.head.appendChild(script);
      console.log("Injected new FAQ JSON-LD script tag.", serializedJsonLd);
      cleanups.push(() => {
        script.remove();
        previousJsonLdScripts.forEach((previousScript) => {
          document.head.appendChild(previousScript.cloneNode(true));
        });
      });
    } else {
      cleanups.push(() => {
        previousJsonLdScripts.forEach((previousScript) => {
          document.head.appendChild(previousScript.cloneNode(true));
        });
      });
    }

    setAppliedKey(targetKey);

    return () => cleanups.forEach((fn) => fn());
  }, [enabled, title, description, canonicalUrl, serializedJsonLd, targetKey]);

  return enabled && appliedKey === targetKey;
}
