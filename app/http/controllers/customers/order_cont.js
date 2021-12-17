const Order=require('../../../models/order')
const moment=require('moment')

function order_cont(){
    return{
        store(req,res){
            //validate request
            const{ name, checkoutemail, phone, address, postcode, town }=req.body
            //if(!name || !phone || !checkoutemail || !phone || !address|| !postcode|| !town ){
              //  req.flash('error', 'All fields are requierd')
               // return res.redirect('customer/checkout')
            //}
            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                name: name,
                email:checkoutemail,
                phone: phone,
                address:address,
                post_code:postcode,
                city:town
            })
            console.log(req.body)
            order.save().then(result =>{
                req.flash('success', 'Order Placed Successfully')
                delete req.session.cart
                return res.redirect('/customer/Myorders')

            }).catch(err => {
                req.flash('error','Something went wrong')
                return res.redirect('/cart')
            })
        },
        async index(req,res){
            const orders =await Order.find({ customerId: req.user._id },
                null,{sort: {'createdAt': -1}})
                res.header('Cache-Control', 'no-store')
            res.render('customer/Myorders', { orders:orders , moment:moment })
        },

        async show(req, res){
            const order = await Order.findById(req.params.id)
            if(req.user._id.toString === order.customerId.toString){
                return res.render('customer/singleOrder', { order })
            }
            return res.redirect('/')
            
        }
    }
}
module.exports =order_cont