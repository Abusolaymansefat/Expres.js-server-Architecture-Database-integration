import { pool } from "../../db";
import type { IUser } from "./user.interface";


const createUserIntoDB = async(playLoad: IUser) => {
      const {name, email, password, age} = playLoad;
      const result = await pool.query(`
            INSERT INTO users(name, email, password, age) VALUES($1, $2, $3, $4) RETURNING *
            `, [name, email, password, age]);
            return result;
            // console.log(result);
}

export const userService = {
      createUserIntoDB,
}
