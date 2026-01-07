'use client';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Download, FileText, Loader2, PanelLeftClose, PanelLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToolbarProps {
  onExportPdf: () => void;
  isExporting: boolean;
  isReady: boolean;
  isEditorVisible: boolean;
  onToggleEditor: () => void;
  className?: string;
}

export function Toolbar({
  onExportPdf,
  isExporting,
  isReady,
  isEditorVisible,
  onToggleEditor,
  className,
}: ToolbarProps) {
  return (
    <TooltipProvider>
      <div
        className={cn(
          'flex items-center justify-between px-4 py-2 border-b bg-background',
          className
        )}
      >
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <span className="font-semibold text-lg">Typst Editor</span>
        </div>

        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={onToggleEditor}
                size="sm"
                variant="ghost"
              >
                {isEditorVisible ? (
                  <PanelLeftClose className="h-4 w-4" />
                ) : (
                  <PanelLeft className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isEditorVisible ? 'Hide editor' : 'Show editor'}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={onExportPdf}
                disabled={!isReady || isExporting}
                size="sm"
                variant="outline"
              >
                {isExporting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                <span>Export PDF</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download document as PDF</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
