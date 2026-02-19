import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import type { MethodResponse } from '../Global/Types/MethodResponse.js';
import 'express'
import { type Request, type Response  } from 'express';
class book{
    private static readonly api=axios.create({
        baseURL:"https://api.treinamento.saudeindigena.icict.fiocruz.br/api/discover/search/objects?sort=score,DESC&page=0&query=dc.type%3A%22Book%22%20NOT%20%22Book%20Chapter%22&embed=thumbnail&embed=item%2Fthumbnail"
    });
    private static async YearCount():Promise<{[language: string]: number;}|null>{
        return new Promise((resolve, reject) => {
            let result:{[language: string]: number;}={}
            book.api.get("").then((response)=>{
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
                console.log(result)
                resolve(result)
            })
        })
    }
    public static async SubjectCountRoute(req:Request,res:Response):Promise<Response<MethodResponse<{[language: string]: number;}|null>>>{
        const CountResponse:{[language: string]: number;}|null= await book.YearCount()
        return res.status(200).json(CountResponse)
    }
}
export default book