import { useState } from "react";
import CarModelsPage from "./pages/CarModelsPage";
import CommissionPage from "./pages/CommissionPage";

export default function App() {
    const [page, setPage] = useState("cars");

    return (
        <div style={{ padding: 20 }}>
            <button onClick={() => setPage("cars")}>Car Models</button>
            <button onClick={() => setPage("commission")}>Commission Report</button>

            <hr />

            {page === "cars" && <CarModelsPage />}
            {page === "commission" && <CommissionPage />}
        </div>
    );
}
