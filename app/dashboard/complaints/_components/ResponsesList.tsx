"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tables } from "@/types/supabase";
import { format, parseISO } from "date-fns";
import { Building2, User } from "lucide-react";

interface ResponsesListProps {
  responses: Array<
    Tables<"answers"> & {
      organization: Tables<"organizations"> | null;
    }
  >;
}

export function ResponsesList({ responses }: ResponsesListProps) {
  if (!responses || responses.length === 0) {
    return null;
  }

  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    const date = parseISO(dateString);
    return format(date, "PPpp");
  };

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Ibisubizo ({responses.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {responses.map((response) => (
          <div key={response.id} className="border rounded-md p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="text-primary h-5 w-5" />
                <span className="font-medium">
                  {response.organization?.name || "Organization"}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {formatDate(response.created_at)}
              </div>
            </div>
            <div className="pt-2 border-t">
              <p className="whitespace-pre-wrap">{response.answer}</p>
            </div>
            <div className="pt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <User className="h-3.5 w-3.5" />
              <span>{response.answered_by}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
