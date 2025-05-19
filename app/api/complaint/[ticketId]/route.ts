import { createClientServer } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ ticketId: string }> }
) {
  try {
    const { ticketId } = await params;
    const supabase = await createClientServer();

    // Get the complaint
    const { data: complaint, error: complaintError } = await supabase
      .from("complaints")
      .select("*, category:categories(*)")
      .eq("ticket_id", ticketId)
      .single();

    if (complaintError || !complaint) {
      return NextResponse.json(
        {
          success: false,
          message: "Complaint not found",
          error: complaintError?.message || "Not found",
        },
        { status: 404 }
      );
    }

    const { data: answers, error: answersError } = await supabase
      .from("answers")
      .select("*, organization:organizations(*)")
      .eq("complaint", ticketId)
      .order("created_at", { ascending: true });

    if (answersError) {
      console.error("Error fetching answers:", answersError);
    }

    return NextResponse.json({
      success: true,
      data: {
        complaint,
        answers: answers || [],
      },
      message: "Complaint found",
    });
  } catch (error) {
    console.error("Error getting complaint:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error getting complaint",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ ticketId: string }> }
) {
  try {
    const { ticketId } = await params;
    const data = await req.json();
    const supabase = await createClientServer();

    const { status, response } = data;

    // Update complaint status
    if (status) {
      const { error: updateError } = await supabase
        .from("complaints")
        .update({
          status,
        })
        .eq("ticket_id", ticketId);

      if (updateError) {
        return NextResponse.json(
          {
            success: false,
            message: "Failed to update complaint status",
            error: updateError.message,
          },
          { status: 500 }
        );
      }
    }

    // Add response if provided
    if (response) {
      const { error: responseError } = await supabase.from("answers").insert({
        complaint: ticketId,
        answer: response,
        organization: 0,
      });

      if (responseError) {
        return NextResponse.json(
          {
            success: false,
            message: "Failed to add response",
            error: responseError.message,
          },
          { status: 500 }
        );
      }
    }

    const { data: updatedComplaint } = await supabase
      .from("complaints")
      .select("*, category:categories(*)")
      .eq("ticket_id", ticketId)
      .single();

    const { data: updatedAnswers } = await supabase
      .from("answers")
      .select("*, organization:organizations(*)")
      .eq("complaint", ticketId)
      .order("created_at", { ascending: true });

    return NextResponse.json({
      success: true,
      message: "Complaint updated successfully",
      data: {
        complaint: updatedComplaint,
        answers: updatedAnswers || [],
      },
    });
  } catch (error) {
    console.error("Error updating complaint:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error updating complaint",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
