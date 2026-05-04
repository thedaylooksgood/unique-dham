export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: eventName,
      ...properties,
    });
  }
};

export const SEO_EVENTS = {
  CTA_CLICK: "cta_click",
  PHONE_CLICK: "phone_click",
  NAV_CLICK: "nav_click",
  DIRECTIONS_CLICK: "directions_click",
};
