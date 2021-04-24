const express = require("express")
const app = express();
const cors = require("cors")
const pool = require("../db")

//middleware
app.use(cors())
app.use(express.json());


// ROUTES //

//get all info
app.get("/info", async (req: any, res: any) => {
     try {
          const allINfo = await pool.query("SELECT * FROM info")
          res.json(allINfo.rows)
     } catch (err) {
          console.error(err.message)
     }
})

app.listen(5000);
console.log("Server on port 5000")