const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = require("graphql");

const Users = require("./users");
// console.log(Users);

const app = express();

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
        const user = Users.find((item) => item.id === parseInt(args.id));
        return user;
      },
    },
  },
});

const graphSchema = new GraphQLSchema({
  query: RootQuery,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphSchema,
    graphiql: true,
  })
);

const PORT = 3000;

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server is listening to port: ${PORT}`);
    console.log(`Browse: http://localhost:${PORT}`);
    console.log("Press CTRL+C to disconnect server");
  }
});
