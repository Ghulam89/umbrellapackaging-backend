const envBase =
  typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_BASE_URL
    ? import.meta.env.VITE_BASE_URL
    : null;

const windowOrigin =
  typeof window !== 'undefined' && window.location && window.location.origin
    ? window.location.origin
    : null;

export const BaseUrl = windowOrigin || envBase || "https://umbrellapackaging.com";
