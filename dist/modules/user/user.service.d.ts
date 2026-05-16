import type { IUser } from "./user.interface";
export declare const userService: {
    createUserIntoDB: (playLoad: IUser) => Promise<import("pg").QueryResult<any>>;
    getAllUsersFromDB: () => Promise<import("pg").QueryResult<any>>;
    getUserByIDFromDB: (id: string) => Promise<import("pg").QueryResult<any>>;
    updateUserByIDFromDB: (id: string, playLoad: IUser) => Promise<import("pg").QueryResult<any>>;
    deleteUserByIDFromDB: (id: string) => Promise<import("pg").QueryResult<any>>;
};
//# sourceMappingURL=user.service.d.ts.map