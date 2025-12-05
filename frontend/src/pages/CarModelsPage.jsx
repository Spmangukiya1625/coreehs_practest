import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import CarModelForm from "../components/CarModels/CarModelForm";
import CarModelList from "../components/CarModels/CarModelList";
import { carModelApi } from "../api/carModel.api";

export default function CarModelsPage() {
    const [showModal, setShowModal] = useState(false);
    const [reload, setReload] = useState(false);
    const [editModel, setEditModel] = useState(null);

    // Toggle reload flag
    const refreshList = () => setReload((prev) => !prev);
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure want to delete this model?")) return;

        await carModelApi.remove(id);
        refreshList();
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="text-light mb-0">Car Model List</h3>
                <Button variant="primary" onClick={() => setShowModal(true)}>
                    ➕ Add Car Model
                </Button>
            </div>

            {/* Pass reload to list */}
            <CarModelList
                reload={reload}
                onEdit={(model) => {
                    setEditModel(model);
                    setShowModal(true);
                }}
                onDelete={handleDelete}
            />

            <CarModelForm
                show={showModal}
                initialData={editModel}
                onClose={() => {
                    setShowModal(false);
                    setEditModel(null);
                }}
                onSuccess={refreshList}
            />
        </div>
    );
}
