/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_META_CANONICAL: string;
  readonly VITE_CRYPTOCOMPARE_API_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
