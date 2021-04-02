const { Foods, Orders, OrderItems } = require('../models')

const public = require('../public/javascript/main.js')
const fs = require('fs')
const imgur = require('imgur-node-api')
const orderController = require('./orderController')
const { nextTick } = require('process')
const moment = require('moment')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID


const adminController = {
    getFoods: async (req, res) => {
        foodList = await public.getFoods()

        res.render("admin/foods", { foods: foodList })
    },
    editFood: async (req, res) => {
        let id = req.params.id
        if (id) {
            const food = await Foods.findByPk(id)
            res.render("admin/create", { food: food.toJSON() })
        } else {
            res.render("admin/create")
        }
    },
    putFood: async (req, res) => {
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

        // food.update(req.body)
        // res.redirect('/admin/foods')
    },
    postFood: (req, res) => {
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


    },
    deleteFood: async (req, res) => {
        let id = req.params.id
        const food = await Foods.findByPk(id)
        await food.destroy()
        res.redirect('./')
    },

    getOrders: async (req, res) => {
        // const status = req.query.status
        let status = 0
        if (req.query.status) {
            status = req.query.status
            console.log(status)
        }
        // if (!status) { status = 0 }
        // console.log(status)

        const orderList = await Orders.findAll({
            where: { status },
            include: [{
                model: OrderItems,
                include: [Foods]
            }],
            order: ['createdAt'],
        })
        const orders = orderList.map(item => ({
            ...item.toJSON(),
            "createdTime": moment(item.dataValues.createdAt).format("YYYY-MM-DD HH:mm:ss"),
            "updatedTime": moment(item.dataValues.updatedAt).format("YYYY-MM-DD HH:mm:ss")
        }))
        // console.log(typeof orders[0].id)
        res.render("admin/orders", { orders })

    },
    putOrder: async (req, res) => {
        let id = req.params.id
        let status = req.body.status
        let order = await Orders.findByPk(id)

        await order.update({ status })
        res.redirect("back")

    }

}

module.exports = adminController
