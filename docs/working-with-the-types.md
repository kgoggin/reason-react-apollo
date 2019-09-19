---
id: working-with-the-types
title: Using the Generated Types for Your Schema
---

After configuring and running the codegen against your GraphQL schema, you'll now have access to a ReasonML type that corresponds to each of the GraphQL types defined in your schema. Be convention, these types are defined in a file called `Graphql.re`. Within that file, each of your types is added as its own module. Let's take a look at an example schema:

```graphql
scalar DateTIme

type User {
  name: String!
}

type Todo {
  id: ID!
  title: String!
  isComplete: Boolean!
  dueDate: DateTime
  assignee: User
}

type Query {
  todos: [Todo!]!
}
```

This GraphQL schema defines thee types: `User`, `Todo`, and `Query`. The resulting ReasonML code would contain types `Graphql.Todo.t` and `Graphql.Query.t`. You can now use these types throughout your project. You might have a component that renders all todos that takes an `array(Graphql.Todo.t)`, and a detail component that takes a single todo - these underlying types are now shareable throughout your project, and it's easy to tell what a given function or component is working with just by the type signature.

## Accessing Fields on a Type

The generated types are "abstract" types, similar to those you create using `[@bs.deriving abstract]`. That means the implementation of the type is hidden from the consumer, so you can't access fields on the type directly. Instead, fields are accessed via getter functions that take an object of that type as their only argument. So, to access a `Todo`'s title, for example, you'd use its getter like this:

```reason
let title = todo->Graphql.Todo.title;
```

Each type's fields have a getter function available in its module, and if your language server is working correctly you should see each field available via autocomplete.

### Why Abstract Types?

The use of abstract types with getter functions is a design decision to allow for a runtime check that the field you're asking for exists on the object you're working with. GraphQL's dynamic nature means that an object fetched via a query may have only one of its fields, or could have all of them, depending on what was queried. One way to handle this would be to type every single field as `Js.Undefined.t`, but this gets really cumbersome to work with. Another way would be to type each query individually (which is how graphql-ppx works), but then you lose the ability to have a single definition of your GraphQL schema type that you can share around your project.

So, these bindings assume every field exists, but makes you ask for it with a getter function. As a part of the getter's execution, it will verify that the object in question actually does have the field you're asking for, and throw an error (with a helpful error message) if it's absent.

## Nested Fields

When accessing deeply nested fields, just chain the getters together. And, since the getters are just functions, they work really well with some of the other functional programming paradigms in Reason:

```reason
let firstAssignee: option(Graphql.User.t) =
  queryResponse
    ->Graphql.Query.todos
    ->Belt.Array.get(0)
    ->Belt.Option.map(Graphql.Todo.assignedTo);
```

## Input Types

Input types in GraphQL are used as the arguments for queries and mutations. These types get their own module generated as well, but instead of getter functions, these modules include a `make` function, with labeled arguments for each of the type's fields. So, for an input like this:

```graphql
input CreateTodo {
  title: String!
  isComplete: Boolean
}
```

You could create an instance of this type like this:

```reason
let createdTodo = Graphql.CreateTodo.make(~title="Do a thing", ~isComplete=false, ());
```

Queries and mutations that accept input types as arguments are typed to use the result of these functions.

## Enums

GraphQL `enum` types map to a Reason polymorphic variant. They don't get their own module, but they do get a special "enum map" record that makes it easy to map them to and from strings. Let's look at another example:

```graphql
enum FILTER {
  COMPLETE
  INCOMPLETE
  ALL
}
```

The generated Reason type will be called `filter_enum` (to avoid naming collisions with regular types), and you'll also have access to `filterMap`. These look like this:

```reason
type filter_enum = [| `COMPLETE | `INCOMPLETE | `ALL];
let filterMap = {
  toString: filter_enum => string,
  fromString: string => option(filter_enum)
};
```

The to/from string functions can be helpful when trying to interop with JS code, but note that enums are always represented as the variant type when accessing them as a field on a normal type, or passing them as an argument to make an input type. In most cases you can always treat them as a variant and never worry about them actually being a string!

## Scalars

If your GraphQL schema contains scalar definitions (like `DateTime` above) you'll need to specify a backing ReasonML type for it in your codegen config. It can be a type included with Reason, such as a `string`, or one you've defined in your project somewhere else, like `DateTime.t`. Thank's to Reason's module system, the generated code will just work, and you can type your scalars in whatever way works best for your project.
