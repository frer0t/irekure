import { Tables } from "./supabase";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string | string[];
  details?: object[] | string[];
}

interface ComplaintResponse extends ApiResponse<Tables<"complaints">> {}
interface AnswerResponse extends ApiResponse<Tables<"answers">> {}

interface TicketResponse
  extends ApiResponse<{
    complaint: Tables<"complaints">;
    answers?: Tables<"answers">[];
  }> {
  type: "complaint" | "answers";
}

export type { AnswerResponse, ApiResponse, ComplaintResponse, TicketResponse };
