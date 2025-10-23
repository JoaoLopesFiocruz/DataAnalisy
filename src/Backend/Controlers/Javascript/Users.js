"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
var router = express.Router();
var pool = require("../../DB/Config");
var bcrypt = require("bcryptjs");
class Pessoa {
    static async GET() {
        try {
            const result = await pool.query('SELECT * FROM public.users LIMIT 100');
            return result.rows;
        }
        catch (e) {
            if (e instanceof Error) {
                console.error('Database query error:', e.message);
            }
            else {
                console.error('Unknown error:', e);
            }
        }
    }
    static async GetRouter(req, res) {
        try {
            const result = await Pessoa.GET();
            return res.status(200).json({
                "status": 200,
                "sucess": true,
                "data": result,
                "message": "Get sucefully"
            });
        }
        catch (e) {
            if (e instanceof Error) {
                console.error('Database query error:', e.message);
            }
            else {
                console.error('Unknown error:', e);
            }
            return res.status(500).json({
                "status": 500,
                "sucess": false,
                "message": "Internal Error"
            });
        }
    }
}