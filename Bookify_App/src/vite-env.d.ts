interface ImportMetaEnv {
    readonly VITE_EXCHANGE_API_KEY: string;
    readonly VITE_GOOGLE_MAPS_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}