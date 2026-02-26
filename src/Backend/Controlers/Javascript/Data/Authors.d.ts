import type { MethodResponse } from '../Global/Types/MethodResponse.js';
import { type Request, type Response } from 'express';
import 'express';
type author = {
    label?: string;
    count?: number;
    type?: string;
};
declare module 'express-serve-static-core' {
    interface Request {
        author?: author;
    }
}
declare class Author {
    private static readonly api;
    private static MostImportants;
    static MostImportantsRoute(req: Request, res: Response): Promise<Response<MethodResponse<author[]>>>;
    private static Nativepercent;
    static NativePercentRouter(req: Request, res: Response): Promise<Response<MethodResponse<{
        Native: Number;
        NotNative: Number;
    }>>>;
}
export default Author;
//# sourceMappingURL=Authors.d.ts.map