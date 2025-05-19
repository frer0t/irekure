"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { putApi } from "@/lib/axios/axios";
import { Tables } from "@/types/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface StatusUpdateDialogProps {
  complaint: Tables<"complaints">;
  children: React.ReactNode;
}

export function StatusUpdateDialog({
  complaint,
  children,
}: StatusUpdateDialogProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Tables<"complaints">["status"]>(
    complaint.status
  );
  const [response, setResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const data = await putApi<{
        success: boolean;
        message: string;
        error?: string;
        data?: any;
      }>(`/complaint/${complaint.ticket_id}`, {
        status,
        response: response.trim() ? response : null,
      });

      if (!data.success) {
        setError(data.error || "Failed to update complaint");
      } else {
        setOpen(false);
        router.refresh();
      }
    } catch (err: unknown) {
      const error = err as any;
      setError(
        error.response
          ? error?.response?.data?.error
          : "An error occurred while updating the complaint"
      );
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Hindura Imimerere y'Ikibazo</DialogTitle>
          <DialogDescription>
            Hindura imimerere y'ikibazo na/cyangwa wongeremo igisubizo.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="status"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Imimerere
            </label>
            <Select
              value={status}
              onValueChange={(value) =>
                setStatus(value as Tables<"complaints">["status"])
              }
            >
              <SelectTrigger id="status" className="w-full">
                <SelectValue placeholder="Hitamo imimerere" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="submitted">Byatanzwe</SelectItem>
                <SelectItem value="reviewing">Birebwa</SelectItem>
                <SelectItem value="solved">Byakemutse</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="response"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Igisubizo (Si ngombwa)
            </label>
            <Textarea
              id="response"
              placeholder="Andika igisubizo cyawe hano..."
              className="min-h-[100px]"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-sm font-medium text-destructive">{error}</p>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isSubmitting}
          >
            Reka
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Gutegereza..." : "Emeza"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
