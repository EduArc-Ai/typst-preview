import { PRELOAD_FONTS } from './fonts';

// CDN URLs for typst.ts (following official documentation recommendations)
export const TYPST_CDN_CONFIG = {
  bundleUrl:
    'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst.ts/dist/esm/contrib/all-in-one-lite.bundle.js',
  compilerWasmUrl:
    'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm',
  rendererWasmUrl:
    'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm',
} as const;

// Initialize typst.ts with WASM module paths, preload fonts, and register package registry
export async function initializeTypst(): Promise<void> {
  if (typeof $typst === 'undefined') {
    console.warn('$typst not loaded yet');
    return;
  }

  $typst.setCompilerInitOptions({
    getModule: () => TYPST_CDN_CONFIG.compilerWasmUrl,
  });

  $typst.setRendererInitOptions({
    getModule: () => TYPST_CDN_CONFIG.rendererWasmUrl,
  });

  // Preload fonts and register package registry
  if ($typst.TypstSnippet && $typst.use) {
    try {
      // Preload common fonts from CDN
      $typst.use($typst.TypstSnippet.preloadFonts([...PRELOAD_FONTS]));

      // Register package registry for @preview packages
      const packageRegistry = await $typst.TypstSnippet.fetchPackageRegistry();
      $typst.use(packageRegistry);
    } catch (err) {
      console.warn('Failed to initialize Typst:', err);
    }
  }
}
