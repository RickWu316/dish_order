const { Foods, Orders, OrderItems } = require('../models')

const public = require('../public/javascript/main.js')
const moment = require('moment')

const orderController = {
    postOrder: async (req, res) => {
        //這個function是吃dom傳來的xml
        try {
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
        } catch (err) {
            res.status(500).render("", { status: 'error', error_messages: '伺服器錯誤請稍後', err }, console.log(err))
        }
    },
    getOrders: async (req, res) => {
        //讓顧客可以看到未取貨的單
        try {
            const phone = req.query.phone
            let orders

            if (phone) {
                const orderList = await Orders.findAll({
                    where:
                    {
                        phone,
                        status: ["已接單", "已完成"]
                    }
                    ,
                    include: [{
                        model: OrderItems,
                        include: [Foods]
                    }],
                    order: ['createdAt'],
                })
                orders = orderList.map(item => ({
                    ...item.toJSON(),
                    "createdTime": moment(item.dataValues.createdAt).format("YYYY-MM-DD HH:mm:ss"),
                    "updatedTime": moment(item.dataValues.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                }))

            }
            res.render("orders", { orders, orderTag: "orderTag" })
        } catch (err) {
            res.status(500).render("", { status: 'error', error_messages: '伺服器錯誤請稍後', err }, console.log(err))
        }

    }

}

module.exports = orderController
