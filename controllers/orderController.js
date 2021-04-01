const { foods, orders, orderItems } = require('../models')

const public = require('../public/javascript/main.js')


const orderController = {
    postOrder: async (req, res) => {
        const { orderItem, amount } = req.body
        const order = await orders.create({

            //後面要做表單
            // name: "吳先生",
            // phone: "test",
            amount,
            status: 0
        })
        for (var i = 0; i < orderItem.length; i++) {
            orderItems.create({
                OrderId: order.id,
                ProductId: orderItem[i].id,
                price: orderItem[i].price,
                quantity: orderItem[i].quantity,
            })
        }

    },
}

module.exports = orderController
