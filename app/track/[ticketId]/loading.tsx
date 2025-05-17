import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
  return (
    <>
      <CardHeader className="pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-3 w-3/4">
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-5 w-1/2" />
          </div>
          <Skeleton className="h-16 w-16 rounded-lg" />
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-14" />
          ))}
        </div>

        <div className="space-y-3">
          <Skeleton className="h-5 w-1/4" />
          <Skeleton className="h-32 w-full" />
        </div>

        <div className="space-y-3 border-t pt-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-4 w-48" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between py-6">
        <Skeleton className="h-10 w-40" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-28" />
        </div>
      </CardFooter>
    </>
  );
}
