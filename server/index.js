const express = require("express")
const app= express()
const ExcelRoutes = require("./Routes/ExcelRoutes")
const cors = require("cors")


app.use(express.json())
app.use(cors())
app.use("/", ExcelRoutes)



app.listen(8080, () => {
    console.log("Server started on port 8080")
})
