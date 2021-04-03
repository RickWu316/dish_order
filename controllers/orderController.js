const { Foods, Orders, OrderItems } = require('../models')

const public = require('../public/javascript/main.js')


const orderController = {
    postOrder: async (req, res) => {
        // const data = JSON.parse(req.body.orderItem)
        const { orderItem, amount, input } = req.body
        const order = await Orders.create({

            //後面要做表單
            name: input.custName,
            phone: input.custPhone,
            amount,
            status: "已接單"
        })
        for (var i = 0; i < orderItem.length; i++) {
            OrderItems.create({
                OrderId: order.id,
                FoodId: orderItem[i].id,
                price: orderItem[i].price,
                quantity: orderItem[i].quantity,
            })
        }
        res.send({ id: order.id })
    },

}

module.exports = orderController
