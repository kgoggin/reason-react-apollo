[@bs.module "graphql-tag"]
external gql: string => ApolloTypes.documentNode = "default";

module UserCard = {
  [@react.component]
  let make = (~user: Graphql.User.t) => {
    <div className="max-w-sm rounded shadow-lg">
      <h2 className="font-bold text-xl mb-2 px-6 py-4">
        {user->Graphql.User.name->React.string}
      </h2>
    </div>;
  };
};

let usersQuery =
  gql(
    {|
  query users {
    users {
      id
      name
      todos
        {
          id
          isComplete
        }
    }
  }
|},
  );

module UsersQuery =
  Graphql.MakeQuery({
    type variables = Js.Json.t;
    let parse = v => v;
  });

module Loading = {
  [@react.component]
  let make = () => {
    <div> "Loading..."->React.string </div>;
  };
};

[@react.component]
let make = () => {
  let response = UsersQuery.useQuery(~query=usersQuery, ());
  <div className="relative">
    {response.loading ? <Loading /> : React.null}
    {switch (response.data) {
     | None => React.null
     | Some(d) =>
       switch (d->Graphql.Query.users->Belt.List.fromArray) {
       | [] => <div> "No Users"->React.string </div>
       | users =>
         users
         ->Belt.List.map(user => <UserCard user key={user->Graphql.User.id} />)
         ->Belt.List.toArray
         ->React.array
       }
     }}
  </div>;
};
