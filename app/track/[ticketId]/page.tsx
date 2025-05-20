import { createClientServer } from "@/lib/supabase/server";
import { Tables } from "@/types/supabase";
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

  const supabase = await createClientServer();

  const { data: answers } = await supabase
    .from("answers")
    .select(
      "answer,created_at,complaint:complaints(name,title,description,created_at,files,status,phone,email,ticket_id),organization:organizations(name,site)"
    )
    .eq("complaint", ticketId);

  let responseData: {
    complaint: Tables<"complaints">;
    answers?: any[];
  };

  if (!answers || answers.length === 0) {
    // No answers, get just the complaint
    const { data: complaint, error: complaintError } = await supabase
      .from("complaints")
      .select("*,category:categories(name)")
      .eq("ticket_id", ticketId)
      .single();

    if (complaintError || !complaint) {
      throw new Error("Complaint not found");
    }

    responseData = {
      complaint: complaint as Tables<"complaints">,
    };
  } else {
    responseData = {
      complaint: answers[0].complaint as Tables<"complaints">,
      answers: answers,
    };
  }

  return (
    <>
      <TrackingHeader data={responseData} />
      <TrackingContent data={responseData} />
    </>
  );
};
export default ResultsPage;
