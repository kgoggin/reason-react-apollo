---
id: setting-up-apollo
title: Setting Up Apollo
---

## Dependencies

In order to use Apollo with the generated code, you'll need to install:

- The bindings package, `reason-react-apollo` (included in this project)
- [Future](https://www.npmjs.com/package/reason-future), as `reason-future`, a third-party library that includes the Promise-compatible types these bindings use ([read more about this here](./promise-types.md))
- [Apollo's hooks library](https://www.npmjs.com/package/@apollo/react-hooks), `@apollo/react-hooks`

```bash
yarn add reason-react-apollo reason-future @apollo/react-hooks
```

And then update your `bsconfig.json`:

```json
  "bs-dependencies": [
    "reason-react-apollo",
    "reason-future"
  ]
```

## Creating Your Apollo Client

The bindings include the ability to create an instance of an Apollo client using the apollo-boost library.

```reason
let client = Apollo.createClient(~uri="/graphql", ());

[@react.component]
let make = () => {
  <Apollo.Provider client>
    <App/>
  </Apollo.Provider>
}
```

For a full list of the available options you can use when creating your client, [check out Apollo's docs](https://www.apollographql.com/docs/react/essentials/get-started/#configuration-options).

Eventually this project will probably support more of the underlying API for creating a client. If that's important to you, feel free to file an issue!
