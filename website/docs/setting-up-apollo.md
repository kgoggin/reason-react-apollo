---
id: setting-up-apollo
title: Creating an Apollo Client
---

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
