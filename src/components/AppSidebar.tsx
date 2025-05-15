
import { Sidebar, SidebarContent, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Key } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";

export default function AppSidebar() {
  const sidebar = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-3 py-2 rounded-md transition-colors ${
      isActive 
        ? "bg-primary text-white font-medium" 
        : "text-muted-foreground hover:bg-muted/50"
    }`;

  return (
    <Sidebar className={`border-r border-border ${sidebar.open ? "w-64" : "w-20"} transition-all duration-300`} collapsible="icon">
      <div className="flex items-center justify-between py-4 px-2">
        {sidebar.open ? (
          <>
            <div className="flex items-center">
              <img src="/logo.png" alt="Peer2Agent" className="w-8 h-8" />
              <h1 className="ml-2 text-xl font-bold text-gradient">Peer2Agent</h1>
            </div>
            <SidebarTrigger className="ml-auto" />
          </>
        ) : (
          <div className="w-full flex justify-center">
            <img src="/logo.png" alt="Peer2Agent" className="w-8 h-8" />
          </div>
        )}
      </div>
      
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/dashboard" className={getNavCls} end>
                <LayoutDashboard className="w-5 h-5 mr-2" />
                {sidebar.open && <span>Dashboard</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/wallet-tracker" className={getNavCls} end>
                <Key className="w-5 h-5 mr-2" />
                {sidebar.open && <span>Wallet Tracker</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
