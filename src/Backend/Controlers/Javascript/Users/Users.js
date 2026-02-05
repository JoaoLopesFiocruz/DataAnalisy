import error from '../Global/Method/error.js';
import pool from "../../../DB/Config.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import 'express';
class User {
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
            return await error(e);
        }
    }
    static async CreateRouter(req, res) {
        try {
            const { Password, Name, Email, PasswordConfirm } = req.body;
            if (!Password || !Name || !Email || !PasswordConfirm) {
                return res.status(400).json({
                    Message: "Parameters null",
                    Status: 400,
                    Sucess: false
                });
            }
            const response = await pool.query(`SELECT id FROM "public"."Users" WHERE "Email" = $1;`, [Email]);
            if (response.rows.length) {
                return res.status(400).json({
                    Message: "Email already logged",
                    Status: 400,
                    Sucess: false
                });
            }
            else if (Password !== PasswordConfirm) {
                return res.status(400).json({
                    Message: "Passwords don't match",
                    Status: 400,
                    Sucess: false
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
            return res.status(501).json(await error(e));
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
                return res.json({
                    Message: "usuário não encontrado",
                    Status: 404,
                    Sucess: false
                });
            }
        }
        catch (e) {
            return res.status(501).json(await error(e));
        }
    }
    static async Update(id, User) {
        let response = await pool.query(`SELECT "Password","Name","Email","Createdate" FROM "public"."Users" WHERE id = $1;`, [id]);
        if (!response.rows.length || !User.Password) { // the User.password is only to garant the password isn't null
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
            return res.status(501).json(await error(e));
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
            return await error(e);
        }
    }
    static async DeleteRouter(req, res) {
        try {
            const { id } = req.params;
            const { Password } = req.body;
            if (!id || !Password) {
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
        catch (e) {
            return res.status(501).json(await error(e));
        }
    }
    static generateToken(user) {
        if (process.env.JWT_SECRET) {
            const token = jwt.sign({
                id: user.id,
                Email: user.Email,
                Generated: new Date()
            }, process.env.JWT_SECRET, { expiresIn: '2h' });
            return token;
        }
        else {
            return "";
        }
    }
    static async Login(req, res) {
        try {
            const { Email, Password } = req.body;
            if (!Email || !Password) {
                return res.status(400).json({
                    Message: "Parameters null",
                    Status: 400,
                    Sucess: false
                });
            }
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
            let token = User.generateToken({
                id: response.rows[0].id,
                Email: response.rows[0].Email
            });
            return res.status(200).json({
                Message: "Login Successfully",
                Data: token,
                Status: 200,
                Sucess: true
            });
        }
        catch (e) {
            return res.status(501).json(await error(e));
        }
    }
    static verifyLogin(req, res, next) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({
                Message: "Token não informado",
                Status: 401,
                Sucess: false
            });
            return;
        }
        const [, token] = authHeader.split(" ");
        if (!token) {
            console.log("entrou");
            res.status(401).json({
                Message: "Token inválido",
                Status: 401,
                Sucess: false
            });
            return;
        }
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET não definido");
        }
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
            next();
        }
        catch (err) {
            res.status(401).json({
                Message: "Invalid Token",
                Status: 401,
                Sucess: false
            });
        }
    }
    static async correctLogin(req, res, next) {
        const { id } = req.params;
        let response = await pool.query(`SELECT "Email" FROM "public"."Users" WHERE id = $1;`, [id]);
        if (response.rows.length) {
            if (response.rows[0].Email != req.user?.Email || id != req.user?.id) {
                return res.status(401).json({
                    Message: "Invalid login",
                    Status: 401,
                    Sucess: false
                });
            }
        }
        else {
            return res.status(404).json({
                Message: "User not found",
                Status: 404,
                Sucess: false
            });
        }
        next();
    }
    static async PasswordChangeRoute(req, res) {
        try {
            const { NewPassword, NewPasswordConfirm } = req.body;
            const id = req.user?.id;
            if (!id || !NewPassword || !NewPasswordConfirm) {
                return res.status(400).json({
                    Message: "Parameters null",
                    Status: 400,
                    Sucess: false
                });
            }
            else if (NewPassword !== NewPasswordConfirm) {
                return res.status(400).json({
                    Message: "Passwords don't match",
                    Status: 400,
                    Sucess: false
                });
            }
            const response = await pool.query(`SELECT id FROM "public"."Users" WHERE id = $1;`, [id]);
            if (!response.rows.length) {
                return res.status(404).json({
                    Message: "User not found",
                    Status: 404,
                    Sucess: false
                });
            }
            const NewPasswordhash = await bcrypt.hash(NewPassword, 12);
            const result = await pool.query('UPDATE "Users" SET "Password"=$1 WHERE id = $2 RETURNING "Name"', [NewPasswordhash, id]);
            return res.status(200).json({
                Message: `${result.rows[0].Name}'s password Updated Successfully`,
                Status: 200,
                Sucess: true
            });
        }
        catch (e) {
            return res.status(501).json(await error(e));
        }
    }
}
export default User;
//# sourceMappingURL=Users.js.map