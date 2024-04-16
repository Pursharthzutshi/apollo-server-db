const { gql } = require("apollo-server");

const typeDefs = gql`
type UserList{
    uid:ID!
    name:String!
    username:String!
    age:Int
    nationality: String
    friends:[User]
    favoriteMovies:[MovieList]
}

type User{
    uid:ID!
    name:String!
    username:String!
    age:Int
    nationality:Nationality!
}

type MovieList{
    uid:ID!
    name:String!
    yearOfPublication:Int,
    isInTheaters:Boolean!
    
}

type Query{
    UserList:[UserList]
    MovieList:[MovieList]
    user(name:String):UserList    
    movie(name:String!):MovieList
}

input userInputType{
    uid:ID!
    name:String!
    username:String!
    age:Int!
    nationality: String
    
}

input updateUsernameType{
    uid:ID!
    newUsername:String
}


type Mutation {
    createUser(user:userInputType!):UserList
    updateUsername(updateUsername:updateUsernameType):UserList
    deleteUser(uid:ID!):[UserList]
}


type Subscription{
    createUser(channelId:ID!):UserList
    deleteUser(channelId:ID!):UserList
}

# inputs




enum Nationality {
    CANADA
    BRAZIL
    INDIA
    GERMANY
    CHILE

}

# type UsersSuccessfulResult{

# }

# union UserResult = 
`

module.exports =  typeDefs ;