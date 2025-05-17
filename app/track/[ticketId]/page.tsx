import { getApi } from "@/lib/axios/axios";
import { TicketResponse } from "@/types/api";
import { redirect } from "next/navigation";
import TrackingContent from "../_components/TrackingContent";
import TrackingHeader from "../_components/TrackingHeader";

const ResultsPage = async ({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) => {
  const { ticketId } = await params;

  if (!ticketId) {
    redirect("/track");
  }
  const { success, message, data } = await getApi<TicketResponse>(
    `/track/${encodeURIComponent(ticketId)}`
  );
  if (!success) {
    throw new Error(message || "Hari ikibazo cyavutse. Ongera ugerageze");
  }

  return (
    <>
      <TrackingHeader data={data} />
      <TrackingContent data={data} />
    </>
  );
};
export default ResultsPage;
