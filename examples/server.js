const { ApolloServer, gql } = require("apollo-server");
const uuid = require("uuid/v4");

const typeDefs = gql`
  scalar DateTime

  type User {
    id: ID!
    name: String!
    todos: [Todo!]!
  }

  input CreateUserInput {
    name: String!
  }

  type Todo {
    id: ID!
    title: String!
    isComplete: Boolean!
    assignedTo: User
  }

  type Query {
    todos: [Todo!]!
    users: [User!]!
  }

  type Mutation {
    createUser(data: CreateUserInput!): User!
  }
`;

const db = {
  todos: [],
  users: []
};

const resolvers = {
  Query: {
    todos: () => db.todos,
    users: () => db.users
  },
  Mutation: {
    createUser: (_, args) => {
      const name = args.data.name;
      const user = {
        name,
        id: uuid()
      };
      db.users.push(user);
      return user;
    }
  },
  User: {
    todos: user => db.todos.filter(todo => todo.assignedTo === user.id)
  },
  Todo: {
    assignedTo: todo =>
      todo.assigneedTo
        ? db.users.find(user => user.id === todo.assignedTo)
        : null
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server
  .listen({ port: 4000 })
  .then(({ url }) => console.log(`🚀 Server is ready at ${url}`));
