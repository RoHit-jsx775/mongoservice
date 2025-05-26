import pool from "../sql-models/mysql-client";

export const SqlProductModel = {
  async getallProduct() {
    const [rows] = await pool.query("SELECT * FROM products");
    return rows;
  },
  async getProductByIdName(id: number) {
    const [rows] = await pool.query(`SELECT * FROM products where product_id = ?`, [id]);
    return Array.isArray(rows) && rows.length ? rows[0] : undefined;
  },
};
