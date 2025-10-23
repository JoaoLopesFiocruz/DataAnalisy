import type { Request, Response } from 'express';
const express = require('express');
var router = express.Router();
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
class Pessoa {
    private static async GET():Promise<void|User[]>{
        try{
            const result = await pool.query('SELECT * FROM public.users LIMIT 100');
            return result.rows
        }
        catch(e){
            if (e instanceof Error) {
                console.error('Database query error:', e.message);
            } else {
                console.error('Unknown error:', e);
            }
        }
    }
    public static async GetRouter(req: Request, res: Response):Promise<Response>{
        try{
            const result=await Pessoa.GET()
            return res.status(200).json(
                {
                    "status":200,
                    "sucess":true,
                    "data":result,
                    "message":"Get sucefully"
                }
            )
        }
        catch(e){
            if (e instanceof Error) {
                console.error('Database query error:', e.message);
            } else {
                console.error('Unknown error:', e);
            }
            return res.status(500).json(
                {
                    "status":500,
                    "sucess":false,
                    "message":"Internal Error"
                }
            )
        }

    }
}