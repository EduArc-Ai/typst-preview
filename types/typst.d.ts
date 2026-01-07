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
  }

  interface Typst {
    svg(options: TypstCompileOptions): Promise<string>;
    pdf(options: TypstCompileOptions): Promise<Uint8Array>;
    setCompilerInitOptions(options: TypstInitOptions): void;
    setRendererInitOptions(options: TypstInitOptions): void;
    use(provider: TypstSnippetProvider): void;
    TypstSnippet: TypstSnippetStatic;
  }

  const $typst: Typst;
}

export {};
