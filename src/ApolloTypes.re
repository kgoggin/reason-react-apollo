type documentNode;
type watchQueryFetchPolicy;
type errorPolicy;
type apolloClient;
type apolloLink;
type apolloCache;
type context;
type data = Js.Json.t;
type graphqlError;
type networkStatus;

type apolloError = {
  .
  "message": string,
  "graphQLErrors": array(graphqlError),
  "networkError": Js.Nullable.t(Js.Exn.t),
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
  fetchPolicy: watchQueryFetchPolicy,
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
  onError: apolloError => unit,
};

type queryHook;

type apolloQueryResult('data) = {
  .
  "data": 'data,
  "errors": Js.Undefined.t(array(graphqlError)),
  "loading": bool,
  "networkStatus": networkStatus,
  "stale": bool,
};

type queryResult('data, 'variables) = {
  .
  "data": Js.Undefined.t('data),
  "loading": bool,
  "error": Js.Undefined.t(apolloError),
  "variables": 'variables,
  "networkStatus": networkStatus,
  "refetch": 'variables => Js.Promise.t(apolloQueryResult('data)),
};

[@bs.module "@apollo/react-hooks"]
external useQuery:
  (documentNode, queryHookOptions) => queryResult('data, 'variables) =
  "useQuery";

type linkOptions;
[@bs.obj] external linkOptions: (~uri: string) => linkOptions = "";

type clientOptions;
[@bs.obj]
external clientOptions:
  (
    ~link: apolloLink,
    ~cache: apolloCache,
    ~ssrMode: bool=?,
    ~ssrForceFetchDelay: int=?,
    ~connectToDevTools: bool=?,
    ~queryDeduplication: bool=?,
    unit
  ) =>
  clientOptions =
  "";

[@bs.module "apollo-link-http"] [@bs.new]
external createHttpLink: linkOptions => apolloLink = "HttpLink";

[@bs.module "apollo-client"] [@bs.new]
external createApolloClient: clientOptions => apolloClient = "ApolloClient";

module ApolloProvider = {
  [@bs.module "@apollo/react-hooks"] [@react.component]
  external make:
    (~client: apolloClient, ~children: React.element) => React.element =
    "ApolloProvider";
};
