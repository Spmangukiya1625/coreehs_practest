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
            );
    },
};
