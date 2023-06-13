const Pool=require("pg").Pool

const pool= new Pool({
    host:"localhost",
    port:5432,
    user:"postgres",
    password:"7736",
    database:"local_db"
})


module.exports=pool