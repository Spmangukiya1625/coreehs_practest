import { useEffect, useState } from "react";
import { Table, Form, Row, Col, Button } from "react-bootstrap";
import { carModelApi } from "../../api/carModel.api";
const url = import.meta.env.VITE_BACKEND_URL;

export default function CarModelList({ onEdit, onDelete, reload }) {
    const [list, setList] = useState([]);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("latest");

    useEffect(() => {
        const loadModels = async () => {
            const res = await carModelApi.list({ search, sortBy: sort });
            setList(res.data.data || []);
        };
        loadModels();
    }, [search, sort, reload]);

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
                        <th>Actions</th>
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
                                    <img
                                        src={`${url}${item.defaultImageUrl}`}
                                        alt={item.modelName}
                                        width={80}
                                        height={60}
                                        style={{ objectFit: "cover", borderRadius: 5 }}
                                    />
                                </td>

                                <td>
                                    <b>{item.modelName}</b>
                                </td>
                                <td>{item.brand}</td>
                                <td>{item.class}</td>
                                <td>{item.modelCode}</td>
                                <td>
                                    <Button variant="warning" size="sm" onClick={() => onEdit(item)}>
                                        ✏️ Edit
                                    </Button>
                                    &nbsp;
                                    <Button variant="danger" size="sm" onClick={() => onDelete(item.id)}>
                                        🗑 Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </div>
    );
}
