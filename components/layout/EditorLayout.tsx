'use client';

import { useState, useCallback, useEffect } from 'react';
import { PreviewPanel } from '@/components/editor/PreviewPanel';
import { Toolbar } from '@/components/editor/Toolbar';
import { useTypst } from '@/hooks/useTypst';
import { useTypstPdf } from '@/hooks/useTypstPdf';
import { fetchTemplateContent, FALLBACK_CONTENT } from '@/lib/template-loader';

export function EditorLayout() {
  const [source, setSource] = useState(FALLBACK_CONTENT);
  const [isTemplateLoaded, setIsTemplateLoaded] = useState(false);

  const { isReady, isCompiling, error, svgOutput, compile } = useTypst();
  const { isExporting, exportPdf } = useTypstPdf();

  // Load template from public folder on mount
  useEffect(() => {
    fetchTemplateContent().then((content) => {
      setSource(content);
      setIsTemplateLoaded(true);
    });
  }, []);

  // Compile when template is loaded
  useEffect(() => {
    if (isReady && source && isTemplateLoaded) {
      compile(source);
    }
  }, [isReady, source, compile, isTemplateLoaded]);

  const handleExportPdf = useCallback(() => {
    if (source) {
      exportPdf(source, 'document.pdf');
    }
  }, [source, exportPdf]);

  return (
    <div className="flex flex-col h-screen">
      <Toolbar
        onExportPdf={handleExportPdf}
        isExporting={isExporting}
        isReady={isReady}
      />

      <div className="flex-1 min-h-0">
        <PreviewPanel
          svgContent={svgOutput}
          isCompiling={isCompiling}
          error={error}
          isReady={isReady}
          className="h-full"
        />
      </div>
    </div>
  );
}
