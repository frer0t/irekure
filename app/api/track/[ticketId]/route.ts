import { createClientServer } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ ticketId: string }> }
) {
  const { ticketId } = await params;

  if (!ticketId) {
    return NextResponse.json(
      { success: false, message: "Code Yihariye irekenewe" },
      { status: 401 }
    );
  }
  const supabase = await createClientServer();
  const { data: answers } = await supabase
    .from("answers")
    .select(
      "answer,created_at,complaint:complaints(name,title,description,created_at,files,status,phone,email,ticket_id),organization:organizations(name,site)"
    )
    .eq("complaint", ticketId);

  if (answers && answers?.length <= 0) {
    const { data: complaint, error: complaintError } = await supabase
      .from("complaints")
      .select("*,category:categories(name)")
      .eq("ticket_id", ticketId)
      .single();
    if (complaintError) {
      return NextResponse.json(
        {
          success: false,
          message: "Error getting Complaint",
          error: complaintError.message,
        },
        { status: 500 }
      );
    }
    if (!complaint) {
      return NextResponse.json(
        { success: false, message: "Complaint not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      data: { complaint, type: "complaint" },
      message: "Complaint found",
      type: "complaint",
    });
  }
  return NextResponse.json({
    success: true,
    data: {
      complaint: answers ? answers[0].complaint : null,
      answers: answers,
      type: "answers",
    },
    type: "answers",
  });
}
