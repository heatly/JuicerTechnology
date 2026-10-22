"use client";
import Script from "next/script";
import { useEffect } from "react";

const GA = process.env.NEXT_PUBLIC_GA4_ID;
const PIXEL = process.env.NEXT_PUBLIC_META_PIXEL_ID;

declare global {
  interface Window { gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void }
}

/** Fire a conversion/engagement event to GA4 and Meta Pixel (no-ops if not configured). */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
  if (event === "generate_lead") window.fbq?.("track", "Lead", params);
  else window.fbq?.("trackCustom", event, params);
}

export function Analytics() {
  // Persist UTM parameters for the session so forms and ad conversions can be attributed.
  useEffect(() => {
    try {
      const p = new URLSearchParams(location.search);
      const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "fbclid", "gclid"];
      const found: Record<string, string> = {};
      keys.forEach((k) => p.get(k) && (found[k] = p.get(k)!));
      if (Object.keys(found).length) sessionStorage.setItem("juicer_utm", JSON.stringify(found));
    } catch {}
  }, []);

  return (
    <>
      {GA && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA}');`}</Script>
        </>
      )}
      {PIXEL && (
        <Script id="meta-pixel" strategy="afterInteractive">{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL}');fbq('track','PageView');`}</Script>
      )}
    </>
  );
}
