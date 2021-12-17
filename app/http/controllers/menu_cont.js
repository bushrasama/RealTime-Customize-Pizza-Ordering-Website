const Menu=require('../../models/menu')
//using factory functions
function menu_cont(){
    return{
        async menu(req, res) {
                const pizzas= await Menu.find()
                return res.render('menu', { pizzas: pizzas })
                
            
        }
    }
}

module.exports = menu_cont