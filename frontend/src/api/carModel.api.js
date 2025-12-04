import { http } from "./http";

// All Car Model CRUD
export const carModelApi = {
    list: (params) => http.get("/car-models", { params }),

    create: (formData) =>
        http.post("/car-models", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }),

    getOne: (id) => http.get(`/car-models/${id}`),

    update: (id, data) => http.put(`/car-models/${id}`, data),

    remove: (id) => http.delete(`/car-models/${id}`),
};
