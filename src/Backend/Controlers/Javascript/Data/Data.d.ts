import type { MethodResponse } from '../Global/Types/MethodResponse.js';
import 'express';
import { type Request, type Response } from 'express';
declare class Book {
    private static readonly api;
    private static YearCount;
    static SubjectCountRoute(req: Request, res: Response): Promise<Response<MethodResponse<{
        [language: string]: number;
    } | null>>>;
}
export default Book;
//# sourceMappingURL=Data.d.ts.map