import pool from "./mysql-client";

export const userModel={
    async getAllUsers(){
        const[rows]= await pool.query("select * from users");
        return rows;
    },


    async getOneUser(id:Number){
        const [rows]= await pool.query("select * from users where user_id = ? ", [id]);
        //console.log(rows)
         return Array.isArray(rows) && rows.length ? rows[0] : undefined;
    },
    async updateUserById(id:number, users:Partial<{user_name:string, name:string, email:string}>){
        const fields=[];
        const values=[];
        if(users.name !== undefined){
            fields.push("name = ?");
            values.push(users.name);
        }
        if(users.user_name !== undefined){
            fields.push("user_name = ?");
            values.push(users.user_name);
        }
        if(users.email !== undefined){
            fields.push("email = ?");
            values.push(users.email);
        }
        if(!fields.length) return undefined;
         await pool.query(`UPDATE categories SET ${fields.join(", ")} WHERE category_id = ?`, [
      ...values,
      id,
    ]);
    return this.getOneUser(id);
    },

    async deleteUserById(id:number){
    const [result]: any = await pool.query(
      "DELETE FROM users WHERE user_id = ?",
      [id]
    );
    return result.affectedRows > 0;
       
       
    },
    async postUsers(users:{name:string, user_name:string, email:number}){
        // const { name } = category;
       const [result]: any = await pool.query(
      "INSERT INTO users (name, user_name, email) VALUES (?, ?, ?)",
      [users.name,]
    );
    
    const newUserId = result.insertId;
    const [newUsers] = await pool.query<any[]>(
    "SELECT * FROM users WHERE user_id = ?",[newUserId]);
    return newUsers[0];
  }
}
