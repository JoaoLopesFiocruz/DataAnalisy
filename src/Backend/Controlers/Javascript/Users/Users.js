"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response = require("express");
var pool = require("../../../DB/Config");
var bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
function isOnlyDigits(value) {
    return /^\d+$/.test(value);
}
class User {
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
            const result = await pool.query('SELECT id,"Name","Email" FROM "public"."Users" LIMIT 100');
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
                    "message": "Get Successfully"
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
            await pool.query(`INSERT INTO "Users" ("Name", "Password", "Email") VALUES ($1, $2, $3)`, [Data.Name, Data.Password, Data.Email]);
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
            const { Password, Name, Email } = req.body;
            if (!Password || !Name || !Email) {
                return res.status(400).json({
                    "Message": "Parameters null",
                    "Status": 400,
                    "Sucess": false
                });
            }
            const response = await pool.query(`SELECT id FROM "public"."Users" WHERE "Email" = $1;`, [Email]);
            if (response.rows.length) {
                return res.status(400).json({
                    "Message": "Email already logged",
                    "Status": 400,
                    "Sucess": false
                });
            }
            else {
                const hash = await bcrypt.hash(Password, 12);
                const creation = await User.Create({
                    Password: hash,
                    Name: Name,
                    Email: Email
                });
                if (creation.Status) {
                    return res.status(200).json({
                        Message: "Create Successfully",
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
    static async GetByID(req, res) {
        try {
            const { id } = req.params;
            const response = await pool.query(`SELECT id,"Name","Email" FROM "public"."Users" WHERE id = $1;`, [id]);
            if (response.rows.length) {
                return res.status(200).json({
                    Message: "Query Successfully",
                    Data: response.rows,
                    Status: 200,
                    Sucess: true
                });
            }
            else {
                console.log(response);
                return res.json({
                    Message: "usuário não encontrado",
                    Status: 404,
                    Sucess: false
                });
            }
        }
        catch (e) {
            console.error(e);
            return res.json({
                Message: "Erro interno",
                Status: 500,
                Sucess: false
            });
        }
    }
    static async Update(id, User) {
        let response = await pool.query(`SELECT "Password","Name","Email","Createdate" FROM "public"."Users" WHERE id = $1;`, [id]);
        if (!response.rows.length) {
            return {
                Message: "id not found",
                Status: 404,
                Sucess: false
            };
        }
        const passwordMatch = await bcrypt.compare(User.Password, response.rows[0].Password);
        if (!passwordMatch) {
            return {
                Message: `Password Incorrect`,
                Status: 401,
                Sucess: false
            };
        }
        else if (response.rows?.[0]) {
            if (!User.Name) {
                '';
                User.Name = response.rows[0].Name;
            }
            if (!User.Email) {
                User.Email = response.rows[0].Email;
            }
            if (response.rows[0].Createdate) {
                User.Createdate = response.rows[0].Createdate;
            }
        }
        const result = await pool.query('UPDATE "Users" SET "Name" = $1,"Email"=$2, "Createdate"=$3 WHERE id = $4 RETURNING "Name"', [User.Name, User.Email, User.Createdate, id]);
        return {
            Message: `Update Successfully ${result.rows[0].Name}`,
            Status: 200,
            Sucess: true
        };
    }
    static async UpdateRouter(req, res) {
        try {
            const { id } = req.params;
            const user = req.body;
            if (!user || !id || !user.Password) {
                console.log(user, id);
                return res.status(400).json({
                    Message: "Parameters null",
                    Status: 400,
                    Sucess: false
                });
            }
            else if (isNaN(Number(id))) {
                return res.status(400).json({
                    Message: "Id not numeric",
                    Status: 400,
                    Sucess: false
                });
            }
            let Retorno = await User.Update(parseInt(id, 10), user);
            if (!Retorno.Sucess) {
                if (Retorno.Status == 401) {
                    return res.status(401).json({
                        Message: "Password Incorrect",
                        Status: 401,
                        Sucess: false
                    });
                }
                else if (Retorno.Status == 404) {
                    return res.status(404).json({
                        Message: "User not found",
                        Status: 404,
                        Sucess: false
                    });
                }
            }
            return res.status(200).json({
                Message: Retorno.Message,
                Status: 200,
                Sucess: true
            });
        }
        catch (e) {
            console.error(e);
            return res.status(501).json({
                Message: "Erro interno",
                Status: 501,
                Sucess: false
            });
        }
    }
    static async Delete(id, Password) {
        let response = await pool.query(`SELECT "Password" FROM "public"."Users" WHERE id = $1;`, [id]);
        if (!response.rows.length) {
            return {
                Message: "User not found",
                Status: 404,
                Sucess: false
            };
        }
        try {
            const passwordMatch = await bcrypt.compare(Password, response.rows[0].Password);
            if (!passwordMatch) {
                return {
                    Message: "Password Incorrect",
                    Status: 401,
                    Sucess: false
                };
            }
            response = await pool.query(`DELETE FROM public."Users" WHERE id = $1;`, [id]);
            return {
                Message: "Delete Successfully",
                Sucess: true,
                Status: 200
            };
        }
        catch (e) {
            return await User.error(e);
        }
    }
    static async DeleteRouter(req, res) {
        const { id } = req.params;
        const { Password } = req.body;
        if (!id) {
            return res.status(400).json({
                Message: "Parameters null",
                Status: 400,
                Sucess: false
            });
        }
        else if (isNaN(Number(id))) {
            return res.status(400).json({
                Message: "Id not numeric",
                Status: 400,
                Sucess: false
            });
        }
        let response = await User.Delete(parseInt(id, 10), Password);
        if (!response.Sucess) {
            if (response.Status == 404) {
                return res.status(404).json({
                    Message: "User not found",
                    Status: 404,
                    Sucess: false
                });
            }
            else if (response.Status == 501) {
                return res.status(501).json({
                    Message: "Internal error in database",
                    Status: 501,
                    Sucess: false
                });
            }
            else if (response.Status == 401) {
                return res.status(401).json({
                    Message: "Password Incorrect",
                    Status: 401,
                    Sucess: false
                });
            }
        }
        return res.status(200).json({
            Message: "Deleted Successfully",
            Status: 200,
            Sucess: true
        });
    }
    static generateToken(user) {
        const token = jwt.sign({
            id: user.id,
            Email: user.Email,
            Generated: new Date()
        }, process.env.JWT_SECRET, { expiresIn: '2h' });
        return token;
    }
    static async Login(req, res) {
        const { Email, Password } = req.body;
        console.log("legal");
        let response = await pool.query(`SELECT "Password",id,"Email" FROM "public"."Users" WHERE "Email" = $1;`, [Email]);
        if (!response.rows.length) {
            return res.status(404).json({
                Message: "Email not founded",
                Status: 404,
                Sucess: false
            });
        }
        let comparation = bcrypt.compare(Password, response.rows[0].Password);
        if (!comparation) {
            return res.status(401).json({
                Message: "Password incorrect",
                Status: 401,
                Sucess: false
            });
        }
        let token = User.generateToken(response.rows[0]);
        return res.status(200).json({
            Message: "Login Successfully",
            Data: token,
            Status: 200,
            Sucess: true
        });
    }
}
module.exports = User;
//# sourceMappingURL=Users.js.map