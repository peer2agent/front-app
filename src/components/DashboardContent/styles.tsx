import styled from "styled-components";

export const DashboardWrapper = styled.div`
    padding: 24px;
`;

export const DashboardTitle = styled.h1`
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 24px;
    color: #111827;
`;

export const TopRowContainer = styled.div`
    display: flex;
    gap: 24px;
    margin-bottom: 24px;
`;

export const ChartContainer = styled.div`
    flex: 1;
    min-width: 0; // Prevent flex items from overflowing
`;

export const FullWidthContainer = styled.div`
    width: 100%;
`;

export const ChartCard = styled.div`
    background-color: transparent; // Mudando de white para transparent
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    height: 100%;
`;

export const ChartTitle = styled.h3`
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 16px;
    color: #e0e0e0; // Mudando para uma cor mais clara para melhor visibilidade no fundo escuro
`;

export const LoadingContainer = styled.div`
    height: 256px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(
        0,
        0,
        0,
        0.1
    ); // Fundo ligeiramente escuro para o container de loading
    border-radius: 8px;
    color: #e0e0e0; // Texto mais claro
`;

export const TransactionContainer = styled.div`
    overflow-y: auto;
    max-height: 400px;
    background-color: transparent; // Mudando de white para transparent
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

export const TransactionHeader = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    padding: 16px;
    border-bottom: 1px solid #2a2a2a; // Escurecendo a borda para ficar mais visível
    background-color: rgba(
        0,
        0,
        0,
        0.2
    ); // Fundo ligeiramente escuro para o cabeçalho
    font-weight: 600;
    position: sticky;
    top: 0;
`;

export const TransactionList = styled.div`
    padding: 0 16px;
`;

export const TransactionItem = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    padding: 12px 0;
    border-bottom: 1px solid #2a2a2a; // Escurecendo a borda para ficar mais visível

    &:last-child {
        border-bottom: none;
    }
`;

export const TokenAddress = styled.span`
    font-family: monospace;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #e0e0e0; // Texto mais claro
`;

export const ValueText = styled.span<{ isBuy?: boolean }>`
    color: ${(props) => (props.isBuy ? "#059669" : "#dc2626")};
    font-weight: ${(props) => (props.isBuy !== undefined ? "600" : "normal")};
`;

export const TimeStamp = styled.span`
    color: #a0a0a0; // Cor mais visível no fundo escuro
    font-size: 14px;
`;
