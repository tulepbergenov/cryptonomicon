/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_META_CANONICAL: string;
  readonly VITE_CRYPTOCOMPARE_API_DOMAIN: string;
  readonly VITE_CRYPTOCOMPARE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
