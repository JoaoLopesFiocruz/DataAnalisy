import type { Request, Response, NextFunction } from 'express';
import type { MethodResponse } from "../Global/Types/MethodResponse.js";
import 'express';
interface User {
    Password?: string;
    Updatedate?: Date;
    Createdate?: Date;
    Name?: string;
    Email?: string;
    id?: number;
}
declare module 'express-serve-static-core' {
    interface Request {
        user?: User;
    }
}
declare class User {
    private static Create;
    static CreateRouter(req: Request, res: Response): Promise<Response<MethodResponse<null>>>;
    static GetByID(req: Request, res: Response): Promise<Response<MethodResponse<User>>>;
    private static Update;
    static UpdateRouter(req: Request, res: Response): Promise<Response<MethodResponse<null>>>;
    static Delete(id: number, Password: string): Promise<MethodResponse<null>>;
    static DeleteRouter(req: Request, res: Response): Promise<Response<MethodResponse<null>>>;
    private static generateToken;
    static Login(req: Request, res: Response): Promise<Response>;
    static verifyLogin(req: Request, res: Response, next: NextFunction): void;
    static correctLogin(req: Request, res: Response, next: NextFunction): Promise<Response<MethodResponse<null>> | void>;
    static PasswordChangeRoute(req: Request, res: Response): Promise<Response<MethodResponse<null>>>;
}
export default User;
//# sourceMappingURL=Users.d.ts.map