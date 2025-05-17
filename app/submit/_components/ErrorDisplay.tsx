"use client";

interface ErrorDisplayProps {
  error: string | null;
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  if (!error) return null;

  return (
    <div className="p-4 mb-4 text-sm rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
      <div className="flex items-start">
        <span>{error}</span>
      </div>
    </div>
  );
}
