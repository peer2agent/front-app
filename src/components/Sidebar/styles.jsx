import styled from "styled-components";

export const ImageContainer = styled.div`
    width: 100%;
    height: 40px;

    padding: 10px;

    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 100%;
        height: 100%;

        object-fit: contain;
    }
`;

export const Divider = styled.div`
    width: 100%;
    height: 1px;

    margin: 10px 0;
`;
