const pool=require("./database")

const resultData=async ()=>{
   await pool.connect();
  const result=await  pool.query(`select * from user where id=$1`,[2])
 // const insertResult= await pool.query(`insert into user(name)values($1) RETURNING *`,["nanni"])
 // console.log(result.rows);
  console.log(insertResult.rows)
  pool.end();
      
}
resultData()


