import { http } from "./http";

export const commissionApi = {
    getReport: (params) => http.get("/reports/commission", { params }),

    exportCsv: () => http.get("/reports/commission/export", { responseType: "blob" }),
};
