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
            resolve: async (parent, args) => {
                let book = await Author.findById(parent.authorId);
                return book;
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
            resolve: async (parent, args) => {
                let book = await Book.find({ authorId: parent.id })
                return book
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
            resolve: async (parent, args) => {
                let book = await Book.findById(args.id)
                return book
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: async (parent, args) => {
                let author = await Author.findById(args.id)
                return author;
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: async (parent, args) => {
                let books = await Book.find()
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve: async (parent, args) => {
                let authors = await Author.find()
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
