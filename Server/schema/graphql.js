const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLList } = graphql;

const Book = require("../model/bookModel");
const Author = require("../model/authorModel");

let BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve: (parent, args) => {
                return authors.find((value) => {
                    return value.id == parent.authorId
                })
            }
        }
    })
})

let AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve: (parent, args) => {
                return books.filter((value) => {
                    return value.authorId == parent.id
                })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: (parent, args) => {
                return books.find((value) => {
                    return value.id == args.id
                })
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: (parent, args) => {
                return authors.find((value) => {
                    return value.id == args.id
                })
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: (parent, args) => {
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve: (parent, args) => {
                return authors
            }
        },

    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve: async (root, { name, age }) => {
                let data = await Author.create({
                    name,
                    age
                })
                return data
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID },
            },
            resolve: async (root, { name, genre, authorId }) => {
                let data = await Book.create({
                    name,
                    genre,
                    authorId
                })
                return data
            }
        }
    }
})

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
