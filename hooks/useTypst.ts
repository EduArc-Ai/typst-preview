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

// Extract error message from unknown error types (fallback handler)
function extractTypstError(err: unknown): string {
  if (err instanceof Error) {
    return err.message;
  }
  if (typeof err === 'string') {
    return err;
  }
  if (typeof err === 'object' && err !== null) {
    const errObj = err as Record<string, unknown>;
    if (typeof errObj.message === 'string') {
      return errObj.message;
    }
    try {
      return JSON.stringify(err, null, 2);
    } catch {
      return String(err);
    }
  }
  return 'Compilation failed';
}

// Format unix-style diagnostics for display
// Input: "/main.typ:15:8-15:20: error: cannot divide ratio by length"
// Output: "Line 15, Col 8: cannot divide ratio by length"
function formatDiagnostics(diagnostics: string[]): string {
  return diagnostics
    .map((diag) => {
      // Parse unix format: "path:line:col-endLine:endCol: severity: message"
      // or simpler: "path:line:col: severity: message"
      const match = diag.match(/^([^:]+):(\d+):(\d+)(?:-\d+:\d+)?:\s*(\w+):\s*(.+)$/);
      if (match) {
        const [, , line, col, severity, message] = match;
        const severityLabel = severity === 'error' ? 'Error' : severity === 'warning' ? 'Warning' : severity;
        return `${severityLabel} at line ${line}, col ${col}: ${message}`;
      }
      // If format doesn't match, return as-is
      return diag;
    })
    .join('\n');
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
        // Get the compiler with diagnostics support
        const compiler = await $typst.getCompiler();

        // Add/update the main source in the virtual filesystem
        await $typst.addSource('/main.typ', source);

        // Compile with 'unix' diagnostics format for line:col information
        const result = await compiler.compile({
          mainFilePath: '/main.typ',
          diagnostics: 'unix',
        });

        if (result.hasError && result.diagnostics?.length) {
          // Format and display diagnostics
          const errorMessage = formatDiagnostics(result.diagnostics);
          setError(errorMessage);
          setSvgOutput(null);
        } else if (result.result) {
          // Render the compiled vector data to SVG
          const svg = await $typst.svg({ vectorData: result.result });
          setSvgOutput(svg);
          setError(null);
        } else {
          // No result and no error - shouldn't happen but handle gracefully
          setError('Compilation produced no output');
          setSvgOutput(null);
        }
      } catch (err) {
        // Fallback error handling for unexpected errors
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
