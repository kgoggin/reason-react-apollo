---
id: using-mutations
title: Working With Mutations
---

## Generated Mutation Modules

Let's assume you've defined a query that looks like this:

```graphql
mutation CompleteTodo($id: ID!) {
  completeTodo(todoId: $id) {
    id
    isComplete
  }
}
```

Once you've run the codegen, you'll be able to access this mutation at `Apollo.Mutations.CompleteTodo`. This generated module will have a definition that looks like this:

```reason
module CompleteTodo:
  {
    type variables = {. "id": string};
    let parse: variables => Js.Json.t;
    let mutation: ReasonReactApollo.ApolloTypes.documentNode;
    let useMutation:
      (~mutation: documentNode=?,
      ~variables: {. "id": string}=?,
      unit) =>
      ((~variables: {. "id": string}=?,
        unit) => Future.t(Belt.Result.t(executionResult, apolloError)),
      mutationResult);
    let makeVariables:
      (~id: string, unit) =>
      {. "id": string};
  };
```

### `type variables`

This is the type for the variables defined in the operation, expressed as a `Js.t`.

### `parse`

This is a function that takes `variables` and transforms it into JSON (which, behind the scenes, is an identity function).

### `mutation`

This variable is the result of running the operation definition through the `gql` tag. It's compiled down to a plain JS object that's ready to be passed directly to Apollo with no further runtime work! In most cases you won't need to access this, but it can be handy if you want to work directly with the mutation document.

### `useMutation`

This function is a ReasonML binding for [Apollo's useMutation hook](https://www.apollographql.com/docs/react/api/react-hooks/#usemutation), and accepts all of the same configuration options (though some have been tweaked to make them more Reason-friendly). Note that since we've already pre-processed the mutation doecument, you don't need to directly pass it as an argument as you would in the JS version (though the argument is still offered, just as it is in the JS version).

The result of calling this function is a tuple with a function you will use to trigger the mutation, and a record representing the result of the mutation.

### `makeVariables`

This is a helper function for generating the variables required for the mutation. By using this you're able to tap into Reason's functional programming advantages like partial application.

## Mutation Response

The response object is typed like this:

```reason
type mutationResult = {
  data: option(Js.Json.t),
  error: option(apolloError),
  loading: bool,
  called: bool,
};
```

## Execution Response

When you call the mutate function returned by `useMutation`, it returns with a type of `Future.t(Belt.Result.t(executionResult, apolloError))`. `Future.t` represents a Promise as implemented by the [future](https://github.com/RationalJS/future) library. (For more information about why this project uses Future for promises, check out this explination.)

The `Belt.Result.t` that the future resolves encompasses an `executionResult` if everything works, which is typed like this:

```reason
type executionResult = {
  data: option(Js.Json.t),
  errors: option(array(Config.graphQLError)),
};
```

Or, if there's an error while performing the mutation, the future will resolve with a Belt.Error represented by an `apolloError`. For more about the various errors, and when you may encounter them, check out this doc.
