import { commissionRepository } from "./commission.repository.js";

const COMMISSION_RULES = {
    Audi: { fixed: { threshold: 25000, amount: 800 }, percent: { A: 8, B: 6, C: 4 } },
    Jaguar: { fixed: { threshold: 35000, amount: 750 }, percent: { A: 6, B: 5, C: 3 } },
    "Land Rover": { fixed: { threshold: 30000, amount: 850 }, percent: { A: 7, B: 5, C: 4 } },
    Renault: { fixed: { threshold: 20000, amount: 400 }, percent: { A: 5, B: 3, C: 2 } },
};

export const commissionService = {
    async generateReport() {
        const rows = await commissionRepository.getSalesWithSalesmen();

        const result = [];

        for (const row of rows) {
            const rules = COMMISSION_RULES[row.brand];
            if (!rules) continue;

            const classKey = row.class; // 'A' | 'B' | 'C'
            const qty = Number(row.quantity);
            const price = Number(row.price);

            const percent = rules.percent[classKey];
            const baseCommission = qty * price * (percent / 100);

            // fixed if per-unit price > threshold (could be interpreted different, but documented)
            const fixedCommission = price > rules.fixed.threshold ? qty * rules.fixed.amount : 0;

            let extraCommission = 0;
            if (classKey === "A" && Number(row.previous_year_sales) > 500000) {
                extraCommission = qty * price * (2 / 100);
            }

            const totalCommission = baseCommission + fixedCommission + extraCommission;

            result.push({
                salesmanId: row.salesman_id,
                salesmanName: row.salesman_name,
                class: classKey,
                brand: row.brand,
                quantity: qty,
                unitPrice: price,
                baseCommission,
                fixedCommission,
                extraCommission,
                totalCommission,
            });
        }

        return result;
    },

    async generateCsv() {
        const data = await this.generateReport();
        if (!data.length) return "";

        const header = Object.keys(data[0]).join(",");
        const lines = data.map((row) =>
            Object.values(row)
                .map((v) => (typeof v === "string" ? `"${v.replace(/"/g, '""')}"` : v))
                .join(","),
        );
        return [header, ...lines].join("\n");
    },
};
