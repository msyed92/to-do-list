//jshint esversion:6

const express = require("express")
const bodyParser = require("body-parser")
const date = require(`${__dirname}/date.js`)
const app = express()

const workItems = []
const items = []
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get("/", (req, res) => {
    const day = date.getDate()
    res.render("list", { listTitle: day, newListItems: items })
})

app.get("/work", (req, res) => {
    res.render("list", { listTitle: "Work List", newListItems: workItems })
})

app.post("/", (req, res) => {
    console.log(req.body)
    const item = req.body.newItem
    if (req.body.list === "Work") {
        workItems.push(item)
        res.redirect("/work")
    } else {
        items.push(item)
        res.redirect("/")
    }


})

app.get("/about", (req, res) => {
    res.render("about")
})

app.post("/work", (req, res) => {
    const workItem = req.body.newItem
})



app.listen(3000, function () {
    console.log("server started on port 3000")
})