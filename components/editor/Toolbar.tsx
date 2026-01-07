'use client';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Download, FileText, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToolbarProps {
  onExportPdf: () => void;
  isExporting: boolean;
  isReady: boolean;
  className?: string;
}

export function Toolbar({
  onExportPdf,
  isExporting,
  isReady,
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
          <span className="font-semibold text-lg">Typst Viewer</span>
        </div>

        <div className="flex items-center gap-2">
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
