import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import type { MethodResponse } from '../Global/Types/MethodResponse.js';
import 'express'
import { type Request, type Response  } from 'express';
class Book{
    private static readonly api=axios.create({
        baseURL:"https://api.treinamento.saudeindigena.icict.fiocruz.br/api/discover/search"
    });
    private static async YearCount():Promise<MethodResponse<{[language: string]: number;}>>{
        return new Promise((resolve, reject) => {
            var result:{[language: string]: number;}={}
            Book.api.get("/objects?sort=score,DESC&page=0&query=dc.type%3A%22Book%22%20NOT%20%22Book%20Chapter%22&embed=thumbnail&embed=item%2Fthumbnail").then((response)=>{
                response.data._embedded.searchResult._embedded.objects.map((i:any)=>{
                    if(i._embedded){
                        i._embedded.indexableObject.metadata["dc.type"].map((j:{language:string})=>{
                            if(j!==undefined && j.language&&result[j.language]){
                                //@ts-ignore
                                result[j.language]+=1
                            }else if(j && j.language&&!result[j.language]){
                                result[j.language]=1
                            }
                        })
                    }
                })
                resolve({
                    Message:"Query successfuly",
                    data:result,
                    Status:200,
                    Sucess:false
                })
            }).catch(()=>{
                resolve({
                    Message:"Internal Error",
                    Status:501,
                    Sucess:false
                })
            })  
        })
    }
    public static async SubjectCountRoute(req:Request,res:Response):Promise<Response<MethodResponse<{[language: string]: number;}>>>{
        const CountResponse:MethodResponse<{[language: string]: number;}>= await Book.YearCount()
        return res.status(200).json(CountResponse)
    }
}
export default Book