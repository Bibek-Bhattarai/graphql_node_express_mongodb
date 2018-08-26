const express= require('express')
const mongoose = require('mongoose')
const graphqlHTTP= require('express-graphql')
const schema=require('./schema/schema')


const app=express()

//connecting to mlab database
mongoose.connect('mongodb://test:test123@ds133262.mlab.com:33262/bibek_reservations')

mongoose.connection.once('open',()=>{
    console.log('Database  connected....')
})


// binding graphql and express
app.use('/graphql',graphqlHTTP({
    //schema properties
    schema,
    graphiql:true


}))

app.listen(5000,()=>{
    console.log('Server running at 5000....')
})