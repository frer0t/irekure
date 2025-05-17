"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getApi } from "@/lib/axios/axios";
import { trackingSchema } from "@/lib/zod/form";
import { AnswerResponse } from "@/types/api";
import { Loader2, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ZodError } from "zod";

export function TrackingForm() {
  const [ticketId, setTicketId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError("");

    try {
      try {
        trackingSchema.parse({ ticketId });
      } catch (zodError) {
        if (zodError instanceof ZodError) {
          setError(zodError.errors[0].message);
          setIsLoading(false);
          return;
        }
      }

      const { success, message } = await getApi<AnswerResponse>(
        `/track/${encodeURIComponent(ticketId)}`
      );

      if (!success) {
        setError(message);
        setIsLoading(false);
        return;
      }
      router.push(`/track/${encodeURIComponent(ticketId)}`);
    } catch (err) {
      setError("Hari ikibazo cyavutse. Ongera ugerageze");
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative w-full">
          <Input
            placeholder="Andika nomero y'ihariye ikibazo (urugero: I-19-59d344)"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            className="w-full h-14 py-4 pl-5 pr-36 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg"
            disabled={isLoading}
            title="Andika nomero y'ibiranga ikibazo (urugero: I-19-59d344)"
          />

          {isLoading ? (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
            </div>
          ) : (
            <Button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 px-6 bg-blue-500 hover:bg-blue-600 text-white text-base font-medium rounded-md"
              disabled={isLoading}
            >
              Shakisha
              <Search className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        {error && <p className="text-destructive text-sm mt-2 ml-1">{error}</p>}
      </form>
    </div>
  );
}
