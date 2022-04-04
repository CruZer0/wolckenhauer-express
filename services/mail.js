const nodemailer = require("nodemailer")
const ejs = require("ejs")
require("dotenv").config()

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_SERVER,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
})

const contactMail = async(content) => {
    return new Promise((resolve, reject) => {
        ejs.renderFile("./mailTemplates/contactMail.ejs", {mailContent: content, adminMail: process.env.ADMIN_MAIL}, (err, template) => {
            if(err){
                console.log(err)
                reject(err)
            }
            else{
                transporter.sendMail({
                    from: content.mail,
                    to: process.env.ADMIN_MAIL,
                    subject: content.subject,
                    html: template, 
                }, (err, info) => {
                    if(err){
                        console.log(err)
                        reject(err)
                    }
                    else{
                        resolve(info)
                    }
                })
            }

        })

    })
        
}

const confirmationMail = async(content) => {
    return new Promise((resolve, reject) => {
        ejs.renderFile("./mailTemplates/confirmationMail.ejs", {mailContent: content}, (err, template) => {
            if(err){
                reject(err)
            }
            else{
                transporter.sendMail({
                    from: process.env.ADMIN_MAIL,
                    to: content.mail,
                    subject: content.subject,
                    html: template
                }, (err, info) => {
                    if(err){
                        console.log(err)
                        reject(err)
                    }
                    else{
                        resolve(info)
                    }
                })
            }

        })

    })

}

module.exports = {confirmationMail, contactMail}