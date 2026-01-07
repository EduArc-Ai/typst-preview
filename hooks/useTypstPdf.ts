'use client';

import { useState, useCallback } from 'react';
import { $typst } from '@/lib/typst-config';

interface UseTypstPdfResult {
  isExporting: boolean;
  exportError: string | null;
  exportPdf: (source: string, filename?: string) => Promise<void>;
}

export function useTypstPdf(): UseTypstPdfResult {
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const exportPdf = useCallback(
    async (source: string, filename = 'document.pdf') => {
      if (!$typst) {
        setExportError('Typst compiler not ready');
        return;
      }

      if (!source.trim()) {
        setExportError('No content to export');
        return;
      }

      setIsExporting(true);
      setExportError(null);

      try {
        const pdfData = await $typst.pdf({ mainContent: source });

        if (!pdfData) {
          setExportError('PDF generation returned no data');
          return;
        }

        // Create blob and trigger download
        // Copy the data to a new ArrayBuffer for Blob compatibility
        const arrayBuffer = new ArrayBuffer(pdfData.byteLength);
        new Uint8Array(arrayBuffer).set(pdfData);
        const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();

        // Cleanup
        URL.revokeObjectURL(url);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'PDF export failed';
        setExportError(errorMessage);
      } finally {
        setIsExporting(false);
      }
    },
    []
  );

  return { isExporting, exportError, exportPdf };
}
