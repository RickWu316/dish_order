const { foods } = require('../models')

const public = require('../public/javascript/main.js')



const foodController = {
    getfoods: async (req, res) => {
        foodList = await public.getfoods()
        // window.localStorage.setItem('foodList', 123)
        res.render("index", { foods: foodList })
    }
}


module.exports = foodController