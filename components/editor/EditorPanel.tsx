'use client';

import { useCallback, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface EditorPanelProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export const EditorPanel = forwardRef<HTMLTextAreaElement, EditorPanelProps>(
  ({ value, onChange, disabled, className }, ref) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
      },
      [onChange]
    );

    return (
      <div className={cn('flex flex-col h-full bg-background', className)}>
        <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/30">
          <span className="text-sm font-medium text-muted-foreground">
            Typst Source
          </span>
          <span className="text-xs text-muted-foreground tabular-nums">
            {value.length} characters
          </span>
        </div>
        <textarea
          ref={ref}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={cn(
            'flex-1 w-full p-4 font-mono text-sm resize-none',
            'bg-background text-foreground',
            'focus:outline-none focus:ring-0',
            'placeholder:text-muted-foreground',
            'leading-relaxed',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          placeholder="Enter your Typst code here..."
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      </div>
    );
  }
);

EditorPanel.displayName = 'EditorPanel';
