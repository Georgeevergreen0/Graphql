const express = require("express");
const expressqlHTTP = require("express-graphql");
const app = express();
const mongoose = require("mongoose");

//mongoose connection
mongoose.connect("mongodb://127.0.0.1:27017/graphql", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("connected to database")
});

// graphQL schema
const schema = require("./schema/graphql");
app.use("/graphql", expressqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log("Express server running on port 4000");
});
