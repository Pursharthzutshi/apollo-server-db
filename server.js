// const db = require("../server/fakeData")
const typeDefs = require("../server/typeDefs")
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const express = require("express")
const app = express()
const {ApolloServer} = require("apollo-server-express");
const { subscribe } = require("graphql");

const {userListTable,movieListTable} = require("../server/model")

app.use(cors())

const { PubSub } = require('graphql-subscriptions');
const mongoose = require("mongoose");

const db  = mongoose.connect(`mongodb+srv://13phzi:BGbeXfcV4dp9LX4G@cluster0.m8wabkl.mongodb.net/graphQL?retryWrites=true&w=majority`).then((res)=>{
 console.log("connection made");
})

app.get("/createUserTable",async (req,res)=>{
    await userListTable()
    res.send("User Table created");
})

app.get("/createMovieTable",async (req,res)=>{
    await movieListTable()
    res.send("Movie Table created");
})

const NEW_USER = "NEW_USER"

// const apolloServer = {
//     typeDefs,
//     resolvers,
// }

const resolvers = {
    // Subscription:{
    //     newUser:{
    //         subscribe:(_, __,{pubsub}) => pubsub.asyncIterator(NEW_USER)
    //     } 
    // }
    
    
    Query:{
    async UserList(parent,args,{pubsub,db}){
        console.log(db)
        // return db.UserList
        return userListTable.find()
        // return await db.collection("UserList").find()
     },   
     async MovieList(){
        return await movieListTable.find()
     },

     async user(parent,args,context,info){
        // const val = args.uid
        try{
            const findData =  await userListTable.findOne({name:args.name})
            console.log(findData)
            return findData
        }catch(error){
            console.log(error)
        }
     },
     async movie(parent,args){
        return await movieListTable.find({name:args.name}) 
        // return db.MovieList.find((movie)=>movie.name === args.name)
     }
    },
    Subscription:{
        createUser:{
            subscribe:(_,{channelId})=>{
                return PubSub.asyncIterator(`messageAdded_${channelId}`);
            }
        },
        deleteUser:{
            subscribe:(_,{channelId})=>{
                return PubSub.asyncIterator(`messageAdded_${channelId}`)
            }
        }
    }

    ,
    Mutation:{
        async createUser(parent,args,{channelId}){
            console.log(args.user.uid)
            const addUserList = await userListTable.insertMany({...args.user})

            await pubsub.publish(`messageAdded_${channelId}`, { createUser: addUserList });
            console.log(addUserList)

            return args.user
            // return addUserList;
        },
      
      async updateUsername(parent,args,context){

            console.log(args)

            const {uid,newUsername} = args.updateUsername
            // const convertDataType = parseInt(id)
 
            // let showUpdatedUserName;
            // db.UserList.forEach((val)=>{
            //     if(val.id === id){
            //         val.username = newUsername
            //         showUpdatedUserName = val 
            //     }
            // })

            const updateTable = await userListTable.updateOne({uid:uid},{$set:{username:newUsername}})
            console.log(updateTable)
            return await updateTable
        },
        async deleteUser(parent,args,{channelId}){
            try{
                const deleteElement = await userListTable.deleteOne({uid:args.uid}) 
                pubsub.publish(`messageAdded_${channelId}`,{deleteUser:deleteElement})
                console.log(args)
                return [args]
            }catch(err){
                console.log(err);
            }
        }
    },
    
    UserList:{
        favoriteMovies:(parent,args,context,info)=>{
            console.log(info)
            console.log(context)
           return db.MovieList.filter((movie)=>{
                return movie.yearOfPublication >=2000 && movie.yearOfPublication <= 2010
            })
        }
    }


}
const pubsub = new PubSub()

//fragments

// const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:{pubsub,db}
    // context:()=>{
    //     return{name:"Pursharth"}
    // }
    // context:{
    //     PubSub,
    // }
    // context:({req,res})=>({req,res,pubsub})
})

async function startApolloServer() {
    await server.start();
    server.applyMiddleware({app});
}

startApolloServer()

app.listen({port:3001},()=>{
    console.log(`3001 is running`)
})


