type documentNode;
type errorPolicy;
type apolloClient;
type apolloLink;
type context;
type data = Js.Json.t;
type networkStatus;

type graphqlError;

module WatchQueryFetchPolicy: {
  type t = pri string;
  [@bs.inline "cache-first"]
  let cacheFirst: t;
  [@bs.inline "network-only"]
  let networkOnly: t;
  [@bs.inline "cache-only"]
  let cacheOnly: t;
  [@bs.inline "no-cache"]
  let noCache: t;
  [@bs.inline "standby"]
  let standby: t;
  [@bs.inline "cache-and-network"]
  let cacheAndNetwork: t;
} = {
  type t = string;
  [@bs.inline]
  let cacheFirst = "cache-first";
  [@bs.inline]
  let networkOnly = "network-only";
  [@bs.inline]
  let cacheOnly = "cache-only";
  [@bs.inline]
  let noCache = "no-cache";
  [@bs.inline]
  let standby = "standby";
  [@bs.inline]
  let cacheAndNetwork = "cache-and-network";
};

[@bs.deriving abstract]
type queryConfig = {
  query: documentNode,
  [@bs.optional]
  variables: Js.Json.t,
};

module DataProxy = {
  type t;

  type readQueryOptions = queryConfig;

  [@bs.deriving abstract]
  type writeQueryOptions('data) = {
    data: 'data,
    query: documentNode,
    [@bs.optional]
    variables: Js.Json.t,
  };

  [@bs.send]
  external readQuery: (t, readQueryOptions) => Js.Nullable.t('data) =
    "readQuery";
  [@bs.send]
  external writeQuery: (t, writeQueryOptions('data)) => unit = "writeData";
};

type apolloErrorJs = {
  .
  "message": string,
  "graphQLErrors": Js.Null_undefined.t(array(graphqlError)),
  "networkError": Js.Null_undefined.t(Js.Exn.t),
};

[@bs.deriving abstract]
type queryHookOptions = {
  [@bs.optional]
  query: documentNode,
  [@bs.optional]
  displayName: string,
  [@bs.optional]
  skip: bool,
  [@bs.optional]
  variables: Js.Json.t,
  [@bs.optional]
  fetchPolicy: WatchQueryFetchPolicy.t,
  [@bs.optional]
  errorPolicy,
  [@bs.optional]
  pollInterval: int,
  [@bs.optional]
  client: apolloClient,
  [@bs.optional]
  notifyOnNetworkStatusChange: bool,
  [@bs.optional]
  context,
  [@bs.optional]
  partialRefetch: bool,
  [@bs.optional]
  returnPartialData: bool,
  [@bs.optional]
  ssr: bool,
  [@bs.optional]
  onCompleted: data => unit,
  [@bs.optional]
  onError: apolloErrorJs => unit,
};

[@bs.deriving abstract]
type lazyQueryHookOptions = {
  [@bs.optional]
  query: documentNode,
  [@bs.optional]
  displayName: string,
  [@bs.optional]
  variables: Js.Json.t,
  [@bs.optional]
  fetchPolicy: WatchQueryFetchPolicy.t,
  [@bs.optional]
  errorPolicy,
  [@bs.optional]
  pollInterval: int,
  [@bs.optional]
  client: apolloClient,
  [@bs.optional]
  notifyOnNetworkStatusChange: bool,
  [@bs.optional]
  context,
  [@bs.optional]
  partialRefetch: bool,
  [@bs.optional]
  returnPartialData: bool,
  [@bs.optional]
  ssr: bool,
  [@bs.optional]
  onCompleted: data => unit,
  [@bs.optional]
  onError: apolloErrorJs => unit,
};

type queryLazyOptions('variables) = {
  .
  "variables": Js.Undefined.t('variables),
};

type apolloQueryResultJs('data) = {
  .
  "data": 'data,
  "errors": Js.Undefined.t(array(graphqlError)),
  "loading": bool,
  "networkStatus": networkStatus,
  "stale": bool,
};

type queryResultJs('data, 'variables) = {
  .
  "data": Js.Undefined.t('data),
  "loading": bool,
  "error": Js.Undefined.t(apolloErrorJs),
  "variables": 'variables,
  "networkStatus": networkStatus,
  [@bs.meth]
  "refetch":
    Js.Undefined.t(Js.Json.t) => Js.Promise.t(apolloQueryResultJs('data)),
  "startPolling": int => unit,
  "stopPolling": unit => unit,
};

type mutationFunctionOptions('data, 'variables) = {
  .
  "variables": Js.Undefined.t('variables),
  "optimisticResponse": Js.Undefined.t('variables => 'data),
};

type executionResultJs = {
  .
  "data": Js.Undefined.t(Js.Json.t),
  "errors": Js.Undefined.t(array(graphqlError)),
};

type mutationHookOptions;
[@bs.obj]
external mutationHookOptions:
  (
    ~mutation: documentNode=?,
    ~variables: Js.Json.t=?,
    ~errorPolicy: errorPolicy=?,
    ~update: (DataProxy.t, executionResultJs) => unit=?,
    ~refetchQueries: array(queryConfig)=?,
    ~awaitRefetchQueries: bool=?,
    ~optimisticResponse: Js.Json.t=?,
    unit
  ) =>
  mutationHookOptions =
  "";

type mutationResultJs('data) = {
  .
  "data": Js.Undefined.t('data),
  "error": Js.Undefined.t(apolloErrorJs),
  "loading": bool,
  "called": bool,
  "client": Js.Undefined.t(apolloClient),
};

[@bs.module "@apollo/react-hooks"]
external useQuery:
  (documentNode, queryHookOptions) => queryResultJs('data, 'variables) =
  "useQuery";

[@bs.module "@apollo/react-hooks"]
external useLazyQuery:
  (documentNode, lazyQueryHookOptions) =>
  (queryLazyOptions('variables) => unit, queryResultJs('data, 'variables)) =
  "useLazyQuery";

[@bs.module "@apollo/react-hooks"]
external useMutation:
  (documentNode, mutationHookOptions) =>
  (
    mutationFunctionOptions('data, 'variables) =>
    Js.Promise.t(executionResultJs),
    mutationResultJs('data),
  ) =
  "useMutation";

type boostOptions;
[@bs.obj] external boostOptions: (~uri: string=?, unit) => boostOptions = "";

[@bs.module "apollo-boost"] [@bs.new]
external createApolloClient: boostOptions => apolloClient = "ApolloClient";

module ApolloProvider = {
  [@bs.module "@apollo/react-hooks"] [@react.component]
  external make:
    (~client: apolloClient, ~children: React.element) => React.element =
    "ApolloProvider";
};
