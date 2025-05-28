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

  async updateProductById(
    id: number,
    product: Partial<{ product_name: string; product_price: number; category_id: number }>
  ) {
    const fields = [];
    const values = [];
    if (product.product_name !== undefined) {
      fields.push("product_name = ?");
      values.push(product.product_name);
    }
    if (product.product_price !== undefined) {
      fields.push("product_price = ?");
      values.push(product.product_price);
    }
    if (product.category_id !== undefined) {
      fields.push("category_id = ?");
      values.push(product.category_id);
    }
    if (!fields.length) return undefined;
    await pool.query(`UPDATE products SET ${fields.join(", ")} WHERE product_id = ?`, [
      ...values,
      id,
    ]);
    return this.getProductByIdName(id);
  },
  async deleteProductById(id: number) {
    const [result]: any = await pool.query(
      "DELETE FROM products WHERE product_id = ?",
      [id]
    );
    return result.affectedRows > 0;
  },

   async create(product: { product_name: string; price: number; category_id: number }) {
    const [result]: any = await pool.query(
      "INSERT INTO products (product_name, price, category_id) VALUES (?, ?, ?)",
      [product.product_name, product.price, product.category_id]
    );
    return { id: result.insertId, ...product };
  }
};