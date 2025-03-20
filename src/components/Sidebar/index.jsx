"use client";

import { LayoutDashboard, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";

import DashboardSection from "@/components/DashboardSection";
import { Divider, ImageContainer } from "./styles";

export default function Sidebar() {
    const router = useRouter();

    return (
        <DashboardSection
            width="90px"
            justifyContent="flex-start"
            flexDirection="column"
        >
            <Divider />

            <ImageContainer>
                <img src="/images/peer2agent_logo.png" />
            </ImageContainer>

            <Divider />

            <LayoutDashboard
                size={24}
                onClick={() => router.push("/dashboard")}
            />

            <Divider />

            <Wallet size={24} onClick={() => router.push("/wallet")} />
        </DashboardSection>
    );
}
