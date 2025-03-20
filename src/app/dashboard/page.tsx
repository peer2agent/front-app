"use client";

import Container from "@/components/Container";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import DashboardContent from "@/components/DashboardContent";

import { PageContent, Main } from "./styles";

export default function Dashboard() {
    return (
        <Container>
            <PageContent>
                <Sidebar />

                <Main>
                    <Header />

                    <DashboardContent />
                </Main>
            </PageContent>
        </Container>
    );
}
