import { Tables } from "./supabase";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  details?: string[];
}

interface ComplaintResponse extends ApiResponse<Tables<"complaints">> {}
export type { ApiResponse, ComplaintResponse };
