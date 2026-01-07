'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { initializeTypst, $typst } from '@/lib/typst-config';
import { fetchTemplateFiles } from '@/lib/template-loader';

interface UseTypstResult {
  isReady: boolean;
  isCompiling: boolean;
  error: string | null;
  svgOutput: string | null;
  compile: (source: string) => Promise<void>;
}

// Extract detailed error information from typst.ts errors
function extractTypstError(err: unknown): string {
  // Handle Error objects
  if (err instanceof Error) {
    const message = err.message;

    // Check for diagnostic array in the error
    const errWithDiag = err as Error & { diagnostics?: unknown[] };
    if (errWithDiag.diagnostics && Array.isArray(errWithDiag.diagnostics)) {
      const diagnostics = errWithDiag.diagnostics
        .map((d: unknown) => {
          if (typeof d === 'object' && d !== null) {
            const diag = d as { message?: string; severity?: string };
            return diag.message || String(d);
          }
          return String(d);
        })
        .join('\n');
      return diagnostics || message;
    }

    return message;
  }

  // Handle string errors
  if (typeof err === 'string') {
    return err;
  }

  // Handle object errors
  if (typeof err === 'object' && err !== null) {
    const errObj = err as Record<string, unknown>;

    if (typeof errObj.message === 'string') {
      return errObj.message;
    }

    if (Array.isArray(errObj.diagnostics)) {
      return errObj.diagnostics
        .map((d: unknown) => {
          if (typeof d === 'object' && d !== null) {
            const diag = d as { message?: string };
            return diag.message || JSON.stringify(d);
          }
          return String(d);
        })
        .join('\n');
    }

    try {
      return JSON.stringify(err, null, 2);
    } catch {
      return String(err);
    }
  }

  return 'Compilation failed';
}

export function useTypst(): UseTypstResult {
  const [isReady, setIsReady] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [svgOutput, setSvgOutput] = useState<string | null>(null);
  const initializingRef = useRef(false);

  // Initialize typst.ts on mount
  useEffect(() => {
    if (initializingRef.current) return;
    initializingRef.current = true;

    (async () => {
      try {
        await initializeTypst();

        // Load and register template files and assets
        const { files, assets } = await fetchTemplateFiles();

        // Register .typ files for #import support
        for (const [path, content] of files) {
          await $typst.addSource(path, content);
        }

        // Register binary assets (images) for #image support
        for (const [path, data] of assets) {
          await $typst.mapShadow(path, data);
        }

        if (files.size > 0 || assets.size > 0) {
          console.log(
            `Registered ${files.size} template file(s) and ${assets.size} asset(s)`
          );
        }

        setIsReady(true);
      } catch (err) {
        setError(`Failed to initialize Typst: ${extractTypstError(err)}`);
      }
    })();
  }, []);

  const compile = useCallback(
    async (source: string) => {
      if (!isReady) {
        setError('Typst compiler not ready');
        return;
      }

      if (!source.trim()) {
        setSvgOutput(null);
        setError(null);
        return;
      }

      setIsCompiling(true);
      setError(null);

      try {
        const svg = await $typst.svg({ mainContent: source });
        setSvgOutput(svg);
        setError(null);
      } catch (err) {
        const errorMessage = extractTypstError(err);
        setError(errorMessage);
        setSvgOutput(null);
      } finally {
        setIsCompiling(false);
      }
    },
    [isReady]
  );

  return { isReady, isCompiling, error, svgOutput, compile };
}
