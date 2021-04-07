const { Foods, Orders, OrderItems } = require('../models')

const public = require('../public/javascript/main.js')


const foodController = {
    getFoods: async (req, res) => {
        try {
            foodList = await public.getFoods()
            res.render("index", { foods: foodList })
        } catch (err) {
            res.status(500).render("", { status: 'error', error_messages: '伺服器錯誤請稍後', err }, console.log(err))
        }
    },

}

module.exports = foodController


