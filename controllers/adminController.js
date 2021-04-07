const { Foods, Orders, OrderItems } = require('../models')

const public = require('../public/javascript/main.js')
const imgur = require('imgur-node-api')
const moment = require('moment')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID


const adminController = {
    getFoods: async (req, res) => {
        try {
            foodList = await public.getFoods()
            res.status(200).render("admin/foods", { foods: foodList, adminFoodTag: "FoodTag" })

        } catch (err) {
            res.status(500).render("", { status: 'error', error_messages: '伺服器錯誤請稍後', err }, console.log(err))
        }
    },
    editFood: async (req, res) => {
        try {
            let id = req.params.id
            if (id) {
                const food = await Foods.findByPk(id)
                res.render("admin/create", { food: food.toJSON() })
            } else {
                res.render("admin/create")
            }
        } catch (err) {
            res.status(500).render("", { status: 'error', error_messages: '伺服器錯誤請稍後', err }, console.log(err))
        }
    },
    putFood: async (req, res) => {
        try {
            let id = req.params.id
            const food = await Foods.findByPk(id)
            const { file } = req // equal to const file = req.file
            if (file) {
                imgur.setClientID(IMGUR_CLIENT_ID)
                imgur.upload(file.path, (err, img) => {
                    req.body.image = img.data.link
                    food.update(req.body).then(res.redirect('./'))
                })
            } else {
                return food.update(req.body).then(res.redirect('./'))
            }

        } catch (err) {
            res.status(500).render("", { status: 'error', error_messages: '伺服器錯誤請稍後', err }, console.log(err))
        }
    },
    postFood: (req, res) => {
        try {
            const { file } = req // equal to const file = req.file
            if (file) {
                imgur.setClientID(IMGUR_CLIENT_ID)
                imgur.upload(file.path, (err, img) => {
                    req.body.image = img.data.link
                    Foods.create(req.body).then(res.redirect('./'))
                })
            } else {
                return Foods.create(req.body).then(res.redirect('./'))
            }
        } catch (err) {
            res.status(500).render("", { status: 'error', error_messages: '伺服器錯誤請稍後', err }, console.log(err))
        }

    },
    deleteFood: async (req, res) => {
        try {
            let id = req.params.id
            const food = await Foods.findByPk(id)
            await food.destroy()
            res.redirect('./')
        } catch (err) {
            res.status(500).render("", { status: 'error', error_messages: '伺服器錯誤請稍後', err }, console.log(err))
        }
    },

    getOrders: async (req, res) => {
        // const status = req.query.status
        // let status = null
        try {
            let orderList
            if (req.query.status) {
                status = req.query.status
                orderList = await Orders.findAll({
                    where: { status },
                    include: [{
                        model: OrderItems,
                        include: [Foods]
                    }],
                    order: ['createdAt'],
                })
            } else {
                orderList = await Orders.findAll({
                    include: [{
                        model: OrderItems,
                        include: [Foods]
                    }],
                    order: ['createdAt'],
                })

            }
            const orders = orderList.map(item => ({
                ...item.toJSON(),
                "createdTime": moment(item.dataValues.createdAt).format("YYYY-MM-DD HH:mm:ss"),
                "updatedTime": moment(item.dataValues.updatedAt).format("YYYY-MM-DD HH:mm:ss")
            }))
            res.render("admin/orders", { orders, adminOrderTag: "orderTag" })
        } catch (err) {
            res.status(500).render("", { status: 'error', error_messages: '伺服器錯誤請稍後', err }, console.log(err))
        }

    },
    putOrder: async (req, res) => {
        try {
            let id = req.params.id
            let status = req.body.status
            let order = await Orders.findByPk(id)

            await order.update({ status })
            res.redirect("back")

        } catch (err) {
            res.status(500).render("", { status: 'error', error_messages: '伺服器錯誤請稍後', err }, console.log(err))
        }

    }

}

module.exports = adminController
