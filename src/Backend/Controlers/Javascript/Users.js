"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pool = require("../../DB/Config");
var bcrypt = require("bcryptjs");
class User {
    static async Search(Col, Value) {
        try {
            const query = await pool.query('SELECT * FROM "public"."users" WHERE $1 = $2', [Col, Value]);
            //query.rows:User[]
            console.log(query.rows.length)
            if (query.rows.length) {
                return {
                    Message: "Register found",
                    Data: query.rows,
                    Status: 200,
                    Sucess: true
                };
            }
            else {
                return {
                    Message: "Register not found",
                    Status: 404,
                    Sucess: false
                };
            }
        }
        catch (e) {
            await User.error(e);
        }
    }
    static async error(e) {
        if (e instanceof Error) {
            console.error('Database query error:', e.message);
        }
        else {
            console.error('Unknown error:', e);
        }
        return {
            Message: "Internal error",
            Data: [],
            Status: 501,
            Sucess: false
        };
    }
    static async GET() {
        try {
            const result = await pool.query('SELECT * FROM "public"."users" LIMIT 100');
            return {
                Message: "query suceffuly",
                Data: result.rows,
                Status: 200,
                Sucess: true
            };
        }
        catch (e) {
            return await User.error(e);
        }
    }
    static async GetRouter(req, res) {
        try {
            console.log(User.GET());
            const result = await User.GET();
            if (result.Sucess) {
                return res.status(200).json({
                    "status": 200,
                    "sucess": true,
                    "data": result,
                    "message": "Get sucefully"
                });
            }
            else {
                return res.status(200).json({
                    "status": 501,
                    "sucess": false,
                    "data": [],
                    "message": "Internal Error"
                });
            }
        }
        catch (e) {
            return res.status(501).json(await User.error(e));
        }
    }
    static async Create(Data) {
        try {
            await pool.query(`INSERT INTO "users" ("name", "senha", "email") VALUES ($1, $2, $3)`, [Data.Name, Data.Senha, Data.Email]);
            return {
                Message: "Crete suceffully",
                Status: 200,
                Sucess: true
            };
        }
        catch (e) {
            return await User.error(e);
        }
    }
    static async CreateRouter(req, res) {
        try {
            //req.body:User
            const { Senha, Name, Email } = req.body;
            if (!Senha || !Name || !Email) {
                return res.status(400).json({
                    Message: "Parameters null",
                    Status: 400,
                    Sucess: false
                });
            }
            const resultado = await User.Search("email", Email);
            if (resultado.Sucess) {
                console.log(resultado)
                return res.status(400).json({
                    Message: "Email already logged",
                    Status: 400,
                    Sucess: false
                });
            }
            
            else if (resultado.Message == "Internal error") {
                console.log(resultado)
                throw new Error("Erro no banco de dados");
            }
            else {
                const hash = await bcrypt.hash(Senha, 12);
                const creation = await User.Create({
                    Senha: hash,
                    Name: Name,
                    Email: Email
                });
                
                
                if (creation.Sucess) {
                    return res.status(200).json({
                        Message: "Create suceffuly",
                        Status: 200,
                        Sucess: true
                    });
                }
                else {
                    throw new Error("Error in the database");
                }
            }
        }
        catch (e) {
            return res.status(501).json(await User.error(e));
        }
    }
}
module.exports = User;
//# sourceMappingURL=Users.js.map