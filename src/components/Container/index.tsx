"use client";

import { StyledContainer } from "./styles";
import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
    return <StyledContainer>{children}</StyledContainer>;
}
