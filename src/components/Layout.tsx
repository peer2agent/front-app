
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useKey } from "@/context/KeyContext";

export default function Layout() {
  const { hasKey } = useKey();
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasKey) {
      navigate("/");
    }
  }, [hasKey, navigate]);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="h-screen w-full flex bg-background">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
