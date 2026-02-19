import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import type { MethodResponse } from '../Global/Types/MethodResponse.js';
import { type Request, type Response  } from 'express';
import handleError from "../Global/Method/error.js";

import 'express'
import { error } from "console";
type subject = {
    label:string;
    count:number;
    type:string
}
declare module 'express-serve-static-core' {
  interface Request {
    subject?: subject
  }
}
    class Subject{
        private static readonly api=axios.create({
            baseURL:"https://api.treinamento.saudeindigena.icict.fiocruz.br/api/discover/facets/subject"
        });
        private static async SubjectCount(): Promise<
      MethodResponse<{ name: string; value: number }[]|null>
    > {
      try {
        const response = await this.api.get("");
        const Count: Record<string, number> = {};
        const Items = response.data?._embedded?.values ?? [];

        const normalize = (text: string) =>
          text
            .toUpperCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        Items.forEach((item: subject) => {
          const key = normalize(item.label);
          Count[key] = (Count[key] ?? 0) + item.count;
        });

        const sorted = Object.entries(Count)
          .sort((a, b) => a[1] - b[1])
          .map(([name, value]) => ({ name, value }));

        return {
          Message: "Query successfully",
          data: sorted,
          Status: 200,
          Sucess: true,
        };
      } catch (error) {
        return handleError(error);
      }
    }

    public static async SubjectCountRoute(req:Request,res:Response):Promise<Response<MethodResponse<{ name: string; value: number }[]|null>>>{
      const CountResponse:MethodResponse<{ name: string; value: number }[]|null>= await Subject.SubjectCount()
      return res.status(CountResponse.Status).json(CountResponse)
    }
}
export default Subject