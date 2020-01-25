const graphql = require("graphql");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema } = graphql;


let BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    })
})

let RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                return ({
                    id: "abc",
                    name: "Evergreen George",
                    genre: "Love",
                })
            }
        }

    }
})

module.exports = new GraphQLSchema({ query: RootQuery });
