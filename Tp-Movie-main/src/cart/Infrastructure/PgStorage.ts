import { AsyncStorage } from "../types.js";
import { pool } from "../../db.js";

export class PgStorage implements AsyncStorage {
    async setValue(key: string, value: number): Promise<void> {
        const client = await pool.connect();
        try {
            const checkRes = await client.query("SELECT price FROM cart_storage WHERE name = $1", [key]);

            if (checkRes.rows.length > 0) {
                const currentPrice = parseFloat(checkRes.rows[0].price);
                const newPrice = currentPrice + value;
                await client.query("UPDATE cart_storage SET price = $1 WHERE name = $2", [newPrice, key]);
            } else {
                await client.query("INSERT INTO cart_storage (name, price) VALUES ($1, $2)", [key, value]);
            }
        } finally {
            client.release();
        }
    }

    async restore(key: string): Promise<void> {
        await pool.query("DELETE FROM cart_storage WHERE name = $1", [key]);
    }

    async reset(): Promise<void> {
        await pool.query("DELETE FROM cart_storage");
    }

    async getStorage(): Promise<Record<string, number>> {
        const res = await pool.query("SELECT name, price FROM cart_storage");
        const storage: Record<string, number> = {};
        for (const row of res.rows) {
            storage[row.name] = parseFloat(row.price);
        }
        return storage;
    }
}
