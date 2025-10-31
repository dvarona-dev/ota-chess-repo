/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_TIMEOUT: string;
  readonly VITE_SITE_URL: string;
  readonly VITE_DESKTOP_MAX_ITEMS: string;
  readonly VITE_TABLET_MAX_ITEMS: string;
  readonly VITE_MOBILE_MAX_ITEMS: string;
  readonly VITE_DESKTOP_MIN_ITEMS: string;
  readonly VITE_TABLET_MIN_ITEMS: string;
  readonly VITE_MOBILE_MIN_ITEMS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
