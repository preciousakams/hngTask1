const User = require('../database/models/user');
const bcrypt = require('bcrypt')

module.exports = (req, res) => {

    const { email, password } = req.body

    console.log(req.body)

    //find the user
    User.findOne({ email }, (error, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    req.session
                    req.session.userid = user._id
                    req.session.username = user.username

                    res.redirect('/user')
                } else {

                    registrationErrors = "Password mismatch"
                    req.flash('registrationErrors', registrationErrors)
                    res.redirect('/login')
                }

            })

        } else {
            registrationErrors = " user does not exist create user to login"
            req.flash('registrationErrors', registrationErrors)
            return res.redirect('/')

        }

    })




}