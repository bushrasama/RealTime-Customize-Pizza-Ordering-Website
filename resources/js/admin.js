import axios from 'axios'
import moment from 'moment'

export function initAdmin(){
    const orderTableBody = document.querySelector('#orderTableBody')
    let orders = []
    let markup

    axios.get('/admin/orders', {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        },
    }).then(res =>{
        orders = res.data
        markup = generateMarkup(orders)
        orderTableBody.innerHTML = markup
    }).catch(err => {
        console.log(err)
    })
    function renderItems(items) {
        let parsedItems = Object.values(items)
        return parsedItems.map((menuItem) => {
            return `
                <p>${ menuItem.item.name } - ${ menuItem.qty } pcs </p>
            `
        }).join('')
    }

    function generateMarkup(orders) {
        return orders.map(order => {
            return `
            <tr>
            <td style="border: 1rem;padding-left: 1rem; padding-right: 1rem; padding-top: 0.25rem; padding-bottom: 0.25rem;  text-decoration: rgb(114, 158, 114); ">
                <p>${ order._id }</p>
                <div>${ renderItems(order.items) }</div>
            </td>
            <td style="border: 1rem;padding-left: 1rem; padding-right: 1rem; padding-top: 0.25rem; padding-bottom: 0.25rem;">${ order.customerId.name }</td>
            <td style="border: 1rem;padding-left: 1rem; padding-right: 1rem; padding-top: 0.25rem; padding-bottom: 0.25rem;">${ order.address }</td>
            <td style="border: 1rem;padding-left: 1rem; padding-right: 1rem; padding-top: 0.25rem; padding-bottom: 0.25rem;">
                <div style="display: inline-block; position: relative; width: 16rem;">
                    <form action="/admin/order/status" method="POST">
                        <input type="hidden" name="orderId" value="${ order._id }">
                        <select name="status" onchange="this.form.submit()"
                        style="display: block; appearance: none; width: 100%;background-color: white; border: 2px; --tw-border-opacity: 1;
                        border-color: rgba(156, 163, 175, var(--tw-border-opacity)); padding-left: 1rem;
                        padding-right: 1rem; padding-top: 0.25rem; padding-bottom: 0.25rem; padding-right: 2rem; border-radius: 0.25rem; line-height: 1.25;
                        --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
                        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow); ">
                            
                            <option value="order_placed"
                                ${ order.status === 'order_placed' ? 'selected' : '' }>
                                Placed</option>
                            <option value="confirmed" ${ order.status === 'confirmed' ? 'selected' : '' }>
                                Confirmed</option>
                            <option value="prepared" ${ order.status === 'prepared' ? 'selected' : '' }>
                                Prepared</option>
                            <option value="delivered" ${ order.status === 'delivered' ? 'selected' : '' }>
                                Delivered
                            </option>
                            <option value="completed" ${ order.status === 'completed' ? 'selected' : '' }>
                                Completed
                            </option>
                        </select>
                    </form>
                    <div
                    style="	pointer-events: none; position: absolute; top: 0px; bottom: 0px; right: 0px;display: flex; align-items: center;
                    padding-left: 0.5rem;padding-right: 0.5rem; --tw-text-opacity: 1; color: rgba(55, 65, 81, var(--tw-text-opacity));">
                        <svg style="fill: currentColor; height: 1rem; width: 1rem;" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20">
                            <path
                                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
            </td>
            <td style="border: 1rem;padding-left: 1rem; padding-right: 1rem; padding-top: 0.25rem; padding-bottom: 0.25rem;">
                ${ moment(order.createdAt).format('hh:mm A') }
            </td>
            <td style="border: 1rem;padding-left: 1rem; padding-right: 1rem; padding-top: 0.25rem; padding-bottom: 0.25rem;">
                ${ order.paymentStatus ? 'paid' : 'Not paid' }
            </td>
        </tr>
        `
        }).join('')
    }

}