const User = require('../database/models/user')
const path = require('path')

module.exports = (req, res) => {

    const u = User.find({})
    console.log(u)

    const { username, email, password, password2 } = req.body



    if (usernamename == " " || email == " " || password == " " || password2 == " ") {
        errors.push({ msg: "Please fill in all fields" });
        const registrationErrors = "fields cannot be empty"
        req.flash('registrationErrors', registrationErrors)
    }
    User.findOne({ email: email }).then(
        user => {
            if (user) {
                registrationErrors = " user alreay exists"
                req.flash('registrationErrors', registrationErrors)
                res.redirect('/')
            } else {
                if (password != password2) {
                    const registrationErrors = " password do not match"
                    console.log(registrationErrors)
                    req.flash('registrationErrors', registrationErrors)
                    return res.redirect('/')
                }
                if (password.length < 6 || password2.length < 6) {
                    const registrationErrors = "password must be more than 6 characters"
                    console.log(registrationErrors)
                    req.flash('registrationErrors', registrationErrors)
                    return res.redirect('/')
                } else User.create(req.body, (error, user) => {
                    if (error) {
                        console.log(error)
                        registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
                        req.flash('registrationErrors', registrationErrors)
                        req.flash('data', req.body)
                        return res.redirect('/')
                    } else {

                        res.redirect('/login')

                    }
                })

            }
        }

    )




}