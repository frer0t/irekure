"use client";

import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface SubmitButtonProps {
  submitting: boolean;
}

export function SubmitButton({ submitting }: SubmitButtonProps) {
  return (
    <div className="mt-8">
      <Button
        type="submit"
        className="w-full py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground text-lg font-medium shadow-md"
        disabled={submitting}
      >
        {submitting ? (
          <div className="flex items-center justify-center gap-2">
            <span>Kohereza...</span>
          </div>
        ) : (
          <span className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            Kohereza Ikibazo
          </span>
        )}
      </Button>
    </div>
  );
}
