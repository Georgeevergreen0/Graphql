const express = require("express");
const expressqlHTTP = require("express-graphql");
const app = express();
const schema = require("./graphQl/graphql");

app.use("/graphql", expressqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log("Express server running on port 4000");
});
