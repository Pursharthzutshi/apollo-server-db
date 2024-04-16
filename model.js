const mongoose = require("mongoose");

// mongoose.connect(`mongodb+srv://13phzi:BGbeXfcV4dp9LX4G@cluster0.m8wabkl.mongodb.net/blogWebApp?retryWrites=true&w=majority`).then((res)=>{
//  console.log("connection made");
// })

const friendsSchema = new mongoose.Schema({
    name:String,
    username:String,
    age:Number,
    nationality:String,
})

const UserListSchema = new mongoose.Schema({
    uid:String,
    name:String,
    username:String,
    age:Number,
    nationality:String,
    // friends:{
    //     type:Schema.type.ObjectId,
    //     ref:"friendsSchema"
    // }
    friends:[friendsSchema]
})





const movieListSchema = new mongoose.Schema({
    name:String,
    yearOfPublication:Number,
    isInTheaters:Boolean,
})



const userListTable = new mongoose.model("UserList",UserListSchema,"UserList")

const movieListTable = new mongoose.model("MovieList",movieListSchema,"MovieList")


module.exports = {userListTable,movieListTable}