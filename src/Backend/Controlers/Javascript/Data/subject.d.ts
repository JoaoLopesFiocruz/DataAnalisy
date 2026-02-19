import type { MethodResponse } from '../Global/Types/MethodResponse.js';
import { type Request, type Response } from 'express';
import 'express';
type subject = {
    label: string;
    count: number;
    type: string;
};
declare module 'express-serve-static-core' {
    interface Request {
        subject?: subject;
    }
}
declare class Subject {
    private static readonly api;
    static SubjectCount(): Promise<MethodResponse<{
        name: string;
        value: number;
    }[] | null>>;
    static SubjectCountRoute(req: Request, res: Response): Promise<Response<MethodResponse<{
        name: string;
        value: number;
    }[] | null>>>;
}
export default Subject;
//# sourceMappingURL=subject.d.ts.map