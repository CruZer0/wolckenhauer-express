const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
require("dotenv").config();
const {confirmationMail, contactMail} = require("./services/mail.js")

app.use(cors())
app.use(bodyParser.json())


const port = () => {
    if(process.env.NODE_ENV === "production"){
        return 80
    }
    else{
        return 9000
    }
}
console.log(port())
app.post("/contact", async(req, res, next) => {
    var postData = {
        name: req.body.name,
        mail: req.body.mail,
        subject: req.body.subject,
        message: req.body.message
    }
    await contactMail(postData)
        .then(info => {
            confirmationMail(postData)
            .then(info => {
                res.sendStatus(200)
            })
            .catch(err => { 
                res.sendStatus(500)
            })
        })
        .catch(err => {
            res.sendStatus(500)
        })
})

app.listen(port())