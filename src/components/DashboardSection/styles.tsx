import styled from "styled-components";

interface ContainerProps {
    width: string;
    height: string;
    alignItems: string;
    justifyContent: string;
    borderRadius: string;
    flexDirection: string;
    padding: string;
}

export const Container = styled.div<ContainerProps>`
    width: ${(props) => props.width};
    height: ${(props) => props.height};

    display: flex;
    flex-direction: ${(props) => props.flexDirection};
    align-items: ${(props) => props.alignItems};
    justify-content: ${(props) => props.justifyContent};

    background-color: #000;
    border-radius: ${(props) => props.borderRadius};

    padding: ${(props) => props.padding};

    transition: all 0.3s ease-out;

    svg {
        cursor: pointer;
    }

    svg:hover {
        scale: 1.1;
    }
`;
