import express, { Request, Response } from "express";
class main{
    static Test(req: Request, res: Response):Response{
        return res.json("Everything is runing");
    }
}
export default main