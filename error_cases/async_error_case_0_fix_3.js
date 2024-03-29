const { users, restaurants }  = require('../data')
const RestaurantModel = require('../restaurant')
const UserModel = require('../user')
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/restaurant_list_async_callback")
const db = mongoose.connection

db.once('open', async () => {
    for (const [user_index, user] of users.entries()) {
        const createdUser = await UserModel.create({
            ...user
        })
        const userRestaurant = []
        restaurants.forEach((restaurant, rest_index)=>{
            if (rest_index >= 3*user_index && rest_index < 3*(user_index+1)) {
                restaurant.userId = createdUser._id
                userRestaurant.push(restaurant)
            }
        })
        await RestaurantModel.create(userRestaurant)
        console.log('done')
    }
    console.log('all done')
    process.exit()
})