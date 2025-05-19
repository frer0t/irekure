import { Badge } from "@/components/ui/badge";
import { Tables } from "@/types/supabase";
import { Clock, File, FileCheck } from "lucide-react";
import { ReactNode } from "react";

const getComplaintStatus = (
  status?: string,
  size: number = 16
): { label: string; color: string; icon: ReactNode } => {
  switch (status) {
    case "submitted":
      return {
        label: "Byatanzwe",
        color: "bg-yellow-500",
        icon: <Clock size={size} color="yellow" />,
      };
    case "reviewing":
      return {
        label: "Gukurikiranwa",
        color: "bg-blue-500",
        icon: <File size={size} color="yellow" />,
      };
    case "solved":
      return {
        label: "Kemuwe",
        color: "bg-green-500",
        icon: <FileCheck size={size} color="green" />,
      };
    default:
      return {
        label: "itazwi",
        color: "bg-gray-500",
        icon: <File size={size} color="grey" />,
      };
  }
};
const getStatusBadge = (status: Tables<"complaints">["status"]) => {
  switch (status) {
    case "submitted":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
          Byatanzwe
        </Badge>
      );
    case "reviewing":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
          Birebwa
        </Badge>
      );
    case "solved":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
          Byakemutse
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>;
  }
};
export { getComplaintStatus, getStatusBadge };
