import { Settings, Bell, CircleUser } from "lucide-react";

import DashboardSection from "../DashboardSection";
import { Profile, Divider } from "./styles";

export default function Header() {
    return (
        <DashboardSection
            width="100%"
            height="70px"
            justifyContent="space-between"
            padding="0 20px"
        >
            <h1 style={{ fontWeight: 400, fontSize: "1.5rem" }}>Overview</h1>

            <Profile>
                <Bell size={24} style={{ marginRight: 20 }} />
                <Settings size={24} />

                <Divider />

                <CircleUser size={24} />
            </Profile>
        </DashboardSection>
    );
}
