import { useState } from "react";
import { Container, ButtonGroup, Button } from "react-bootstrap";
import CarModelsPage from "./pages/CarModelsPage";
import CommissionPage from "./pages/CommissionPage";
import "./App.css";

export default function App() {
    const [page, setPage] = useState("cars");

    return (
        <div className="dark-theme">
            <Container className="mt-5 p-4 app-container rounded shadow-lg">
                {/* Navigation Buttons */}
                <ButtonGroup className="mb-4 d-flex justify-content-center">
                    <Button variant={page === "cars" ? "primary" : "outline-light"} className="tab-button" onClick={() => setPage("cars")}>
                        🚗 Car Models
                    </Button>

                    <Button
                        variant={page === "commission" ? "primary" : "outline-light"}
                        className="tab-button"
                        onClick={() => setPage("commission")}
                    >
                        💼 Commission Report
                    </Button>
                </ButtonGroup>

                <hr className="divider" />

                {/* Pages */}
                <div className="page-content">
                    {page === "cars" && <CarModelsPage />}
                    {page === "commission" && <CommissionPage />}
                </div>
            </Container>
        </div>
    );
}
