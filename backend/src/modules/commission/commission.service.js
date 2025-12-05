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

        const result = {};

        for (const row of rows) {
            const rules = COMMISSION_RULES[row.brand];
            if (!rules) continue;

            const classKey = row.class;
            const qty = Number(row.quantity);
            const price = Number(row.price);

            const percent = rules.percent[classKey];
            const baseCommission = qty * price * (percent / 100);

            const fixedCommission = price > rules.fixed.threshold ? qty * rules.fixed.amount : 0;

            let extraCommission = 0;
            if (classKey === "A" && Number(row.previous_year_sales) > 500000) {
                extraCommission = qty * price * (2 / 100);
            }

            const totalCommission = baseCommission + fixedCommission + extraCommission;

            // GROUPING STRUCTURE
            if (!result[row.salesman_id]) {
                result[row.salesman_id] = {
                    salesmanId: row.salesman_id,
                    salesmanName: row.salesman_name,
                    previousYearSales: row.previous_year_sales,
                    classes: {
                        A: [],
                        B: [],
                        C: [],
                    },
                };
            }

            result[row.salesman_id].classes[classKey].push({
                brand: row.brand,
                quantity: qty,
                unitPrice: price,
                baseCommission,
                fixedCommission,
                extraCommission,
                totalCommission,
            });
        }

        return Object.values(result);
    },

    async generateCsv() {
        const data = await this.generateReport();
        if (!data.length) return "";

        const header = [
            "Salesman Name",
            "Previous Year Sales",
            "Class",
            "Brand",
            "Quantity",
            "Unit Price",
            "Base Commission",
            "Fixed Commission",
            "Extra Commission",
            "Total Commission",
        ].join(",");

        const rows = [];

        for (const salesman of data) {
            const { salesmanName, previousYearSales, classes } = salesman;

            for (const classKey of ["A", "B", "C"]) {
                for (const entry of classes[classKey]) {
                    rows.push(
                        [
                            `"${salesmanName}"`,
                            previousYearSales,
                            classKey,
                            `"${entry.brand}"`,
                            entry.quantity,
                            entry.unitPrice,
                            entry.baseCommission.toFixed(2),
                            entry.fixedCommission.toFixed(2),
                            entry.extraCommission.toFixed(2),
                            entry.totalCommission.toFixed(2),
                        ].join(","),
                    );
                }
            }
        }

        return [header, ...rows].join("\n");
    },
};
