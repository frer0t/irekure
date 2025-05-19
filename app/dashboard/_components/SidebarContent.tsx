"use client";

import { FileText, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarContent as SidebarContentContainer,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { logout } from "../actions";

const navigationLinks = [
  { href: "/dashboard", label: "Ahabanza", icon: Home },
  { href: "/dashboard/complaints", label: "Ibibazo", icon: FileText },
];

const SidebarContent = () => {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <>
      <SidebarHeader>
        <h2 className="px-2 text-xl font-semibold tracking-tight ">
          <span className="font-bold relative ">
            <span className="text-primary">i</span>rekure
            <span className="absolute -top-1 -right-2 h-2 w-2 rounded-full bg-primary" />
          </span>
        </h2>
      </SidebarHeader>
      <Separator />
      <SidebarContentContainer>
        <SidebarMenu className="px-2 pt-2 ">
          {navigationLinks.map((navItem) => {
            const Icon = navItem.icon;
            const isActive = pathname === navItem.href;
            return (
              <SidebarMenuItem key={navItem.href}>
                <Link href={navItem.href} passHref>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={state === "collapsed" ? navItem.label : undefined}
                  >
                    <span>
                      <Icon className="size-4" />
                      <span>{navItem.label}</span>
                    </span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>

        {/* Logout Button */}
        <div className="mt-auto px-2 pb-4">
          <Separator className="my-4" />
          <form action={logout}>
            <Button
              type="submit"
              variant={"destructive"}
              className="w-full hover:cursor-pointer"
            >
              <span>Gusohoka</span>
            </Button>
          </form>
        </div>
      </SidebarContentContainer>
    </>
  );
};

export default SidebarContent;
