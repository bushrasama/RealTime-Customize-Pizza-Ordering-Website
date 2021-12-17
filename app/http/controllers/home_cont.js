//using factory functions
function home_cont(){
    return{
        index(req, res) {
            res.render('home')
        }
    }
}

module.exports = home_cont