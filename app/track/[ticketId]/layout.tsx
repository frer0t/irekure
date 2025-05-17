import { Card } from "@/components/ui/card";

const TrackLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="w-full flex items-center justify-center flex-col px-4 pb-4 ">
      <Card className="w-full shadow-lg border-muted max-w-4xl">
        {children}
      </Card>
    </main>
  );
};

export default TrackLayout;
