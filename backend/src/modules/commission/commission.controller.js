import { commissionService } from "./commission.service.js";
import { ok } from "../../core/ApiResponse.js";

export const commissionController = {
    async list(req, res, next) {
        try {
            const data = await commissionService.generateReport();

            // basic filtering/sorting from query
            let filtered = data;

            if (req.query.salesmanName) {
                const s = req.query.salesmanName.toLowerCase();
                filtered = filtered.filter((r) => r.salesmanName.toLowerCase().includes(s));
            }
            if (req.query.brand) {
                filtered = filtered.filter((r) => r.brand === req.query.brand);
            }
            if (req.query.class) {
                filtered = filtered.filter((r) => r.class === req.query.class);
            }
            if (req.query.sortBy === "totalCommission") {
                filtered = filtered.sort((a, b) => b.totalCommission - a.totalCommission);
            }

            res.json(ok(filtered, "Commission report"));
        } catch (err) {
            next(err);
        }
    },

    async exportCsv(req, res, next) {
        try {
            const csv = await commissionService.generateCsv();
            res.setHeader("Content-Type", "text/csv");
            res.setHeader("Content-Disposition", 'attachment; filename="commission_report.csv"');
            res.send(csv);
        } catch (err) {
            next(err);
        }
    },
};
