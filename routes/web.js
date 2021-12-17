const home_cont= require('../app/http/controllers/home_cont')
const menu_cont= require('../app/http/controllers/menu_cont')
const cart_cont= require('../app/http/controllers/customers/cart_cont')
const auth_cont= require('../app/http/controllers/auth_cont')
const order_cont= require('../app/http/controllers/customers/order_cont')
const check_cont= require('../app/http/controllers/check_cont')
const admin_order_cont= require('../app/http/controllers/admin/order_cont')
const status_cont =require('../app/http/controllers/admin/status_cont')
const pizza_layer_cont=require('../app/http/controllers/pizza_layer_cont')
const static_cont = require('../app/http/controllers/static_cont')

//middlewares
const guest = require('../app/http/middleware/guest')
const auth = require('../app/http/middleware/auth')
const admin = require('../app/http/middleware/admin')



function initRoutes(app){


    app.get('/', home_cont().index)

    app.get('/menu', menu_cont().menu)
    app.get('/cart', cart_cont().index)
    app.post('/update-cart', cart_cont().update)

    app.get('/login',guest,auth_cont().login)
    app.post('/login', auth_cont().postLogin)

    app.get('/register',guest, auth_cont().register)
    app.post('/register', auth_cont().postRegister)

    app.get('/logout',guest, auth_cont().logout)

    app.get('/checkout',check_cont().index)
    app.get('/custom',pizza_layer_cont().pizzaLayers)

    //static pages
    app.get('/term', auth, static_cont().terms)
    app.get('/faq', auth, static_cont().faq)
    app.get('/contact', auth, static_cont().contact)
    app.get('/cardEx', auth, static_cont().cardexp)



    //customer routes
    app.post('/orders', auth, order_cont().store)
    app.get('/customer/Myorders', auth , order_cont().index)
    app.get('/customer/Myorders/:id', auth , order_cont().show)

    //Admin Route
    app.get('/admin/orders', admin,  admin_order_cont().index)
    app.post('/admin/order/status', admin,  status_cont().update)
}

module.exports = initRoutes