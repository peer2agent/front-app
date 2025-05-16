import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useKey } from "@/context/KeyContext";
import PortfolioChart from "@/components/dashboard/PortfolioChart";
import TokenDistribution from "@/components/dashboard/TokenDistribution";
import DailyVolume from "@/components/dashboard/DailyVolume";
import TransactionsTable from "@/components/dashboard/TransactionsTable";

export default function Dashboard() {
    const { hasKey } = useKey();
    const navigate = useNavigate();

    useEffect(() => {
        if (!hasKey) {
            navigate("/");
        }
    }, [hasKey, navigate]);

    return (
        <div className="py-6 pr-10 h-screen flex flex-col">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Overview</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 max-h-[400px]">
                <PortfolioChart />
                <TokenDistribution />
                <DailyVolume />
            </div>

            <div className="grid grid-cols-1 gap-4">
                <TransactionsTable />
            </div>
        </div>
    );
}
