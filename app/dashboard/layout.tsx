import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SideBar } from "./_components";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <SidebarTrigger className="fixed left-4 top-4 z-40 md:hidden" />
        <SideBar />
        <SidebarInset className="px-6 pb-3 overflow-auto">
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
