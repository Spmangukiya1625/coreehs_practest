import { useEffect, useState } from "react";
import { Table, Form, Row, Col } from "react-bootstrap";
import { carModelApi } from "../../api/carModel.api";

export default function CarModelList() {
    const [list, setList] = useState([]);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("latest");

    useEffect(() => {
        const loadModels = async () => {
            const res = await carModelApi.list({ search, sortBy: sort });
            setList(res.data.data || []);
        };
        loadModels();
    }, [search, sort]);

    return (
        <div className="container mt-4">
            {/* Filters */}
            <Row className="mb-3">
                <Col md={6}>
                    <Form.Control type="text" placeholder="Search Name or Code..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </Col>
                <Col md={3}>
                    <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="latest">Latest</option>
                        <option value="sortOrder">Sort Order</option>
                        <option value="manufacturingDate">Date of Manufacturing</option>
                    </Form.Select>
                </Col>
            </Row>

            {/* Table */}
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Model Name</th>
                        <th>Brand</th>
                        <th>Class</th>
                        <th>Code</th>
                    </tr>
                </thead>

                <tbody>
                    {list.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center py-3">
                                No Models Found
                            </td>
                        </tr>
                    ) : (
                        list.map((item) => (
                            <tr key={item.id}>
                                <td style={{ width: 100 }}>
                                    <img src={item.defaultImage} alt="" width={80} height={60} style={{ objectFit: "cover", borderRadius: 5 }} />
                                </td>

                                <td>
                                    <b>{item.modelName}</b>
                                </td>
                                <td>{item.brand}</td>
                                <td>{item.class}</td>
                                <td>{item.modelCode}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </div>
    );
}
