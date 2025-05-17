import { Clock, File, FileCheck } from "lucide-react";
import { ReactNode } from "react";

const getComplaintStatus = (
  status?: string,
  size: number = 16
): { label: string; color: string; icon: ReactNode } => {
  switch (status) {
    case "submitted":
      return {
        label: "kiracyategerejwe",
        color: "bg-yellow-500",
        icon: <Clock size={size} color="yellow" />,
      };
    case "reviewing":
      return {
        label: "Gukurikiranwa",
        color: "bg-blue-500",
        icon: <File size={size} color="blue" />,
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

export default getComplaintStatus;
