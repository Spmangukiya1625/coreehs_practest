import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import CarModelForm from "../components/CarModels/CarModelForm";
import CarModelList from "../components/CarModels/CarModelList";

export default function CarModelsPage() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="container mt-4">
            {/* Header with Add Button */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="text-light mb-0">Car Model List</h3>
                <Button variant="primary" onClick={() => setShowModal(true)} className="shadow-sm">
                    ➕ Add Car Model
                </Button>
            </div>

            {/* Car List Table */}
            <CarModelList />

            {/* Add Car Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered backdrop="static">
                <Modal.Header closeButton className="bg-dark text-light">
                    <Modal.Title>Add New Car Model</Modal.Title>
                </Modal.Header>

                <Modal.Body className="bg-dark text-light">
                    <CarModelForm onSuccess={() => setShowModal(false)} />
                </Modal.Body>
            </Modal>
        </div>
    );
}
