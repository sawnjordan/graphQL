const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");

const app = express();

const graphSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      helloWorld: {
        type: GraphQLString,
        resolve: () => {
          return "Hello World";
        },
      },
    },
  }),
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
