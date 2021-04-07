
const { Foods } = require('../../models')


const public = {
    getFoods: async (sort) => {
        return Foods.findAll({
            raw: true,
            nest: true

        }).then(food => {
            let foodList = food
            return food
        }).catch(error => console.error(error))

    },




}

module.exports = public

