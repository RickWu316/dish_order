const { Foods, Orders, OrderItems } = require('../models')

const public = require('../public/javascript/main.js')


const foodController = {
    getFoods: async (req, res) => {
        foodList = await public.getFoods()
        // console.log(foodList)
        // window.localStorage.setItem('foodList', 123)
        res.render("index", { foods: foodList })
    },

}

module.exports = foodController

