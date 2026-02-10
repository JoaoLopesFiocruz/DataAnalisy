import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import type { MethodResponse } from '../Global/Types/MethodResponse.js';
import { type Request, type Response  } from 'express';
import handleError from "../Global/Method/error.js";

import 'express'
import { error } from "console";
type subject = {
    label?:string;
    count?:number;
    type?:string
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
    private static SubjectCount():subject[]{
        this.api.get("/").then((response)=>{}).catch((error)=>{})
    }
}
export default Subject