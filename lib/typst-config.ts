import { PRELOAD_FONTS } from './fonts';
import { $typst, TypstSnippet } from '@myriaddreamin/typst.ts/dist/esm/contrib/snippet.mjs';

// CDN URLs for WASM modules (still loaded from CDN for bundle size)
export const TYPST_CDN_CONFIG = {
  compilerWasmUrl:
    'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm',
  rendererWasmUrl:
    'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm',
} as const;

// Re-export $typst for use in other modules
export { $typst, TypstSnippet };

// Initialize typst.ts with WASM module paths, fonts, and package registry
export async function initializeTypst(): Promise<void> {
  // Set WASM module paths
  $typst.setCompilerInitOptions({
    getModule: () => TYPST_CDN_CONFIG.compilerWasmUrl,
  });

  $typst.setRendererInitOptions({
    getModule: () => TYPST_CDN_CONFIG.rendererWasmUrl,
  });

  // Preload fonts and register package registry
  try {
    // Preload common fonts from CDN
    $typst.use(TypstSnippet.preloadFonts([...PRELOAD_FONTS]));

    // Register package registry for @preview packages
    const packageRegistry = await TypstSnippet.fetchPackageRegistry();
    $typst.use(packageRegistry);
    console.log('Typst initialized with package registry');
  } catch (err) {
    console.warn('Failed to initialize Typst:', err);
  }
}
