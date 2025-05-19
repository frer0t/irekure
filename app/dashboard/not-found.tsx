import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6">
      <div className="w-full max-w-lg text-center space-y-6">
        <h2 className="text-8xl font-extrabold text-primary">404</h2>
        <h3 className="text-3xl font-semibold">Ipaji Ntibashije Kuboneka</h3>
        <p className="text-xl text-muted-foreground max-w-md mx-auto">
          Ipaji mushaka ntibashije kuboneka. Mushobora gusubira inyuma cyangwa
          kujya ku ipaji y'ibanze.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/dashboard" passHref className="cursor-pointer">
            <Button variant="default" size="lg" className="font-medium px-8">
              Subira ku ipaji y'ibanze
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
