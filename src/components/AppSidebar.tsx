import {
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Key } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function AppSidebar() {
    const location = useLocation();

    const getNavCls = ({ isActive }: { isActive: boolean }) =>
        `flex items-center px-3 py-2 rounded-md transition-colors ${
            isActive
                ? "bg-primary text-white font-medium"
                : "text-muted-foreground hover:bg-muted/50"
        }`;

    return (
        <Sidebar className="w-48 border-r border-border">
            <div className="flex items-center justify-center py-4 px-2">
                <img src="/logo.png" alt="Peer2Agent" className="w-28" />
            </div>

            <SidebarContent>
                <SidebarMenu className="flex flex-col gap-1 px-4 mt-10">
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <NavLink to="/dashboard" className={getNavCls} end>
                                <LayoutDashboard className="w-5 h-5 mr-2" />
                                <span>Dashboard</span>
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <NavLink
                                to="/wallet-tracker"
                                className={getNavCls}
                                end
                            >
                                <Key className="w-5 h-5 mr-2" />
                                <span>Wallet Tracker</span>
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem> */}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}
