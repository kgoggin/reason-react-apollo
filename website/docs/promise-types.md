---
id: promise-types
title: Working With Promises
---

The Apollo API contains a few places that return a Promise:

1. Calling the `mutate` function.
2. Calling `refetch` on a query result

In reason-react-apollo, these get typed using [future](https://github.com/RationalJS/future), a `Js.Promise` alternative written in ReasonML. They're also wrapped in a `Belt.Result.t` type to account for the underlying JS Promise catching an error.

Future's README provides lots of excellent examples of how to work with its type using the built-in utlity functions, and these compose into some nice abstractions for working specifically with Apollo that may or may not get included in this library some day 😉.

## Why use a third party library?

Because of the way promises were implemented in JavaScript, typing them (and working with them natively) in ReasonML is chanllenging. If you're curious, there are several discussions about why this is to be found in the Reason forums, or [here's a pretty good overview of the problem](https://aantron.github.io/repromise/docs/DesignFAQ#why-are-js-promises-not-type-safe).

The decision to include another dependency for this project [wasn't taken lightly](https://reasonml.chat/t/writing-bindings-that-depend-on-promises/1814/9). It was made with an eye towards pushing the community to adopt a type-safe alternative to `Js.Promise` that becomes a de facto standard for bindings libraries like this one (or at least until one is included in BuckleScript 😉).

All that said, if this is a deal-breaker for you, [feel free to file an issue](https://github.com/kgoggin/reason-react-apollo/issues/new). The fact that most of this library's code gets generated for your project opens up the possibility of a config switch that would allow for a native Js.Promise API in the future.
