const express = require("express")
const app= express()
const pool= require("./dbclient")

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.listen(8080)
