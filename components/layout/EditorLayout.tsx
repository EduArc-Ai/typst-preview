'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import { EditorPanel } from '@/components/editor/EditorPanel';
import { PreviewPanel } from '@/components/editor/PreviewPanel';
import { Toolbar } from '@/components/editor/Toolbar';
import { useTypst } from '@/hooks/useTypst';
import { useTypstPdf } from '@/hooks/useTypstPdf';
import { useDebounce } from '@/hooks/useDebounce';
import { fetchTemplateContent, FALLBACK_CONTENT } from '@/lib/template-loader';

const DEBOUNCE_DELAY = 400; // milliseconds

export function EditorLayout() {
  const [source, setSource] = useState(FALLBACK_CONTENT);
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [isTemplateLoaded, setIsTemplateLoaded] = useState(false);
  const debouncedSource = useDebounce(source, DEBOUNCE_DELAY);

  const { isReady, isCompiling, error, svgOutput, compile } = useTypst();
  const { isExporting, exportPdf } = useTypstPdf();

  // Load template from public folder on mount
  useEffect(() => {
    fetchTemplateContent().then((content) => {
      setSource(content);
      setIsTemplateLoaded(true);
    });
  }, []);

  // Compile when source changes (debounced)
  useEffect(() => {
    if (isReady && debouncedSource && isTemplateLoaded) {
      compile(debouncedSource);
    }
  }, [isReady, debouncedSource, compile, isTemplateLoaded]);

  const handleExportPdf = useCallback(() => {
    if (source) {
      exportPdf(source, 'document.pdf');
    }
  }, [source, exportPdf]);

  const handleToggleEditor = useCallback(() => {
    setIsEditorVisible((prev) => !prev);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Toolbar
        onExportPdf={handleExportPdf}
        isExporting={isExporting}
        isReady={isReady}
        isEditorVisible={isEditorVisible}
        onToggleEditor={handleToggleEditor}
      />

      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {isEditorVisible && (
          <>
            <ResizablePanel defaultSize={50} minSize={25}>
              <EditorPanel
                value={source}
                onChange={setSource}
                disabled={!isReady}
              />
            </ResizablePanel>

            <ResizableHandle withHandle />
          </>
        )}

        <ResizablePanel defaultSize={isEditorVisible ? 50 : 100} minSize={25}>
          <PreviewPanel
            svgContent={svgOutput}
            isCompiling={isCompiling}
            error={error}
            isReady={isReady}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
