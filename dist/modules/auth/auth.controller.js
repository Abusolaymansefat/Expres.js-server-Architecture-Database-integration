import { authService } from "./auth.service";
const loginUser = async (req, res) => {
    try {
        const result = await authService.loginUserFromDB(req.body);
        res.status(200).json({
            success: true,
            message: "users retrieved successfully",
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }
};
export const authController = {
    loginUser
};
//# sourceMappingURL=auth.controller.js.map