---
id: using-errors
title: Working With Errors
---

Before we dive into how Errors are typed, here's a quick primer on how errors work in GraphQL, and specifically in Apollo.

### GraphQL Errors

If, during the execution of your query, your GraphQL server throws an error, that error gets returned to the client in the response as an array of all the errors that were thrown during execution. Note that, in most setups, _the existance of an error does not nessecarily mean that there wasn't **also** data returned in your response!_ GraphQL's graph structure allows for partial data responses, and even multiple errors.

The GraphQL spec allows for customizing the error via a field called `extensions` that contains an object with `code` and `exception` fields. Many GraphQL server libraries (including Apollo Server) provide custom error types that take advantage of these fields so that the errors your server throws are more semantic.

### Execution Errors

Besides something going wrong on your server, there's also a chance something could error out during the _execution_ of your query. Maybe the client lost its internet connection, or there's a problem with the query itself - either way, execution errors represent the fact that your query never made it to the server and back successfully.

### Apollo Errors

Apollo has created its own error type that abstracts these two possible error sources into one type. An Apollo Error contains a field called `graphQLErrors` which contains an array of GraphQL Errors that were found in the response to your query. It also contains a `networkError` field for capturing an execution error that happened at the network layer. The `error` field in a query response contains an Apollo Error that will be populated if an error occurred anywhere during the execution of your query.

## Error Types in This Library

Since the Apollo error type is well-known, this library provides a direct binding to it (as a ReasonML record).

```reason
type apolloError = {
  message: string,
  graphQLErrors: option(array(Config.graphQLError)),
  networkError: option(Js.Exn.t),
};
```

GraphQL errors, on the other hand, are **not** handled directly in the bindings. This affords the opportunity for defining a GraphQL type that accounts for any of the extension points that your server is using. Typing these as variants makes error handling at the client level much simpler! So, in place of actual type definitions, you can provide the type name (and the module it can be found in) in the codegen configuration. The bindings will convert GraphQL errors to your custom error type using the `%identity` helper, and you'll be free to work with them however works best for your project from there.

If creating a custom error type feels a little intimidating to start out, you can create a new file called `GraphQLError`, add `type t;` on the first line, and then just specify `GraphQLError.t` in the codegen config and everything will work just fine. Then, when you're ready, you can go back and start building in the support you need for errors in that file.
