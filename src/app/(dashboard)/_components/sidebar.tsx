import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SignOutButton } from "@clerk/nextjs";
import { AvatarFallback } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useQuery } from "convex/react";
import { PlusIcon, User2Icon } from "lucide-react";
import Link from "next/link";
import { api } from "../../../../convex/_generated/api";
import { NewDirectMessage } from "./new-direct-message";
import { usePathname } from "next/navigation";

// const useTestDirectMessages = () => {
//   const user = useQuery(api.functions.user.get);
//   if (!user) {
//     return [];
//   }
//   return [user, user, user];
// };

export function DashboardSidebar() {
  const user = useQuery(api.functions.user.get);
  // const directMessages = useTestDirectMessages();
  const directMessages = useQuery(api.functions.dm.list);
  const pathname = usePathname();

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
                <SidebarMenuButton asChild isActive={pathname == "/"}>
                  <Link href="/friends">
                    <User2Icon /> Friends
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Direct Messages</SidebarGroupLabel>
          <NewDirectMessage />
          <SidebarGroupContent>
            <SidebarMenu>
              {directMessages?.map((directMessage) => (
                <SidebarMenuItem key={directMessage._id}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === `/dms/${directMessage._id}`}
                  >
                    <Link href={`/dms/${directMessage._id}`}>
                      <Avatar className="size-6">
                        <AvatarImage src={directMessage.user.image} />
                        <AvatarFallback>
                          {directMessage.user.username[0]}
                        </AvatarFallback>
                      </Avatar>
                      <p className="font-medium">
                        {directMessage.user.username}
                      </p>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
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
                <DropdownMenuContent align="end" side="top">
                  <DropdownMenuItem
                    className="border rounded-md hover:bg-gray-100 p-2"
                    asChild
                  >
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
