import { pool } from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
const loginUserFromDB = async (playLoad) => {
    const { email, password } = playLoad;
    // check if the user exists in the database or not
    const userData = await pool.query(`
            SELECT * FROM users WHERE email = $1`, [email]);
    if (userData.rows.length === 0) {
        throw new Error(" Invalid credentals");
    }
    const user = userData.rows[0];
    const matchPassword = await bcrypt.compare(password, user.password);
    console.log(matchPassword);
    if (!matchPassword) {
        throw new Error(" Invalid credentals!");
    }
    ;
    // console.log(user);
    // compare the password 
    // generate the token 
    const jwtPayLoad = {
        id: user.id,
        name: user.name,
        email: user.email,
        is_active: user.is_active
    };
    const accessToken = jwt.sign(jwtPayLoad, config.secret, { expiresIn: "1d" });
    return { accessToken };
};
export const authService = {
    loginUserFromDB
};
//# sourceMappingURL=auth.service.js.map