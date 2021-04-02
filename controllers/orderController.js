const { Foods, Orders, OrderItems } = require('../models')

const public = require('../public/javascript/main.js')


const orderController = {
    postOrder: async (req, res) => {
        // const data = JSON.parse(req.body.orderItem)
        const { orderItem, amount } = req.body
        const order = await Orders.create({

            //後面要做表單
            // name: "吳先生",
            // phone: "test",
            amount,
            status: 0
        })
        for (var i = 0; i < orderItem.length; i++) {
            OrderItems.create({
                OrderId: order.id,
                FoodId: orderItem[i].id,
                price: orderItem[i].price,
                quantity: orderItem[i].quantity,
            })
        }
        // res.json({ success: 1 })
        res.send('123')

        // foodList = await public.getFoods()
        // res.render("index", { foods: foodList, id: order.id })
    },
    postOrder: async (req, res) => {
        // const data = JSON.parse(req.body.orderItem)
        const { orderItem, amount } = req.body
        const order = await Orders.create({

            //後面要做表單
            // name: "吳先生",
            // phone: "test",
            amount,
            status: 0
        })
        for (var i = 0; i < orderItem.length; i++) {
            OrderItems.create({
                OrderId: order.id,
                FoodId: orderItem[i].id,
                price: orderItem[i].price,
                quantity: orderItem[i].quantity,
            })
        }
        // res.json({ success: 1 })
        res.send({ id: order.id })

        // foodList = await public.getFoods()
        // res.render("index", { foods: foodList, id: order.id })
    },

}

module.exports = orderController
