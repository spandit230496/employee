const express = require("express")
const app= express()
const ExcelRoutes = require("./Routes/ExcelRoutes")
const cors = require("cors")


app.use(express.json())
app.use(cors())
app.use("/", ExcelRoutes)



app.listen(5000, () => {
    console.log("Server started on port 5000")
})
