import type { Request, Response } from 'express';
import response = require('express');
var pool =require("../../DB/Config");
var bcrypt =require("bcryptjs");
interface User {
    Senha?: string;
    Updatedate?: Date;
    Createdate?: Date;
    Name?:string;
    Email?:string;
    id?:number;
}
interface MethodResponse {
    Message:string,
    Data?:User[],
    Status:Number,
    Sucess:boolean
}
class User {
    private static async Search(Col:string,Value:any):Promise<MethodResponse>{
        try{
            const query=await pool.query('SELECT * FROM "public"."users" WHERE $1 = $2',[Col,Value])
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
                    Status:404,
                    Sucess:false
                }
            }
        }
        catch(e){
            return await User.error(e)
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
            return await User.error(e)
        }
    }
    public static async GetRouter(req: Request, res: Response):Promise<Response>{
        try{
            console.log(User.GET())
            const result=await User.GET()
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
                await User.error(e)
            )
        }

    }
    private static async Create(Data:User):Promise<MethodResponse>{
        try{
            await pool.query(`INSERT INTO "Users" ("Name", "Senha", "Email") VALUES ($1, $2, $3)`,[Data.Name,Data.Senha,Data.Email])
            return {
                Message:"Crete suceffully",
                Status:200,
                Sucess:true
            }
        }
        catch(e){   
            return await User.error(e)
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
            const resultado=await User.Search("email",Email)
            if (resultado.Sucess){
                return res.status(400).json({
                    Message:"Email already logged",
                    Status:400,
                    Sucess:false
                })
            }
            else if(resultado.Status=501){
                throw new Error("Erro no banco de dados")
            }
            else{
                const hash = await bcrypt.hash(Senha, 12);
                const creation=await User.Create({
                    Senha: hash,
                    Name:Name,
                    Email:Email
                })
                if(creation.Status){
                    return res.status(200).json({
                        Message:"Create suceffuly",
                        Status:200,
                        Sucess:true
                    })
                }
                else{
                    throw new Error("Error in the database")
                }
            }
        }
        catch(e){
            return res.status(501).json(
                await User.error(e)
            )
        }
        
    }
    public static async GetByID(req: Request, res: Response):Promise<Response>{
        try{
            const {id}= req.body
            const response= await User.Search("id",id)
            if(response.Status==200){
                return res.json(
                    {
                            Message:"Consulta Realizada com Seucesso",
                            Data:response.Data,
                            Status:200,
                            Sucess:true
                    }
                )
            }
            else{
                return res.json(
                    {
                        Message:"usuário não encontrado",
                        Status:404,
                        Sucess:false
                    }
                )
            }
        }
        catch(e){
            console.error(e)
            return res.json(
                {
                    Message:"Erro interno",
                    Status:500,
                    Sucess:false
                }
            )
        }
    }
}
module.exports=User