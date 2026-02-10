import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import type { MethodResponse } from '../Global/Types/MethodResponse.js';
import { type Request, type Response  } from 'express';
import handleError from "../Global/Method/error.js";

import 'express'
import { error } from "console";
type author = {
    label?:string;
    count?:number;
    type?:string
}
declare module 'express-serve-static-core' {
  interface Request {
    author?: author
  }
}
class Author{
    private static readonly api=axios.create({
        baseURL:"https://api.treinamento.saudeindigena.icict.fiocruz.br/api/discover/facets/author"
    });
    private static async MostImportants(size:number):Promise<MethodResponse<author[]>|MethodResponse<null>> {
        if(!size){
            return {
                Message:"Size is null",
                Status:400,
                Sucess:false
            }
        }
        
        return Author.api.get("", {   // "" significa "usar a baseURL"
            params: {
                page: 0,
                size: size
            }
        }).then((response)=>{
            const data=response.data._embedded.values.map((element: author) => {
                console.log(element.count)
                if(element.label){
                    return {
                    label:element.label, 
                    count: element.count 
                } as author;
                }
            });
            console.log(data)
            return {
                Message:"query successfully",
                data:data,
                Status:200,
                Sucess:true
            }
        }).catch((e)=>{
            return handleError(e)
        });
    }
    public static async MostImportantsRoute(req:Request,res:Response):Promise<Response<MethodResponse<author[]>>>{
        try{
            const {size} = req.body
            if(!size){
                return res.status(400).json({
                    Message:"Parameters null",
                    Status:400,
                    Sucess:false
                })    
            }
            const query=await Author.MostImportants(size)
            if(query.Sucess){
                return res.status(200).json({
                    Message:"Query successfully",
                    data:query.data,
                    Status:200,
                    Sucess:true
                })
            }else if(query.Status===400){
                return res.status(400).json({
                    Message:"Size is null",
                    Status:400,
                    Sucess:false
                })
                                
            }else{
                throw error
            }
        }catch(e){
            handleError(e)
            return res.status(500).json({
                Message:"Internal Error",
                Status:500,
                Sucess:false
            })
        }
    }
}
export default Author