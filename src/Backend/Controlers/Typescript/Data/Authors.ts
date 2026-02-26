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
    private static async MostImportants(size?:number|null):Promise<MethodResponse<author[]>|MethodResponse<null>> {
        if(!size){
            size=null
        }
        return Author.api.get("", {   // "" significa "usar a baseURL"
            params: {
                page: 0,
                size: size
            }
        }).then((response)=>{
            const data=response.data._embedded.values.map((element: author) => {
                if(element.label){
                    return {
                    label:element.label, 
                    count: element.count 
                } as author;
                }
            });
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
    private static async Nativepercent():Promise<
    MethodResponse<{Native:Number,NotNative:Number}>
    > {
        try{
            const AuthorsCount=await Author.MostImportants()
            const datareturned={Native:0,NotNative:0}
            const NativeAuthors=AuthorsCount.data?.map((element: unknown) => {
                
                if (
                (element as any).label
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toUpperCase()
                    .includes("INDIGENA")||(element as any).label
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toUpperCase()
                    .includes("INDIGENAS")
                ) {
                return element;
                } else {
                return undefined;
                }
            }).filter((element) => element !== undefined)
            var SumNativeAuthors=0
            NativeAuthors?.forEach((element:any) => {
                SumNativeAuthors+=element.count
            });
            datareturned.Native=SumNativeAuthors
            var SumAuthors=0
            AuthorsCount.data?.forEach((element:any) => {
                SumAuthors+=element.count
            });
            datareturned.NotNative=SumAuthors-SumNativeAuthors
            return {
                Message:"Search successfully",
                data:datareturned,
                Status:200,
                Sucess:true
            }
        }catch(e){
            return {
                Message:"Internal error",
                Status:501,
                Sucess:false
            }
        }
    }
    public static async NativePercentRouter(req:Request,res:Response):Promise<Response<MethodResponse<{Native:Number,NotNative:Number}>>>{
        const query:MethodResponse<{Native:Number,NotNative:Number}>=await Author.Nativepercent()
        return res.status(200).json(query)
    }
}
export default Author