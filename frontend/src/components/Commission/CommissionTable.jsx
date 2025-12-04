import { useEffect, useState } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { commissionApi } from "../../api/commission.api";
import "./CommissionPivotTable.css";

export default function CommissionPivotTable() {
    const [pivot, setPivot] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await commissionApi.getReport();
                const raw = res.data.data;

                const map = {};

                raw.forEach((item) => {
                    const key = item.salesmanName + "-" + item.class;

                    if (!map[key]) {
                        map[key] = {
                            salesman: item.salesmanName,
                            class: item.class,
                            Audi: 0,
                            Jaguar: 0,
                            LandRover: 0,
                            Renault: 0,
                        };
                    }

                    if (item.brand === "Audi") map[key].Audi = item.quantity;
                    if (item.brand === "Jaguar") map[key].Jaguar = item.quantity;
                    if (item.brand === "Land Rover") map[key].LandRover = item.quantity;
                    if (item.brand === "Renault") map[key].Renault = item.quantity;
                });

                setPivot(Object.values(map));
            } catch (err) {
                console.error("Error loading commission data", err);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    const exportCsv = async () => {
        const res = await commissionApi.exportCsv();
        const blob = new Blob([res.data], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "commission_pivot.csv";
        a.click();
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" variant="light" />
                <p className="mt-3 text-light">Loading commission report...</p>
            </div>
        );
    }

    return (
        <div className="commission-table-container">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="text-light mb-0">Commission Report</h3>
                <Button variant="outline-info" onClick={exportCsv}>
                    ⬇️ Export CSV
                </Button>
            </div>

            <Table striped bordered hover responsive variant="dark" className="commission-table">
                <thead>
                    <tr>
                        <th>Salesman</th>
                        <th>Class</th>
                        <th>Audi</th>
                        <th>Jaguar</th>
                        <th>Land Rover</th>
                        <th>Renault</th>
                    </tr>
                </thead>
                <tbody>
                    {pivot.map((row, i) => (
                        <tr key={i}>
                            <td>{row.salesman}</td>
                            <td>{row.class}</td>
                            <td>{row.Audi}</td>
                            <td>{row.Jaguar}</td>
                            <td>{row.LandRover}</td>
                            <td>{row.Renault}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
