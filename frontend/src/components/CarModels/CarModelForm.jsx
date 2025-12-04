import { useForm } from "react-hook-form";
import { useState } from "react";
import { carModelApi } from "../../api/carModel.api";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./CarModelForm.css";

export default function CarModelForm({ onSuccess }) {
    const { register, handleSubmit, setValue, reset } = useForm();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleImages = (e) => {
        const files = Array.from(e.target.files);
        const valid = files.filter((f) => f.size <= 5 * 1024 * 1024);
        setImages(valid);
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => formData.append(key, data[key]));
            images.forEach((img) => formData.append("images", img));

            await carModelApi.create(formData);
            alert("✅ Car Model successfully created!");
            reset();
            setImages([]);

            if (onSuccess) onSuccess(); // Close modal if provided
        } catch (error) {
            console.error("Error creating car model:", error);
            alert("❌ Failed to create car model");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className="car-form">
            <Row className="g-3">
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Brand</Form.Label>
                        <Form.Select {...register("brand")} required>
                            <option value="">Select Brand</option>
                            <option value="Audi">Audi</option>
                            <option value="Jaguar">Jaguar</option>
                            <option value="Land Rover">Land Rover</option>
                            <option value="Renault">Renault</option>
                        </Form.Select>
                    </Form.Group>
                </Col>

                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Class</Form.Label>
                        <Form.Select {...register("class")} required>
                            <option value="">Select Class</option>
                            <option value="A-Class">A-Class</option>
                            <option value="B-Class">B-Class</option>
                            <option value="C-Class">C-Class</option>
                        </Form.Select>
                    </Form.Group>
                </Col>

                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Model Name</Form.Label>
                        <Form.Control type="text" placeholder="Model Name" {...register("modelName")} required />
                    </Form.Group>
                </Col>

                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Model Code</Form.Label>
                        <Form.Control type="text" maxLength={10} placeholder="Model Code" {...register("modelCode")} required />
                    </Form.Group>
                </Col>

                <Col xs={12}>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <div className="ckeditor-wrapper">
                            <CKEditor editor={ClassicEditor} onChange={(_, ed) => setValue("description", ed.getData())} />
                        </div>
                    </Form.Group>
                </Col>

                <Col xs={12}>
                    <Form.Group>
                        <Form.Label>Features</Form.Label>
                        <div className="ckeditor-wrapper">
                            <CKEditor editor={ClassicEditor} onChange={(_, ed) => setValue("features", ed.getData())} />
                        </div>
                    </Form.Group>
                </Col>

                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" placeholder="Price" {...register("price")} required />
                    </Form.Group>
                </Col>

                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Date of Manufacturing</Form.Label>
                        <Form.Control type="datetime-local" {...register("dateOfManufacturing")} required />
                    </Form.Group>
                </Col>

                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Sort Order</Form.Label>
                        <Form.Control type="number" placeholder="Sort Order" {...register("sortOrder")} />
                    </Form.Group>
                </Col>

                <Col md={6} className="d-flex align-items-center">
                    <Form.Check type="checkbox" label="Active" {...register("active")} />
                </Col>

                <Col xs={12}>
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                        <Form.Label>Upload Images</Form.Label>
                        <Form.Control type="file" multiple accept="image/*" onChange={handleImages} />
                        {images.length > 0 && <small className="text-info mt-1 d-block">{images.length} image(s) selected</small>}
                    </Form.Group>
                </Col>

                <Col xs={12} className="text-end">
                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? "Creating..." : "Create Car Model"}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}
