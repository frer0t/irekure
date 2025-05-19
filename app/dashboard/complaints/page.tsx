import { format, parseISO } from "date-fns";
import { Clock, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStatusBadge } from "@/constants/complaint-status";
import { createClientServer } from "@/lib/supabase/server";
import Link from "next/link";

export default async function ComplaintsPage() {
  const supabase = await createClientServer();

  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    const date = parseISO(dateString);
    return format(date, "PPpp");
  };

  const { data: complaints, error } = await supabase
    .from("complaints")
    .select("*,category:categories(*)")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching complaints:", error);
    throw new Error(`Failed to fetch complaints: ${error.message}`);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Ibibazo</h1>
        <p className="text-muted-foreground">
          Kureba no gucunga ibibazo byatanzwe
        </p>
      </div>

      <div className="rounded-md border ">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Nomero</TableHead>
              <TableHead>Umutwe</TableHead>
              <TableHead>Icyiciro</TableHead>
              <TableHead>Imimerere</TableHead>
              <TableHead>Itariki</TableHead>
              <TableHead>Izina</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {complaints.map((complaint) => (
              <TableRow key={complaint.id}>
                <TableCell className="font-medium">
                  {complaint.ticket_id}
                </TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {complaint.title}
                </TableCell>
                <TableCell>{complaint.category?.name}</TableCell>
                <TableCell>{getStatusBadge(complaint.status)}</TableCell>
                <TableCell title={formatDate(complaint.created_at)}>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {formatDate(complaint.created_at)}
                  </div>
                </TableCell>
                <TableCell>{complaint.name}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant={"outline"}
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ibikorwa</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link
                          href={`/dashboard/complaints/${complaint.ticket_id}`}
                        >
                          Reba Ibisobanuro
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {complaints.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Nta bibazo byabonetse.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
