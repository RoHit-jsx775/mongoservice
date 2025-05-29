import pool from "./mysql-client";

export const categoryModel={
    async getAllCategories(){
        const[rows]= await pool.query("select * from categories");
        return rows;
    },

    async getOneCategory(id:Number){
        const [rows]= await pool.query("select * from categories where category_id = ? ", [id]);
        //console.log(rows)
         return Array.isArray(rows) && rows.length ? rows[0] : undefined;
    },
    async updateCategoryById(id:number, category:Partial<{name:string}>){
        const fields=[];
        const values=[];
        if(category.name !== undefined){
            fields.push("name = ?");
            values.push(category.name);
        }
        if(!fields.length) return undefined;
         await pool.query(`UPDATE categories SET ${fields.join(", ")} WHERE category_id = ?`, [
      ...values,
      id,
    ]);
    return this.getOneCategory(id);
    },

    async deleteCategoryById(id:number){
    const [result]: any = await pool.query(
      "DELETE FROM categories WHERE category_id = ?",
      [id]
    );
    return result.affectedRows > 0;
       
       
    },
    async postCategory(category:{name:string}){
        // const { name } = category;
       const [result]: any = await pool.query(
      "INSERT INTO categories (name) VALUES (?)",
      [category.name,]
    );
    
    const newcategoryId = result.insertId;
    const [newCategory] = await pool.query<any[]>(
    "SELECT * FROM categories WHERE id = ?",[newcategoryId]);
  }
}
