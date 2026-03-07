import PocketBase from "pocketbase";

const rawPocketBaseUrl = import.meta.env.VITE_POCKETBASE_URL?.trim() ?? "";
const rawHostedPocketBaseUrl = import.meta.env.VITE_POCKETBASE_PUBLIC_URL?.trim() ?? "";

const isLocalHostName = (value: string) => value === "127.0.0.1" || value === "localhost";
const isPrivateLanHost = (value: string) =>
  /^10\./.test(value) ||
  /^192\.168\./.test(value) ||
  /^172\.(1[6-9]|2\d|3[0-1])\./.test(value) ||
  value.endsWith(".local");
const isLocalhostUrl = (value: string) => /^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?/i.test(value);

const resolvePocketBaseUrl = (value: string) => {
  if (!value) return "";
  if (typeof window === "undefined") return value;

  try {
    const parsed = new URL(value);
    const currentHost = window.location.hostname;
    // Replace localhost only during LAN development (e.g. phone testing), not on hosted domains.
    if (isLocalHostName(parsed.hostname) && currentHost && isPrivateLanHost(currentHost)) {
      parsed.hostname = currentHost;
      return parsed.toString();
    }
    return parsed.toString();
  } catch {
    return value;
  }
};

const runtimeHost = typeof window === "undefined" ? "" : window.location.hostname;
const isHostedRuntime =
  Boolean(runtimeHost) && !isLocalHostName(runtimeHost) && !isPrivateLanHost(runtimeHost);
const shouldUseHostedFallbackUrl =
  isHostedRuntime &&
  isLocalhostUrl(rawPocketBaseUrl) &&
  Boolean(rawHostedPocketBaseUrl) &&
  !isLocalhostUrl(rawHostedPocketBaseUrl);
const selectedPocketBaseUrl = shouldUseHostedFallbackUrl ? rawHostedPocketBaseUrl : rawPocketBaseUrl;
const pocketBaseUrl = resolvePocketBaseUrl(selectedPocketBaseUrl);

export const isPocketBaseConfigured = Boolean(pocketBaseUrl);
export const isPocketBaseLocalhostConfigured = /^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?/i.test(rawPocketBaseUrl);
export const isPocketBaseLocalhostInHostedRuntime =
  isLocalhostUrl(selectedPocketBaseUrl) && isHostedRuntime;
export const resolvedPocketBaseUrl = pocketBaseUrl;
export const isUsingPocketBaseHostedFallback = shouldUseHostedFallbackUrl;

export const pocketbase = isPocketBaseConfigured ? new PocketBase(pocketBaseUrl) : null;

if (pocketbase) {
  pocketbase.autoCancellation(false);
}

export const getPocketBaseClient = () => {
  if (!pocketbase) {
    throw new Error("PocketBase is not configured. Set VITE_POCKETBASE_URL.");
  }

  return pocketbase;
};
