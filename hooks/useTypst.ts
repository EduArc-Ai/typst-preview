'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { initializeTypst, TYPST_CDN_CONFIG } from '@/lib/typst-config';

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
    // typst.ts may include diagnostics in the message
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

  // Handle object errors (typst.ts may return plain objects)
  if (typeof err === 'object' && err !== null) {
    const errObj = err as Record<string, unknown>;

    // Check for message property
    if (typeof errObj.message === 'string') {
      return errObj.message;
    }

    // Check for diagnostics array
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

    // Try to stringify the object
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
  const scriptLoadedRef = useRef(false);
  const initializingRef = useRef(false);

  // Load typst.ts bundle from CDN
  useEffect(() => {
    if (scriptLoadedRef.current || initializingRef.current) return;
    initializingRef.current = true;

    // Check if script already exists
    const existingScript = document.getElementById('typst-bundle');
    if (existingScript) {
      // Script exists, check if $typst is available
      if (typeof $typst !== 'undefined') {
        (async () => {
          await initializeTypst();
          setIsReady(true);
          scriptLoadedRef.current = true;
        })();
      }
      return;
    }

    const script = document.createElement('script');
    script.src = TYPST_CDN_CONFIG.bundleUrl;
    script.type = 'module';
    script.id = 'typst-bundle';

    script.onload = () => {
      // Wait a bit for the module to initialize
      const checkTypst = setInterval(() => {
        if (typeof $typst !== 'undefined') {
          clearInterval(checkTypst);
          (async () => {
            await initializeTypst();
            setIsReady(true);
            scriptLoadedRef.current = true;
          })();
        }
      }, 100);

      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkTypst);
        if (!scriptLoadedRef.current) {
          setError('Timeout waiting for Typst compiler to initialize');
        }
      }, 10000);
    };

    script.onerror = () => {
      setError('Failed to load Typst compiler from CDN');
      initializingRef.current = false;
    };

    document.head.appendChild(script);
  }, []);

  const compile = useCallback(
    async (source: string) => {
      if (!isReady || typeof $typst === 'undefined') {
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
        // Extract detailed error information from typst.ts
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
