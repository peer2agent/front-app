import { ReactNode } from "react";
import { Container } from "./styles";

interface DashboardSectionProps {
    children: ReactNode;
    width?: string;
    height?: string;
    alignItems?: string;
    justifyContent?: string;
    borderRadius?: string;
    flexDirection?: string;
    padding?: string;
}

export default function DashboardSection({
    children,
    width = "100%",
    height = "100%",
    alignItems = "center",
    justifyContent = "center",
    borderRadius = "16px",
    flexDirection = "row",
    padding = "0",
}: DashboardSectionProps) {
    return (
        <Container
            width={width}
            height={height}
            alignItems={alignItems}
            justifyContent={justifyContent}
            borderRadius={borderRadius}
            flexDirection={flexDirection}
            padding={padding}
        >
            {children}
        </Container>
    );
}
