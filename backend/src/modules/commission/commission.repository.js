import { db } from "../../libs/knex.js";

export const commissionRepository = {
    async getSalesWithSalesmen() {
        return db("sales as s")
            .join("salesmen as sm", "s.salesman_id", "sm.id")
            .select(
                "s.id",
                "sm.id as salesman_id",
                "sm.name as salesman_name",
                "sm.previous_year_sales",
                "s.class",
                "s.brand",
                "s.quantity",
                "s.price",
            )
            .orderBy("sm.name", "asc").orderByRaw(`
        CASE 
            WHEN s.class = 'A' THEN 1 
            WHEN s.class = 'B' THEN 2 
            WHEN s.class = 'C' THEN 3 
        END
    `);
    },
};
