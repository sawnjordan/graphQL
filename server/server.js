const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");
const RootQuery = require("./schema/schema");
const cors = require("cors");
const app = express();

const graphSchema = new GraphQLSchema({
  query: RootQuery,
});

app.use(cors());
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
