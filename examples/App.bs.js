// Generated by BUCKLESCRIPT VERSION 5.0.6, PLEASE EDIT WITH CARE
'use strict';

var Cn = require("re-classnames/src/Cn.bs.js");
var React = require("react");
var Client = require("./client");
var CodegenExample = require("./CodegenExample.bs.js");
var ReactHooks = require("@apollo/react-hooks");

var client = Client.client;

function App(Props) {
  return React.createElement(ReactHooks.ApolloProvider, {
              client: client,
              children: React.createElement("div", {
                    className: Cn.make(/* :: */[
                          "antialiased",
                          /* :: */[
                            "text-gray-900",
                            /* :: */[
                              "h-screen",
                              /* :: */[
                                "flex",
                                /* :: */[
                                  "flex-col",
                                  /* [] */0
                                ]
                              ]
                            ]
                          ]
                        ])
                  }, React.createElement("div", {
                        className: Cn.make(/* :: */[
                              "relative px-8 py-4 shadow flex items-center flex-shrink-0",
                              /* [] */0
                            ])
                      }, React.createElement("svg", {
                            className: Cn.make(/* :: */[
                                  "w-10 h-10",
                                  /* [] */0
                                ]),
                            fill: "none",
                            viewBox: "0 0 40 40",
                            xmlns: "http://www.w3.org/2000/svg"
                          }, React.createElement("path", {
                                d: "M2 10L20 0l18 10v20L20 40 2 30V10z",
                                fill: "#C3DAFE"
                              }), React.createElement("path", {
                                d: "M38 30V10L20 20v20l18-10z",
                                fill: "#434190"
                              }), React.createElement("path", {
                                d: "M2 10v20l18 10V20L2 10z",
                                fill: "#667EEA"
                              })), React.createElement("a", {
                            className: Cn.make(/* :: */[
                                  "ml-16 text-lg font-semibold",
                                  /* [] */0
                                ])
                          }, "Codegen SWAPI")), React.createElement("div", {
                        className: "w-lg mx-auto"
                      }, React.createElement(CodegenExample.make, { })))
            });
}

var make = App;

exports.client = client;
exports.make = make;
/* client Not a pure module */
