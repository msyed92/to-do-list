//jshint esversion:6

const express = require("express")
const bodyParser = require("body-parser")

const app = express()
let workItems = []
let items = []
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get("/", (req, res) => {
    let today = new Date()
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    let day = today.toLocaleDateString("en-US", options)

    res.render("list", { listTitle: day, newListItems: items })
})

app.get("/work", (req, res) => {
    res.render("list", { listTitle: "Work List", newListItems: workItems })
})

app.post("/", (req, res) => {
    console.log(req.body)
    let item = req.body.newItem
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
    let workItem = req.body.newItem
})



app.listen(3000, function() {
    console.log("server started on port 3000")
})