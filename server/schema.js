const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = require("graphql");

const Users = require("./users");
// console.log(Users);

const UsersType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    address: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    helloWorld: {
      type: GraphQLString,
      resolve: () => {
        return "Hello World";
      },
    },
    users: {
      type: new GraphQLList(UsersType),
      resolve: () => {
        return Users;
      },
    },
    user: {
      type: UsersType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return findUserById(parseInt(args.id));
      },
    },
  },
});

const findUserById = (id) => {
  return Users.find((item) => item.id === parseInt(id));
};

module.exports = RootQuery;
