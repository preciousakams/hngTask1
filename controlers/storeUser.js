const User = require('../database/models/user')
const path = require('path')

module.exports = (req, res) => {

    const { username, email, password, password2 } = req.body;

    if (password != password2) {
        const registrationErrors = " password do not match"
        console.log(registrationErrors)
        req.flash('registrationErrors', registrationErrors)
        return res.redirect('/')

    }
    if (User.findOne({ email: email })) {
        const registrationErrors = " user alreay exists"
        req.flash('registrationErrors', registrationErrors)
        res.redirect('/')
    } else {
        User.create(req.body, (error, user) => {
            if (error) {
                console.log(error)
                registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
                req.flash('registrationErrors', registrationErrors)
                req.flash('data', req.body)
                return res.redirect('/')
            } else {

                res.redirect('/login')
                req.session
            }
        })

    }

}