import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStatusBadge } from "@/constants/complaint-status";
import { getApi } from "@/lib/axios/axios";
import { format, parseISO } from "date-fns";
import { Clock, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { ResponsesList } from "../_components/ResponsesList";
import { StatusUpdateDialog } from "../_components/StatusUpdateDialog";

export default async function ComplaintDetailPage({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) {
  const { ticketId } = await params;

  let complaint: any;
  let answers: any[] = [];

  try {
    const response = await getApi<{
      success: boolean;
      data: { complaint: any; answers: any[] };
      message: string;
      error?: string;
    }>(`/complaint/${ticketId}`);

    if (!response.success || !response.data?.complaint) {
      console.error(
        "Error fetching complaint:",
        response.error || "No complaint found"
      );
      notFound();
    }

    complaint = response.data.complaint;
    answers = response.data.answers || [];
  } catch (error) {
    console.error("Failed to fetch complaint:", error);
    notFound();
  }

  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    const date = parseISO(dateString);
    return format(date, "PPpp");
  };

  const getFileName = (url: string): string => {
    try {
      const parts = url.split("/");

      let filename = parts[parts.length - 1];

      const dashIndex = filename.lastIndexOf("-");
      if (dashIndex > 0) {
        const possibleTimestamp = filename.substring(dashIndex + 1);

        if (!isNaN(Number(possibleTimestamp))) {
          filename = filename.substring(0, dashIndex);
        }
      }

      return decodeURIComponent(filename);
    } catch (error) {
      console.error("Error extracting filename from URL:", error);
      return url.split("/").pop() || "file";
    }
  };

  const getFileIcon = () => {
    return <ExternalLink className="h-4 w-4" />;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">
            {complaint.title}
          </h1>
          {getStatusBadge(complaint.status)}
        </div>

        <StatusUpdateDialog complaint={complaint}>
          <Button>Hindura Imimerere</Button>
        </StatusUpdateDialog>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Ibisobanuro</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{complaint.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Amakuru y'Ikibazo</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-medium">Nomero</p>
              <p className="text-sm text-muted-foreground">
                {complaint.ticket_id}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Icyiciro</p>
              <p className="text-sm text-muted-foreground">
                {complaint.category?.name}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Itariki</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {formatDate(complaint.created_at)}
              </div>
            </div>

            {complaint.files && complaint.files.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Amadosiye</p>
                <div className="space-y-2">
                  {complaint.files.map((fileUrl: string, index: number) => (
                    <a
                      key={index}
                      href={fileUrl}
                      target="_blank"
                      className="flex items-center gap-2 p-2 text-sm rounded-md bg-muted/50 hover:bg-muted transition-colors"
                    >
                      {getFileIcon()}
                      <span className="flex-1 truncate">
                        {getFileName(fileUrl)}
                      </span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Amakuru y'Uwatanze Ikibazo</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-medium">Amazina</p>
              <p className="text-sm text-muted-foreground">{complaint.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Telefone</p>
              <p className="text-sm text-muted-foreground">{complaint.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Imeyili</p>
              <p className="text-sm text-muted-foreground">
                {complaint.email || "-"}
              </p>
            </div>
          </CardContent>
        </Card>
        {answers && answers.length > 0 && <ResponsesList responses={answers} />}
      </div>
    </div>
  );
}
