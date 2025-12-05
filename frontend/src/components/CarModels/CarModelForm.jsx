import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { carModelApi } from "../../api/carModel.api";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function CarModelForm({ show, onClose, onSuccess, initialData }) {
    const [existingImages, setExistingImages] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            brand: "",
            class: "",
            modelName: "",
            modelCode: "",
            description: "",
            features: "",
            price: "",
            dateOfManufacturing: "",
            sortOrder: 0,
            active: false,
        },
    });

    // Prefill form when editing
    useEffect(() => {
        if (initialData) {
            Object.keys(initialData).forEach((k) => {
                if (k === "dateOfManufacturing") {
                    const d = new Date(initialData[k]);
                    const formatted = d.toISOString().slice(0, 16);
                    setValue("dateOfManufacturing", formatted);
                } else if (k === "active") {
                    setValue("active", Boolean(initialData[k]));
                } else {
                    setValue(k, initialData[k] ?? "");
                }
            });

            setExistingImages(initialData.images || []);
        } else {
            reset();
            setExistingImages([]);
            setImages([]);
        }
    }, [initialData, show]);

    const handleImages = (e) => {
        const files = Array.from(e.target.files);
        const valid = files.filter((f) => f.size <= 5 * 1024 * 1024);
        setImages(valid);
    };

    const onSubmit = async (data) => {
        setLoading(true);

        try {
            const formData = new FormData();

            formData.append("brand", data.brand);
            formData.append("class", data.class);
            formData.append("modelName", data.modelName);
            formData.append("modelCode", data.modelCode);
            formData.append("description", data.description);
            formData.append("features", data.features);
            formData.append("price", data.price);
            formData.append("dateOfManufacturing", data.dateOfManufacturing);
            formData.append("sortOrder", data.sortOrder || 0);
            formData.append("active", data.active ? true : false);

            images.forEach((img) => formData.append("images", img));

            if (initialData?.id) {
                await carModelApi.update(initialData.id, formData);
            } else {
                await carModelApi.create(formData);
            }

            reset();
            setImages([]);

            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            alert("Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onClose} centered backdrop="static" size="lg">
            <Modal.Header closeButton className="bg-dark text-light">
                <Modal.Title>{initialData ? "Edit Car Model" : "Add Car Model"}</Modal.Title>
            </Modal.Header>

            <Modal.Body className="bg-dark text-light">
                <Form
                    onSubmit={handleSubmit((data) => {
                        setSubmitted(true);
                        onSubmit(data);
                    })}
                >
                    <input type="hidden" {...register("description")} />
                    <input type="hidden" {...register("features")} />

                    <Row className="g-3">
                        {/* Brand */}
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Brand</Form.Label>
                                <Form.Select {...register("brand", { required: "Brand is required" })}>
                                    <option value="">Select</option>
                                    <option value="Audi">Audi</option>
                                    <option value="Jaguar">Jaguar</option>
                                    <option value="Land Rover">Land Rover</option>
                                    <option value="Renault">Renault</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        {/* Class */}
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Class</Form.Label>
                                <Form.Select {...register("class", { required: "Class is required" })}>
                                    <option value="">Select</option>
                                    <option value="A">A-Class</option>
                                    <option value="B">B-Class</option>
                                    <option value="C">C-Class</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        {/* Other fields */}
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Model Name</Form.Label>
                                <Form.Control type="text" {...register("modelName", { required: "Model Name is required" })} />
                                {errors.modelName && <Form.Text className="text-danger">{errors.modelName.message}</Form.Text>}
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Model Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    maxLength={10}
                                    {...register("modelCode", {
                                        required: "Model Code is required",
                                        maxLength: { value: 10, message: "Max 10 characters" },
                                        pattern: { value: /^[A-Za-z0-9]+$/, message: "Must be alphanumeric" },
                                    })}
                                />
                                {errors.modelCode && <small className="text-danger">{errors.modelCode.message}</small>}
                            </Form.Group>
                        </Col>

                        {/* CKEditor */}
                        <Col xs={12}>
                            <Form.Label>Description</Form.Label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={initialData?.description || ""}
                                onChange={(_, ed) => setValue("description", ed.getData())}
                            />

                            {submitted && !watch("description") && <small className="text-danger">Description is required</small>}
                        </Col>

                        <Col xs={12}>
                            <Form.Label>Features</Form.Label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={initialData?.features || ""}
                                onChange={(_, ed) => setValue("features", ed.getData())}
                            />

                            {submitted && !watch("features") && <small className="text-danger">Features are required</small>}
                        </Col>

                        {/* Price, Date, Sort */}
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    {...register("price", {
                                        required: "Price is required",
                                        min: { value: 1, message: "Price must be greater than 0" },
                                    })}
                                />
                                {errors.price && <small className="text-danger">{errors.price.message}</small>}
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Date of Manufacturing</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    {...register("dateOfManufacturing", {
                                        required: "Manufacturing date is required",
                                    })}
                                />
                                {errors.dateOfManufacturing && <small className="text-danger">{errors.dateOfManufacturing.message}</small>}
                            </Form.Group>
                        </Col>

                        {/* Active */}
                        <Col md={6}>
                            <Form.Check type="checkbox" label="Active" {...register("active")} />
                        </Col>

                        {/* Existing Images */}
                        <Col xs={12}>
                            {existingImages.length > 0 && (
                                <div className="d-flex gap-2 flex-wrap">
                                    {existingImages.map((img, i) => (
                                        <img key={i} src={`http://localhost:5000${img.url}`} width={90} height={70} />
                                    ))}
                                </div>
                            )}
                        </Col>

                        {/* Upload */}
                        <Col xs={12}>
                            <Form.Group>
                                <Form.Label>Upload Images</Form.Label>
                                <Form.Control type="file" multiple onChange={handleImages} {...(initialData ? {} : { required: true })} />

                                {submitted && !initialData && images.length === 0 && (
                                    <small className="text-danger">Please upload at least 1 image</small>
                                )}
                            </Form.Group>
                        </Col>

                        {/* Submit */}
                        <Col xs={12} className="text-end">
                            <Button variant="secondary" onClick={onClose} className="me-2">
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? "Saving..." : initialData ? "Update" : "Create"}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
