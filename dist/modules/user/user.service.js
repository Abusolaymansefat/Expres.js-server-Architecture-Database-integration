import { pool } from "../../db";
const createUserIntoDB = async (playLoad) => {
    const { name, email, password, age } = playLoad;
    const result = await pool.query(`
            INSERT INTO users(name, email, password, age) VALUES($1, $2, $3, $4) RETURNING *
            `, [name, email, password, age]);
    return result;
    // console.log(result);
};
const getAllUsersFromDB = async () => {
    const result = await pool.query(`
                  SELECT * FROM users`);
    return result;
};
const getUserByIDFromDB = async (id) => {
    const result = await pool.query(`
                  SELECT * FROM users WHERE id = $1`, [id]);
    return result;
};
const updateUserByIDFromDB = async (id, playLoad) => {
    const { name, password, age, is_active } = playLoad;
    const result = await pool.query(`
            UPDATE users
            SET name = COALESCE($1, name),
            password=COALESCE($2, password), 
            age=COALESCE($3, age),
            is_active= COALESCE($4, is_active) 
               
            WHERE id = $5 RETURNING *`, [name, password, age, is_active, id]);
    return result;
};
const deleteUserByIDFromDB = async (id) => {
    const result = await pool.query(`
                  DELETE FROM users WHERE id =$1 RETURNING *`, [id]);
    return result;
};
export const userService = {
    createUserIntoDB,
    getAllUsersFromDB,
    getUserByIDFromDB,
    updateUserByIDFromDB,
    deleteUserByIDFromDB
};
//# sourceMappingURL=user.service.js.map