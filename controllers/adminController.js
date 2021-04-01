const { foods, orders, orderItems } = require('../models')

const public = require('../public/javascript/main.js')
const fs = require('fs')
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID


const adminController = {
    getFoods: async (req, res) => {
        foodList = await public.getFoods()

        res.render("admin/foods", { foods: foodList })
    },
    editFood: async (req, res) => {
        let id = req.params.id
        if (id) {
            const food = await foods.findByPk(id)
            res.render("admin/create", { food: food.toJSON() })
        } else {
            res.render("admin/create")
        }
    },
    putFood: async (req, res) => {
        let id = req.params.id
        const food = await foods.findByPk(id)

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
                foods.create(req.body).then(res.redirect('./'))
            })
        } else {
            return foods.create(req.body).then(res.redirect('./'))
        }


    },
    deleteFood: async (req, res) => {
        let id = req.params.id
        const food = await foods.findByPk(id)
        food.destroy()
        res.redirect('./')
    },


}

module.exports = adminController
