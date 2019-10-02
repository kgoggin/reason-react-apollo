/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;
const MarkdownBlock = CompLibrary.MarkdownBlock;

const pre = "```";
const codeExample = `${pre}reason
[@react.component]
let make () => {
  open Apollo.Queries.GetTodos;
  let variables = makeVariables(~filter=\`ALL, ());
  let response = useQuery(~variables, ());
  switch (response) {
    | {loading: true} => <LoadingIndicator />
    | {error: Some(err)} => <ErrorDisplay err />
    | {data: Some(queryRoot)} =>
      let todos = queryRoot->Graphql.Query.todos;
      <TodosList todos />
  };
};
${pre}`;

class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language = "" } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
    const langPart = `${language ? `${language}/` : ""}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <div style={{ maxWidth: "500px", margin: "auto" }}>
            <MarkdownBlock>{codeExample}</MarkdownBlock>
          </div>
          <PromoSection>
            <Button href={docUrl("overview")}>Get started</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = "" } = this.props;
    const { baseUrl } = siteConfig;

    const Block = props => (
      <Container
        padding={["bottom"]}
        id={props.id}
        background={props.background}
      >
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const Features = () => (
      <Block layout="fourColumn">
        {[
          {
            content:
              "Code-generated ReasonML types for all the types defined in your GraphQL schema.",
            title: "GraphQL Schema Types"
          },
          {
            content:
              "A module for each query and mutation in your project. Create variables with ease and have the query document included for you.",
            title: "Query + Mutation Types"
          },
          {
            content:
              "Bindings for react-hooks that work with the generated code to give you type-safe queries and mutations with zero boilerplate code!",
            title: "Apollo Hooks Bindings"
          }
        ]}
      </Block>
    );

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Features />
        </div>
      </div>
    );
  }
}

module.exports = Index;
