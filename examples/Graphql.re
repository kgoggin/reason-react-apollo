/**
 * In this file, we're creating our React Apollo Methods by
 * pulling in the Codegen'd types and using them as teh basis
 * for any/all queries + mutations.
 */
/* bring in all the types so we can access everything from here */
include Graphql_Codegen;

include ReasonReactApollo_Make.MakeProject({
  type query = Query.t;
  let parse: Js.Json.t => query = fromJSON;
});
