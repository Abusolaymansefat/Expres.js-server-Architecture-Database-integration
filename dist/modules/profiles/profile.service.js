import { pool } from "../../db";
const createProfileIntoDB = async (playLoad) => {
    // console.log(playLoad);
    const { user_id, bio, address, phone, gender } = playLoad;
    const user = await pool.query(`
            SELECT * FROM users WHERE id = $1`, [user_id]);
    // console.log(user);
    if (user.rows.length === 0) {
        throw new Error("User not found with the provided user id");
    }
    const result = await pool.query(`
            INSERT INTO profiles (user_id, bio, address, phone, gender) VALUES($1, $2, $3, $4, $5) RETURNING *`, [user_id, bio, address, phone, gender]);
    return result;
};
export const profileService = {
    createProfileIntoDB
};
//# sourceMappingURL=profile.service.js.map