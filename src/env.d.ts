/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_META_CANONICAL: string;
  readonly VITE_COINLIST_API_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
