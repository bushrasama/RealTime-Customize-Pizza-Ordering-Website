function check_cont(){
    return{
        index(req, res) {
            res.render('customer/checkout')
        }
    }
}
module.exports =check_cont