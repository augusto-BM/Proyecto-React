import mysql from 'mysql'

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hindi_crud_role_mysql"
})

con.connect(function(err) {
    if(err) {
        console.log("Error en la conexion")
    } else {
        console.log("Conectado")
    }
})

export default con;