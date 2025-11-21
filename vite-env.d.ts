/// <reference types="vite/client" />

declare module "node:url" {
  export function fileURLToPath(url: URL | string): string;
  export { URL } from "url";
}

declare module "node:path" {
  export function resolve(...paths: string[]): string;
  export function dirname(path: string): string;
}

declare global {
  interface ImportMeta {
    readonly url: string;
  }
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE?: string;
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

