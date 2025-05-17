import { CardContent } from "@/components/ui/card";
import { TicketResponse } from "@/types/api";
import { formatDate } from "date-fns";
import { Building2, CalendarDays, Mail, Phone, User } from "lucide-react";
const TrackingContent = ({ data }: { data: TicketResponse["data"] }) => {
  const complaint = data?.complaint;

  return (
    <CardContent className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border  rounded-lg p-4 flex items-center gap-2">
          <User className=" text-primary" size={30} />
          <p className="font-bold ">{complaint?.name}</p>
        </div>
        <div className="border  rounded-lg p-4 flex items-center gap-2">
          <Phone className=" text-primary" size={30} />
          <p className="font-bold ">{complaint?.phone}</p>
        </div>
        <div className="border  rounded-lg p-4 flex items-center gap-2">
          <Mail className=" text-primary" size={30} />
          <p className="font-bold ">{complaint?.email}</p>
        </div>
        <div className="border  rounded-lg p-4 flex items-center gap-2">
          <CalendarDays className=" text-primary" size={30} />
          <p className="font-bold ">
            {formatDate(complaint?.created_at as string, "PPPP")}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Ubisobanuro bw'Ikibazo</h3>
        <p className="text-md text-muted-foreground border p-4 rounded-lg">
          {complaint?.description || "Nta bisobanuro byatanzwe."}
        </p>
      </div>
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Dokima</h3>
        {complaint?.files && complaint.files.length > 0 ? (
          <div className="list-disc space-y-2">
            {complaint.files.map((file, index) => (
              <a
                href={file}
                key={index}
                className="text-md text-primary hover:underline"
                target="_blank"
              >
                {index + 1}. {file.split("/").pop() || "Dokima"}
              </a>
            ))}
          </div>
        ) : (
          <p className="text-md text-muted-foreground">Nta dokima yatanzwe.</p>
        )}
      </div>
      {data?.answers && data?.answers.length > 0 ? (
        <div className="space-y-3 border-t pt-4">
          <h3 className="text-lg font-semibold">Ibisubizo</h3>
          {data.answers.map((answer, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-2">
                <Building2 className="text-primary" size={20} />
                <p className="font-bold">
                  {formatDate(answer.created_at, "PP")}
                </p>
              </div>
              <p className="text-md text-muted-foreground">{answer.answer}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3 border-t pt-4">
          <h3 className="text-lg font-semibold">Ibisubizo</h3>
          <p className="text-md text-muted-foreground">
            Nta bisubizo byatanzwe.
          </p>
        </div>
      )}
    </CardContent>
  );
};

export default TrackingContent;
