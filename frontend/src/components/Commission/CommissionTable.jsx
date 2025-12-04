import { useEffect, useState } from "react";
import { commissionApi } from "../../api/commission.api";

export default function CommissionTable() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const load = async () => {
            const res = await commissionApi.getReport();
            setRows(res.data.data);
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

    return (
        <div>
            <button onClick={exportCsv}>Export CSV</button>

            <table border="1" cellPadding="8" style={{ marginTop: 20, width: "100%" }}>
                <thead>
                    <tr>
                        <th>Salesman</th>
                        <th>Brand</th>
                        <th>Class</th>
                        <th>Count</th>
                        <th>Amount</th>
                        <th>Commission</th>
                    </tr>
                </thead>

                <tbody>
                    {rows.map((r, i) => (
                        <tr key={i}>
                            <td>{r.salesman}</td>
                            <td>{r.brand}</td>
                            <td>{r.class}</td>
                            <td>{r.count}</td>
                            <td>${r.amount}</td>
                            <td>${r.commission}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
