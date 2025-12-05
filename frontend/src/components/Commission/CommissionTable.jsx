import { useEffect, useState } from "react";
import { Table, Button, Spinner, Accordion } from "react-bootstrap";
import { commissionApi } from "../../api/commission.api";
import "./CommissionPivotTable.css";

export default function CommissionPivotTable() {
    const [report, setReport] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await commissionApi.getReport();
                setReport(res.data.data);
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
        a.download = "commission_report.csv";
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

            <Accordion alwaysOpen>
                {report.map((salesman, i) => (
                    <Accordion.Item eventKey={i.toString()} key={i}>
                        <Accordion.Header>
                            <b>{salesman.salesmanName}</b> — 
                            <span className="ms-2">Previous Year Sales: ${salesman.previousYearSales.toLocaleString()}</span>
                        </Accordion.Header>

                        <Accordion.Body>
                            {["A", "B", "C"].map((cls) => {
                                const classData = salesman.classes[cls];

                                if (!classData || classData.length === 0) return null;

                                return (
                                    <div key={cls} className="mb-4">
                                        <h5 className="text-info">Class {cls}</h5>

                                        <Table striped bordered hover responsive variant="dark">
                                            <thead>
                                                <tr>
                                                    <th>Brand</th>
                                                    <th>Quantity</th>
                                                    <th>Unit Price</th>
                                                    <th>Base Commission</th>
                                                    <th>Fixed Commission</th>
                                                    <th>Extra Commission</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {classData.map((item, idx) => (
                                                    <tr key={idx}>
                                                        <td>{item.brand}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>${item.unitPrice.toLocaleString()}</td>
                                                        <td>${item.baseCommission.toFixed(2)}</td>
                                                        <td>${item.fixedCommission.toFixed(2)}</td>
                                                        <td>${item.extraCommission.toFixed(2)}</td>
                                                        <td><b>${item.totalCommission.toFixed(2)}</b></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                );
                            })}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
}
