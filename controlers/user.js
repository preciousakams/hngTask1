module.exports = (req, res) => {
    username = req.session.username
    res.render('user')


}