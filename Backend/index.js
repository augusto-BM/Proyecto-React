import express from "express";
import cors from 'cors'
import { adminRouter } from "./Routes/AdminRoute.js";
import { EmployeeRouter } from "./Routes/EmployeeRoute.js";

import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express() 
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', "DELETE"],
    credentials: true
}))
app.use(express.json())

app.use('/auth', adminRouter)
app.use('/employee', EmployeeRouter)

// UNA CLASE ESTATICA QUE ES PUBLICA PARA TENER ACCESO (Para la listar la limagen segun su ruta)
app.use(express.static('Public'))

//==========================  VALIDAR LOGUEAEDO DE ROLES ===========================
app.use(cookieParser())

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(token) {
        Jwt.verify(token, "jwt_secret_key", (err ,decoded) => {
            if(err) return res.json({Status: false, Error: "Token incorrecto"})
            req.id = decoded.id;
            req.role = decoded.role;
            next()
        })
    } else {
        return res.json({Status: false, Error: "No autenticado"})
    }
}
app.get('/verify',verifyUser, (req, res)=> {
    return res.json({Status: true, role: req.role, id: req.id})
} )
// =================================================================================

app.listen(3000, () => {
    console.log("Servidor esta corriendo en el puerto 3000")
})