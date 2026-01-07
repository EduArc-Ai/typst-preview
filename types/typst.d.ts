// TypeScript declarations for $typst global from all-in-one-lite.bundle.js

declare global {
  interface TypstCompileOptions {
    mainContent: string;
  }

  interface TypstInitOptions {
    getModule: () => string;
  }

  interface TypstSnippetProvider {
    key: string;
    forRoles: string[];
    provides: unknown[];
  }

  interface TypstSnippetStatic {
    preloadFontFromUrl(fontUrl: string): TypstSnippetProvider;
    preloadFonts(fonts: (string | Uint8Array)[]): TypstSnippetProvider;
    withAccessModel(model: string): TypstSnippetProvider;
    fetchPackageRegistry(): Promise<TypstSnippetProvider>;
  }

  interface Typst {
    svg(options: TypstCompileOptions): Promise<string>;
    pdf(options: TypstCompileOptions): Promise<Uint8Array>;
    setCompilerInitOptions(options: TypstInitOptions): void;
    setRendererInitOptions(options: TypstInitOptions): void;
    use(provider: TypstSnippetProvider): void;
    TypstSnippet: TypstSnippetStatic;
    // Virtual filesystem methods for local imports
    addSource(path: string, content: string): Promise<void>;
    mapShadow(path: string, content: Uint8Array): Promise<void>;
    unmapShadow(path: string): Promise<void>;
    resetShadow(): Promise<void>;
  }

  const $typst: Typst;
}

export {};
