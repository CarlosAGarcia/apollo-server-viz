const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  } 

    type Mutation {
        addBook(title: String, author: String): Book
    }

    interface MutationResponse {
        code: String!
        success: Boolean!
        message: String!
    }
    type UpdateUserEmailMutationResponse implements MutationResponse {
        code: String!
        success: Boolean!
        message: String!
        user: User
    }

    mutation updateMyUser {
        updateUserEmail(id: String, email: String): UpdateUserEmailMutationResponse
      }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

const books = [
    {
      title: 'The Awakening44',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass55',
      author: 'Paul Auster',
    },
  ];

  // Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      books: () => books,
    },
  };





// STARTING SERVER HERE // 
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers,
    context: async () => ({
        // db: await client.connect() // awaits for db connect before any req
    })
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
