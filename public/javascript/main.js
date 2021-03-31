const { getfoods } = require('../../controllers/foodController')
const { foods } = require('../../models')


const public = {
    getfoods: async (sort) => {
        return foods.findAll({
            raw: true,
            nest: true

        }).then(food => {
            let foodList = food

            return food
        }).catch(error => console.error(error))

    }

}

module.exports = public

