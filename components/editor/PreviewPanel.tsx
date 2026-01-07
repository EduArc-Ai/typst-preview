'use client';

import { useRef, useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, AlertCircle, Copy, Check } from 'lucide-react';

interface PreviewPanelProps {
  svgContent: string | null;
  isCompiling: boolean;
  error: string | null;
  isReady: boolean;
  className?: string;
}

const ZOOM_LEVELS = [50, 75, 100, 125, 150, 200];
const DEFAULT_ZOOM = 150;
const PAGE_GAP = 20; // Gap between pages in points

// Process SVG to add page backgrounds and gaps
function processSvgForPaging(svgContent: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgContent, 'image/svg+xml');
  const svg = doc.querySelector('svg');

  if (!svg) return svgContent;

  const pages = svg.querySelectorAll('.typst-page');
  if (pages.length <= 1) {
    // Single page - just add background
    const firstPage = pages[0];
    if (firstPage) {
      const width = parseFloat(firstPage.getAttribute('data-page-width') || '0');
      const height = parseFloat(firstPage.getAttribute('data-page-height') || '0');

      if (width && height) {
        // Create background rect
        const bgRect = doc.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bgRect.setAttribute('x', '0');
        bgRect.setAttribute('y', '0');
        bgRect.setAttribute('width', String(width));
        bgRect.setAttribute('height', String(height));
        bgRect.setAttribute('fill', 'white');
        bgRect.setAttribute('class', 'page-background');

        // Create shadow filter
        const defs = doc.createElementNS('http://www.w3.org/2000/svg', 'defs');
        defs.innerHTML = `
          <filter id="page-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.15"/>
          </filter>
        `;
        svg.insertBefore(defs, svg.firstChild);

        // Create a group for the page with background
        const pageGroup = doc.createElementNS('http://www.w3.org/2000/svg', 'g');
        pageGroup.setAttribute('filter', 'url(#page-shadow)');
        pageGroup.appendChild(bgRect);

        // Move page content into group
        const transform = firstPage.getAttribute('transform') || '';
        pageGroup.setAttribute('transform', transform);
        firstPage.removeAttribute('transform');

        // Insert background before page content
        firstPage.insertBefore(bgRect.cloneNode(), firstPage.firstChild);
      }
    }
    return new XMLSerializer().serializeToString(svg);
  }

  // Multiple pages - add backgrounds and adjust spacing
  let accumulatedOffset = 0;

  // Create shadow filter
  const defs = doc.createElementNS('http://www.w3.org/2000/svg', 'defs');
  defs.innerHTML = `
    <filter id="page-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.15"/>
    </filter>
  `;
  svg.insertBefore(defs, svg.firstChild);

  pages.forEach((page, index) => {
    const width = parseFloat(page.getAttribute('data-page-width') || '0');
    const height = parseFloat(page.getAttribute('data-page-height') || '0');

    if (!width || !height) return;

    // Create background rect for this page
    const bgRect = doc.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bgRect.setAttribute('x', '0');
    bgRect.setAttribute('y', '0');
    bgRect.setAttribute('width', String(width));
    bgRect.setAttribute('height', String(height));
    bgRect.setAttribute('fill', 'white');
    bgRect.setAttribute('class', 'page-background');

    // Insert background as first child of page
    page.insertBefore(bgRect, page.firstChild);

    // Add shadow filter to page
    page.setAttribute('filter', 'url(#page-shadow)');

    // Adjust transform to add gaps
    const newY = accumulatedOffset;
    page.setAttribute('transform', `translate(0, ${newY})`);

    accumulatedOffset += height + PAGE_GAP;
  });

  // Update SVG viewBox and height to account for gaps
  const totalHeight = accumulatedOffset - PAGE_GAP; // Remove last gap
  const viewBox = svg.getAttribute('viewBox');
  if (viewBox) {
    const [x, y, w] = viewBox.split(' ');
    svg.setAttribute('viewBox', `${x} ${y} ${w} ${totalHeight}`);
  }
  svg.setAttribute('height', String(totalHeight));

  return new XMLSerializer().serializeToString(svg);
}

export function PreviewPanel({
  svgContent,
  isCompiling,
  error,
  isReady,
  className,
}: PreviewPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [copied, setCopied] = useState(false);

  const handleCopyError = async () => {
    if (error) {
      await navigator.clipboard.writeText(error);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Process SVG to add page backgrounds and gaps
  const processedSvg = useMemo(() => {
    if (!svgContent) return null;
    try {
      return processSvgForPaging(svgContent);
    } catch {
      return svgContent;
    }
  }, [svgContent]);

  const handleZoomIn = () => {
    const currentIndex = ZOOM_LEVELS.indexOf(zoom);
    if (currentIndex < ZOOM_LEVELS.length - 1) {
      setZoom(ZOOM_LEVELS[currentIndex + 1]);
    }
  };

  const handleZoomOut = () => {
    const currentIndex = ZOOM_LEVELS.indexOf(zoom);
    if (currentIndex > 0) {
      setZoom(ZOOM_LEVELS[currentIndex - 1]);
    }
  };

  const handleZoomReset = () => {
    setZoom(DEFAULT_ZOOM);
  };

  return (
    <div className={cn('flex flex-col h-full bg-background', className)}>
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/30">
        <span className="text-sm font-medium text-muted-foreground">
          Preview
        </span>
        <div className="flex items-center gap-1">
          {isCompiling && (
            <span className="text-xs text-muted-foreground animate-pulse mr-2">
              Compiling...
            </span>
          )}
          {!isReady && !isCompiling && (
            <span className="text-xs text-muted-foreground animate-pulse mr-2">
              Loading compiler...
            </span>
          )}
          {isReady && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomOut}
                disabled={zoom === ZOOM_LEVELS[0]}
                className="h-7 w-7 p-0"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomReset}
                className="h-7 px-2 text-xs tabular-nums"
              >
                {zoom}%
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomIn}
                disabled={zoom === ZOOM_LEVELS[ZOOM_LEVELS.length - 1]}
                className="h-7 w-7 p-0"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 bg-neutral-200 dark:bg-neutral-800">
        {!isReady ? (
          <div className="space-y-4 p-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
            <div className="pt-4">
              <Skeleton className="h-5 w-1/2" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        ) : error ? (
          <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/50 border-2 border-red-200 dark:border-red-900 shadow-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <p className="text-sm font-semibold text-red-700 dark:text-red-300">
                    Compilation Error
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyError}
                    className="h-7 px-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    <span className="ml-1 text-xs">{copied ? 'Copied' : 'Copy'}</span>
                  </Button>
                </div>
                <pre className="text-sm text-red-800 dark:text-red-200 font-mono whitespace-pre-wrap break-words leading-relaxed">
                  {error}
                </pre>
              </div>
            </div>
          </div>
        ) : processedSvg ? (
          <div className="flex justify-center">
            <div
              ref={containerRef}
              className="typst-preview"
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top center',
              }}
              dangerouslySetInnerHTML={{ __html: processedSvg }}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p className="text-sm">Start typing to see the preview</p>
          </div>
        )}
      </div>
    </div>
  );
}
