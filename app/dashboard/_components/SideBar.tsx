"use client";

import { Sidebar } from "@/components/ui/sidebar";
import SidebarContent from "./SidebarContent";

const SidebarDashboard = () => {
  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r">
      <SidebarContent />
    </Sidebar>
  );
};

export default SidebarDashboard;
