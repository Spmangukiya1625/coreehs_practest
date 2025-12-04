/**
 * Seed Sales Table
 */
exports.seed = async function (knex) {
    await knex("sales").del();

    const rows = [];

    // Salesman 1
    rows.push({ salesman_id: 1, class: "A", brand: "Audi", quantity: 1, price: 26000 });
    rows.push({ salesman_id: 1, class: "A", brand: "Jaguar", quantity: 3, price: 36000 });
    rows.push({ salesman_id: 1, class: "A", brand: "Land Rover", quantity: 0, price: 0 });
    rows.push({ salesman_id: 1, class: "A", brand: "Renault", quantity: 6, price: 21000 });

    rows.push({ salesman_id: 1, class: "B", brand: "Audi", quantity: 2, price: 27000 });
    rows.push({ salesman_id: 1, class: "B", brand: "Jaguar", quantity: 4, price: 38000 });
    rows.push({ salesman_id: 1, class: "B", brand: "Land Rover", quantity: 2, price: 33000 });
    rows.push({ salesman_id: 1, class: "B", brand: "Renault", quantity: 2, price: 22000 });

    rows.push({ salesman_id: 1, class: "C", brand: "Audi", quantity: 3, price: 24000 });
    rows.push({ salesman_id: 1, class: "C", brand: "Jaguar", quantity: 6, price: 35500 });
    rows.push({ salesman_id: 1, class: "C", brand: "Land Rover", quantity: 1, price: 31000 });
    rows.push({ salesman_id: 1, class: "C", brand: "Renault", quantity: 1, price: 19000 });

    // Salesman 2
    rows.push({ salesman_id: 2, class: "A", brand: "Audi", quantity: 0, price: 0 });
    rows.push({ salesman_id: 2, class: "A", brand: "Jaguar", quantity: 5, price: 37000 });
    rows.push({ salesman_id: 2, class: "A", brand: "Land Rover", quantity: 5, price: 33000 });
    rows.push({ salesman_id: 2, class: "A", brand: "Renault", quantity: 3, price: 21000 });

    rows.push({ salesman_id: 2, class: "B", brand: "Audi", quantity: 0, price: 0 });
    rows.push({ salesman_id: 2, class: "B", brand: "Jaguar", quantity: 4, price: 36000 });
    rows.push({ salesman_id: 2, class: "B", brand: "Land Rover", quantity: 2, price: 30000 });
    rows.push({ salesman_id: 2, class: "B", brand: "Renault", quantity: 2, price: 20500 });

    rows.push({ salesman_id: 2, class: "C", brand: "Audi", quantity: 0, price: 0 });
    rows.push({ salesman_id: 2, class: "C", brand: "Jaguar", quantity: 2, price: 34000 });
    rows.push({ salesman_id: 2, class: "C", brand: "Land Rover", quantity: 1, price: 31000 });
    rows.push({ salesman_id: 2, class: "C", brand: "Renault", quantity: 1, price: 19500 });

    // Salesman 3
    rows.push({ salesman_id: 3, class: "A", brand: "Audi", quantity: 4, price: 26000 });
    rows.push({ salesman_id: 3, class: "A", brand: "Jaguar", quantity: 2, price: 36500 });
    rows.push({ salesman_id: 3, class: "A", brand: "Land Rover", quantity: 1, price: 31500 });
    rows.push({ salesman_id: 3, class: "A", brand: "Renault", quantity: 6, price: 21500 });

    rows.push({ salesman_id: 3, class: "B", brand: "Audi", quantity: 2, price: 25000 });
    rows.push({ salesman_id: 3, class: "B", brand: "Jaguar", quantity: 7, price: 37500 });
    rows.push({ salesman_id: 3, class: "B", brand: "Land Rover", quantity: 2, price: 30500 });
    rows.push({ salesman_id: 3, class: "B", brand: "Renault", quantity: 3, price: 20000 });

    rows.push({ salesman_id: 3, class: "C", brand: "Audi", quantity: 0, price: 0 });
    rows.push({ salesman_id: 3, class: "C", brand: "Jaguar", quantity: 1, price: 33500 });
    rows.push({ salesman_id: 3, class: "C", brand: "Land Rover", quantity: 3, price: 31000 });
    rows.push({ salesman_id: 3, class: "C", brand: "Renault", quantity: 1, price: 19000 });

    await knex("sales").insert(rows);
};
