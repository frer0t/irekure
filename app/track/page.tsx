import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { TrackingForm } from "./_components";

export const metadata = {
  title: "Shakisha Ikibazo | Irekure",
  description: "Gukurikirana ikibazo cyawe mu buryo bworoshye kuri Irekure",
};

export default function TrackPage() {
  return (
    <div className="flex w-full items-center justify-center min-h-[70vh] px-4 lg:px-8">
      <div className="w-full max-w-3xl mb-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Gukurikirana Ikibazo
        </h1>
        <TrackingForm />
        <Card className="mt-6">
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                  1
                </div>
                <p className="text-base">
                  Andika nomero y'ihariye ikibazo cyawe
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                  2
                </div>
                <p className="text-base">
                  Kanda "Shakisha" kugira ngo ubone amakuru y'ikibazo cyawe
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                  3
                </div>
                <p className="text-base">
                  Reba imiterere y'ikibazo cyawe n'aho kigeze
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-center space-x-4 mt-6">
          <Link href="/submit">
            <Button variant={"link"}>Tanga Ikibazo</Button>
          </Link>
          <Link href="/">
            <Button variant={"link"}>Subira ku ipaji y'ibanze</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
