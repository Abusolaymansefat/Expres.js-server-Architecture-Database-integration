import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";


const createUser = async (req: Request, res: Response) => {
      // console.log(req.body);
      // const { name, email, password, age } = req.body;

      try {
            const result = await userService.createUserIntoDB(req.body);

            res.status(201).json({
                  success: true,
                  message: "user created successfully",
                  data: result.rows[0],
            })
      } catch (error: any) {
            res.status(500).json({
                  success: false,
                  message: error.message || "something went wrong",
                  error: error
            })
      }

}

const getAllUsers = async (req: Request, res: Response) => {
      try {
           const result = await userService.getAllUsersFromDB();
            res.status(200).json({
                  success: true,
                  message: "users retrieved successfully",
                  data: result.rows
            });

      } catch (error: any) {
            res.status(500).json({
                  success: false,
                  message: error.message,
                  error: error
            })
      }
}

const getUserByID =async (req: Request, res: Response) => {
      const { id } = req.params;
      try {
            const result = await userService.getUserByIDFromDB(id as string);

            if (result.rows.length === 0) {
                  res.status(404).json({
                        success: false,
                        message: "user not found",
                        data: null
                  });
            }
            res.status(200).json({
                  success: true,
                  message: "user retrieved successfully",
                  data: result.rows[0]
            });
      } catch (error: any) {
            res.status(500).json({
                  success: false,
                  message: error.message,
                  error: error
            })
      }
}

const updateUser =async (req: Request, res: Response) => {
      const { id } = req.params;
      const { name, password, age, is_active } = req.body;


      // console.log("id: ", id);
      // console.log({name, password, age, is_active});


      try {
            const result = await userService.updateUserByIDFromDB(id as string, req.body);

            if (result.rows.length === 0) {
                  res.status(404).json({
                        success: false,
                        message: "User not found",
                        data: {}
                  })
            }
            // console.log(result);

            res.status(200).json({
                  success: true,
                  message: "user updated successfully",
                  data: result.rows[0]
            });

      } catch (error: any) {
            res.status(500).json({
                  success: false,
                  message: error.message,
                  error: error
            })
      }
}

const deleteUser =async (req: Request, res: Response) => {
      const { id } = req.params;
      try {
           const result = await userService.deleteUserByIDFromDB(id as string);

                  if(result.rows.length === 0){
                        res.status(404).json({
                              success: false,
                              message: "user not found",
                              data: {}
                        })
                  }


            res.status(200).json({
                  success: true,
                  message: "user deleted successfully",
                  data: {}
            });

      } catch (error: any) {
            res.status(500).json({
                  success: false,
                  message: error.message,
                  error: error
            })
      }
}

export const userController= {
      createUser,
      getAllUsers,
      getUserByID,
      updateUser,
      deleteUser
};