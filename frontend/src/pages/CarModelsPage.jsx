import CarModelForm from "../components/CarModels/CarModelForm";
import CarModelList from "../components/CarModels/CarModelList";

export default function CarModelsPage() {
    return (
        <div style={{ display: "flex", gap: 40 }}>
            {/* <div style={{ flex: 1 }}>
                <h3>Add Car Model</h3>
                <CarModelForm />
            </div> */}

            <div style={{ flex: 1 }}>
                <h3>Car Model List</h3>
                <CarModelList />
            </div>
        </div>
    );
}
