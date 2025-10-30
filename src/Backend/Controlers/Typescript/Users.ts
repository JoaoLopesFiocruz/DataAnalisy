import type { Request, Response } from 'express';
var pool =require("../../DB/Config");
var bcrypt =require("bcryptjs");
interface User {
    Senha: string|null;
    Updatedate: Date|null;
    Createdate: Date|null;
    Name:string|null;
    Email:string|null;
    id:number|null;
}
interface MethodResponse {
    Message:string,
    Data:User[]|null,
    Status:Number,
    Sucess:boolean
}
class Pessoa {
    private static async Search(Col:string,Value:any):Promise<MethodResponse>{
        try{
            const query=await pool.query('RETURN * FROM "public"."Users" WHERE $1 = $2',[Col,Value])
            //query.rows:User[]
            if(query.rows){
                return {
                    Message:"Register found",
                    Data:query.rows,
                    Status:200,
                    Sucess:true
                }
            }
            else{
                return {
                    Message:"Register not found",
                    Data:null,
                    Status:404,
                    Sucess:false
                }
            }
        }
        catch(e){
            return await Pessoa.error(e)
        }
    }
    private static async error(e:any):Promise<MethodResponse>{
        if (e instanceof Error) {
            console.error('Database query error:', e.message);
        } else {
            console.error('Unknown error:', e);
        }
        return {
            Message:"Internal error",
            Data:[],
            Status:501,
            Sucess:false
        }
    }
    private static async GET():Promise<MethodResponse>{
        try{
            const result = await pool.query('SELECT * FROM "public"."Users" LIMIT 100');
            return {
                Message:"query suceffuly",
                Data:result.rows,
                Status:200,
                Sucess:true
            }
        }
        catch(e){   
            return await Pessoa.error(e)
        }
    }
    public static async GetRouter(req: Request, res: Response):Promise<Response>{
        try{
            console.log(Pessoa.GET())
            const result=await Pessoa.GET()
            if(result.Sucess){
                return res.status(200).json(
                    {
                        "status":200,
                        "sucess":true,
                        "data":result,
                        "message":"Get sucefully"
                    }
                )
            }
            else{
                return res.status(200).json(
                    {
                        "status":501,
                        "sucess":false,
                        "data":[],
                        "message":"Internal Error"
                    }
                )
            }
        }
        catch(e){
            return res.status(501).json(
                await Pessoa.error(e)
            )
        }

    }
    private static async Create(Data:User):Promise<MethodResponse>{
        try{
            await pool.query(`INSERT INTO "Users" ("Name", "Senha", "Email") VALUES ($1, $2, $3)`,[Data.Name,Data.Senha,Data.Email])
            return {
                Message:"Crete suceffully",
                Data:null,
                Status:200,
                Sucess:true
            }
        }
        catch(e){   
            return await Pessoa.error(e)
        }
    }
    public static async CreateRouter(req: Request, res: Response):Promise<Response>{
        try{
            //req.body:User
            const {Senha,Name,Email}=req.body
            if(!Senha||!Name||!Email){
                return res.status(400).json({                    
                    Message:"Parameters null",
                    Status:400,
                    Sucess:false
                })
            }
            
        }
        catch(e){
            return res.status(501).json(
                await Pessoa.error(e)
            )
        }
    }
}
module.exports=Pessoa