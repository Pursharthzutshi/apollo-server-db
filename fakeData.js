const UserList = [
  {
    uid: 1,
    name: "John",
    username: "john",
    age: 20,
    nationality: "CANADA",
    friends: [
      {
        uid: 2,
        name: "Pedro",
        username: "PedroTech",
        age: 20,
        nationality: "BRAZIL",
      },
      {
        uid: 5,
        name: "Kelly",
        username: "kelly2019",
        age: 5,
        nationality: "CHILE",
      },
    ],
  },
  {
    uid: 2,
    name: "Pedro",
    username: "PedroTech",
    age: 20,
    nationality: "BRAZIL",
  },
  {
    uid: 3,
    name: "Sarah",
    username: "cameron",
    age: 25,
    nationality: "INDIA",
    friends: [
      {
        uid: 2,
        name: "Pedro",
        username: "PedroTech",
        age: 20,
        nationality: "BRAZIL",
      },
    ],
  },
  {
    uid: 4,
    name: "Rafe",
    username: "rafe123",
    age: 60,
    nationality: "GERMANY",
  },
 
];

const MovieList = [
  {
    uid: 1,
    name: "Avengers Endgame",
    yearOfPublication: 2019,
    isInTheaters: true,
  },
  {
    uid: 2,
    name: "Interstellar",
    yearOfPublication: 2007,
    isInTheaters: true,
  },
  {
    uid: 3,
    name: "Superbad",
    yearOfPublication: 2009,
    isInTheaters: true,
  },
  {
    uid: 4,
    name: "PedroTech The Movie",
    yearOfPublication: 2035,
    isInTheaters: false,
  },

];

module.exports = { UserList, MovieList };