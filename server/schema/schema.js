const graphql= require('graphql')
const _=require('lodash')
const Reservation=require('../models/reservation')

const {GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
}= graphql

// var reservations=[
//     {name:"Bibek bhattarai",id:"1",hotelName:"Everest",arrivalDate:"Aug26,2018",departureDate:"Aug29,2018"},
//     {name:"Sirjan Niroula",id:"2",hotelName:"Shangrila",arrivalDate:"Aug27,2018",departureDate:"Aug28,2018"},
//     {name:"prashil Guragain",id:"3",hotelName:"Hilton",arrivalDate:"Aug23,2018",departureDate:"Aug26,2018"},
//     {name:"Pema Sherpa",id:"4",hotelName:"Everest",arrivalDate:"Aug29,2018",departureDate:"Aug31,2018"},
//     {name:"Ashu Ghimire",id:"5",hotelName:"Everest",arrivalDate:"Aug24,2018",departureDate:"Aug25,2018"},
// ]

const ReservationType= new GraphQLObjectType({
    name:'Reservation',
    fields:()=>({
        name:{type:GraphQLString},
        id:{type:GraphQLID},
        hotelName:{type:GraphQLString},
        arrivalDate:{type:GraphQLString},
        departureDate:{type:GraphQLString}
    })

})
const RootQuery= new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        reservation:{
            type:ReservationType,
            args:{id:{type:GraphQLString}},
            resolve(parent,args){
                //code to get data from db and other sources
                //return _.find(reservations,{id:args.id})
                return Reservation.findById(args.id)
            }
        },
        reservations:{
            type:new GraphQLList(ReservationType),
            resolve(parent,args){
                //return reservations
                return Reservation.find({})
            }

        }

    }
})
const Mutation= new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addReservation:{
            type:ReservationType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                hotelName:{type:new GraphQLNonNull(GraphQLString)},
                arrivalDate:{type:new GraphQLNonNull(GraphQLString)},
                departureDate:{type:new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent,args){
                let reservation=new Reservation({
                    name:args.name,
                    hotelName:args.hotelName,
                    arrivalDate:args.arrivalDate,
                    departureDate:args.departureDate
                })
                return reservation.save()

            }
        }

    }
})
module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})