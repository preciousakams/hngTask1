module.exports = (req, res) => {

    res.render('login', {
        errors: req.flash('registrationErrors')
            //data: req.flash('data')[0]

    })


}