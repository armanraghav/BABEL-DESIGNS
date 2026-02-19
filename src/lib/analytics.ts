export interface TrackEventPayload {
  event: string;
  [key: string]: string | number | boolean | null | undefined;
}

declare global {
  interface Window {
    dataLayer?: TrackEventPayload[];
    gtag?: (...args: unknown[]) => void;
  }
}

const isDev = import.meta.env.DEV;
const posthogHost = import.meta.env.VITE_POSTHOG_HOST ?? "https://app.posthog.com";
const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

const getAnalyticsId = () => {
  if (typeof window === "undefined") return "server";
  const storageKey = "babel_analytics_id";
  const existing = window.localStorage.getItem(storageKey);
  if (existing) return existing;
  const generated = crypto.randomUUID();
  window.localStorage.setItem(storageKey, generated);
  return generated;
};

export const trackEvent = (payload: TrackEventPayload) => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);

  if (gaMeasurementId && typeof window.gtag === "function") {
    window.gtag("event", payload.event, payload);
  }

  if (posthogKey) {
    fetch(`${posthogHost.replace(/\/$/, "")}/capture/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: posthogKey,
        event: payload.event,
        distinct_id: getAnalyticsId(),
        properties: {
          ...payload,
          source: "babel-web",
        },
      }),
      keepalive: true,
    }).catch(() => undefined);
  }

  if (isDev) {
    console.info("[analytics]", payload);
  }
};
