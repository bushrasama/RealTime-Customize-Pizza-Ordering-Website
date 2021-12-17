function static_cont(){
    return{
        cardexp(req, res) {
            res.render('cardExpand')
        },

        terms(req,res){
            res.render('terms')
        },

        faq(req,res){
            res.render('faq')
        },
        contact(req,res){
            res.render('contact')
        },
    }
}

module.exports = static_cont