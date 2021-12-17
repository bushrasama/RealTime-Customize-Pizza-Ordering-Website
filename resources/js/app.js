import axios from 'axios'
import swal from 'sweetalert';
import { initAdmin } from './admin'
import moment from 'moment'

let addToCart = document.querySelectorAll(".cart")
let cartCounter = document.querySelector('#cart_count')

function updateCart(pizza)
{
    axios.post('/update-cart',pizza).then(res =>{
        console.log(res)
        cartCounter.innerText = res.data.totalQty
        swal({
            title: "Item added to cart!",
            text: "One more pizza pleasee",
            icon: "success",
            button:"checkout",
            timer:3000
        })
        })
}
   // button listner add to cart
    addToCart.forEach((btn)=>{
        btn.addEventListener('click',(e)  =>{
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
        console.log(pizza)
        })
    })

    const alertMsg = document.querySelector('#orderNotification')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}

initAdmin()

//change order status

let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('small')

function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status) => {
        let dataProp = status.dataset.status
        if(stepCompleted) {
            status.classList.add('step-completed')
        }
        if(dataProp === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
            if(status.nextElementSibling) {
            status.nextElementSibling.classList.add('current')
            }
        }
    })

}

updateStatus(order);

let socket = io()

// Join
if(order) {
    socket.emit('join', `order_${order._id}`)
}
let adminAreaPath = window.location.pathname
if(adminAreaPath.includes('admin')) {
    initAdmin(socket)
    socket.emit('join', 'adminRoom')
}


socket.on('orderUpdated', (data) => {
    const updatedOrder = { ...order }
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
    updateStatus(updatedOrder)
    
})








