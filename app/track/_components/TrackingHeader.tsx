import { CardHeader } from "@/components/ui/card";
import getComplaintStatus from "@/constants/complaint-status";
import { TicketResponse } from "@/types/api";

const TrackingHeader = ({ data }: { data: TicketResponse["data"] }) => {
  return (
    <CardHeader className="pb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-3 w-3/4">
          <h1 className="text-3xl font-bold">{data?.complaint.title}</h1>
          <h2 className="font-bold text-xl text-zinc-400">
            {data?.complaint.ticket_id}
          </h2>
        </div>

        <div
          className="h-16 w-16 rounded-lg
              flex flex-col items-center justify-center border "
        >
          {getComplaintStatus(data?.complaint.status, 35).icon}
        </div>
      </div>
    </CardHeader>
  );
};

export default TrackingHeader;
