import { useForm } from "react-hook-form";
import { useState } from "react";
import { carModelApi } from "../../api/carModel.api";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function CarModelForm() {
    const { register, handleSubmit, setValue } = useForm();
    const [images, setImages] = useState([]);

    const handleImages = (e) => {
        const files = Array.from(e.target.files);
        const valid = files.filter((f) => f.size <= 5 * 1024 * 1024);
        setImages(valid);
    };

    const onSubmit = async (data) => {
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        images.forEach((img) => formData.append("images", img));

        await carModelApi.create(formData);

        alert("Car Model successfully created!");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "grid", gap: 12, maxWidth: 500 }}>
            <select {...register("brand")} required>
                <option value="">Select Brand</option>
                <option value="Audi">Audi</option>
                <option value="Jaguar">Jaguar</option>
                <option value="Land Rover">Land Rover</option>
                <option value="Renault">Renault</option>
            </select>
            <select {...register("class")} required>
                <option value="">Select Class</option>
                <option value="A-Class">A-Class</option>
                <option value="B-Class">B-Class</option>
                <option value="C-Class">C-Class</option>
            </select>
            <input {...register("modelName")} placeholder="Model Name" required />
            <input {...register("modelCode")} placeholder="Model Code" maxLength={10} required />
            <label>Description</label>
            <CKEditor editor={ClassicEditor} onChange={(_, ed) => setValue("description", ed.getData())} />
            <label>Features</label>
            <CKEditor editor={ClassicEditor} onChange={(_, ed) => setValue("features", ed.getData())} />
            <input type="number" {...register("price")} placeholder="Price" required />
            <input type="datetime-local" {...register("dateOfManufacturing")} required />
            <input type="checkbox" {...register("active")} /> Active
            <input type="number" {...register("sortOrder")} placeholder="Sort Order" />
            <input type="file" multiple accept="image/*" onChange={handleImages} />
            <button type="submit">Create Car Model</button>
        </form>
    );
}
