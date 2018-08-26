const mongoose=require('mongoose')
const Schema=mongoose.Schema

const reserveSchema=Schema({
    name:String,
    hotelName:String,
    arrivalDate:String,
    departureDate:String
     
})
module.exports=mongoose.model('Reservation',reserveSchema)