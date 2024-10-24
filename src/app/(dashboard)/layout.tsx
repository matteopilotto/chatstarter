"use client";

import { RedirectToSignIn, SignInButton, SignOutButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarGroupAction,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { User2Icon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { api } from "../../../convex/_generated/api";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

export default function DAshboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Authenticated>
        <SidebarProvider>
          <DashboardSidebar />
          {children}
        </SidebarProvider>
      </Authenticated>
      <Unauthenticated>
        <RedirectToSignIn />
      </Unauthenticated>
    </>
  );
}

function DashboardSidebar() {
  const user = useQuery(api.functions.user.get);

  if (!user) {
    return null;
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/friends">
                    <User2Icon /> Friends
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroup>
            <SidebarGroupLabel>Direct Messages</SidebarGroupLabel>
            <SidebarGroupAction>
              <PlusIcon />
              <span className="sr-only">New Direct Message</span>
            </SidebarGroupAction>
          </SidebarGroup>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="flex items-center">
                    <Avatar className="size-6">
                      <AvatarImage src={user.image} />
                      <AvatarFallback>{user.username[0]}</AvatarFallback>
                    </Avatar>
                    <p className="font-medium">{user.username}</p>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <SignOutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
