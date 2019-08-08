// Generated by BUCKLESCRIPT VERSION 5.0.6, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Js_json = require("bs-platform/lib/js/js_json.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Js_mapperRt = require("bs-platform/lib/js/js_mapperRt.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function verifyGraphQLType(typename, json) {
  var match = Js_json.decodeObject(json);
  if (match !== undefined) {
    var root = Caml_option.valFromOption(match);
    var match$1 = typename === "Query" || typename === "Mutation";
    if (match$1) {
      return root;
    } else {
      var match$2 = Js_dict.get(root, "__typename");
      if (match$2 !== undefined) {
        var match$3 = Js_json.decodeString(Caml_option.valFromOption(match$2));
        var exit = 0;
        if (match$3 !== undefined && match$3 === typename) {
          return root;
        } else {
          exit = 1;
        }
        if (exit === 1) {
          console.log("Provided object is not " + (String(typename) + " type"));
          throw Caml_builtin_exceptions.not_found;
        }
        
      } else {
        console.log("Provided object is not a GraphQL object");
        throw Caml_builtin_exceptions.not_found;
      }
    }
  } else {
    console.log("Unable to decode " + (String(typename) + " object"));
    throw Caml_builtin_exceptions.not_found;
  }
}

function getField(fieldName, typename, data) {
  var match = Js_dict.get((function (param) {
            return verifyGraphQLType(param, data);
          })(typename), fieldName);
  if (match !== undefined) {
    return Caml_option.valFromOption(match);
  } else {
    console.log("Field " + (String(fieldName) + (" was not present on provided " + (String(typename) + " object. Did you forget to fetch it?"))));
    throw Caml_builtin_exceptions.not_found;
  }
}

function getNullableField(fieldName, typename, data) {
  var match = Js_dict.get((function (param) {
            return verifyGraphQLType(param, data);
          })(typename), fieldName);
  if (match !== undefined) {
    var result = Caml_option.valFromOption(match);
    if (result === null) {
      return undefined;
    } else {
      return Caml_option.some(result);
    }
  } else {
    console.log("Field " + (String(fieldName) + (" was not present on provided " + (String(typename) + " object. Did you forget to fetch it?"))));
    throw Caml_builtin_exceptions.not_found;
  }
}

function getArray(typename, fieldName, $staropt$star, data) {
  var decoder = $staropt$star !== undefined ? $staropt$star : (function (prim) {
        return prim;
      });
  var arr = getField(fieldName, typename, data);
  return Belt_Array.map(arr, Curry.__1(decoder));
}

function getNullableArray(typename, fieldName, $staropt$star, data) {
  var decoder = $staropt$star !== undefined ? $staropt$star : (function (prim) {
        return prim;
      });
  var arr = getField(fieldName, typename, data);
  if (arr === null) {
    return undefined;
  } else {
    return Belt_Array.map(arr, decoder);
  }
}

function makeDecoder(typename, fieldName, decoder, json) {
  var match = Curry._1(decoder, getField(fieldName, typename, json));
  if (match !== undefined) {
    return Caml_option.valFromOption(match);
  } else {
    throw Caml_builtin_exceptions.not_found;
  }
}

function makeNullableDecoder(typename, fieldName, decoder, json) {
  var value = getField(fieldName, typename, json);
  var match = Curry._1(decoder, value);
  if (match !== undefined) {
    return Caml_option.some(Caml_option.valFromOption(match));
  } else if (value === null) {
    return undefined;
  } else {
    throw Caml_builtin_exceptions.not_found;
  }
}

function decodeInt(json) {
  return Belt_Option.map(Js_json.decodeNumber(json), (function (prim) {
                return prim | 0;
              }));
}

function getString(param) {
  return (function (param$1) {
      return (function (param$2) {
          var param$3 = param$1;
          var param$4 = Js_json.decodeString;
          var param$5 = param$2;
          return makeDecoder(param, param$3, param$4, param$5);
        });
    });
}

function getNullableString(param) {
  return (function (param$1) {
      return (function (param$2) {
          var param$3 = param$1;
          var param$4 = Js_json.decodeString;
          var param$5 = param$2;
          return makeNullableDecoder(param, param$3, param$4, param$5);
        });
    });
}

function getFloat(param) {
  return (function (param$1) {
      return (function (param$2) {
          var param$3 = param$1;
          var param$4 = Js_json.decodeNumber;
          var param$5 = param$2;
          return makeDecoder(param, param$3, param$4, param$5);
        });
    });
}

function getNullableFloat(param) {
  return (function (param$1) {
      return (function (param$2) {
          var param$3 = param$1;
          var param$4 = Js_json.decodeNumber;
          var param$5 = param$2;
          return makeNullableDecoder(param, param$3, param$4, param$5);
        });
    });
}

function getInt(param) {
  return (function (param$1) {
      return (function (param$2) {
          var param$3 = param$1;
          var param$4 = decodeInt;
          var param$5 = param$2;
          return makeDecoder(param, param$3, param$4, param$5);
        });
    });
}

function getNullableInt(param) {
  return (function (param$1) {
      return (function (param$2) {
          var param$3 = param$1;
          var param$4 = decodeInt;
          var param$5 = param$2;
          return makeNullableDecoder(param, param$3, param$4, param$5);
        });
    });
}

function getBool(param) {
  return (function (param$1) {
      return (function (param$2) {
          var param$3 = param$1;
          var param$4 = Js_json.decodeBoolean;
          var param$5 = param$2;
          return makeDecoder(param, param$3, param$4, param$5);
        });
    });
}

function getNullableBool(param) {
  return (function (param$1) {
      return (function (param$2) {
          var param$3 = param$1;
          var param$4 = Js_json.decodeBoolean;
          var param$5 = param$2;
          return makeNullableDecoder(param, param$3, param$4, param$5);
        });
    });
}

function decodeEnum(typename, fieldName, decoder, data) {
  var match = Js_json.decodeString(data);
  if (match !== undefined) {
    var str = match;
    var match$1 = Curry._1(decoder, str);
    if (match$1 !== undefined) {
      return Caml_option.valFromOption(match$1);
    } else {
      console.log("Unknown enum value " + (String(str) + (" was provided for field " + (String(fieldName) + (" on " + (String(typename) + ""))))));
      throw Caml_builtin_exceptions.not_found;
    }
  } else {
    throw Caml_builtin_exceptions.not_found;
  }
}

function getEnum(typename, fieldName, decoder, json) {
  var str = Curry._1(getString(typename)(fieldName), json);
  var match = Curry._1(decoder, str);
  if (match !== undefined) {
    return Caml_option.valFromOption(match);
  } else {
    console.log("Unknown enum value " + (String(str) + (" was provided for field " + (String(fieldName) + (" on " + (String(typename) + ""))))));
    throw Caml_builtin_exceptions.not_found;
  }
}

function getNullableEnum(typename, fieldName, decoder, json) {
  var str = Curry._1(getNullableString(typename)(fieldName), json);
  return Belt_Option.map(str, (function (value) {
                var match = Curry._1(decoder, value);
                if (match !== undefined) {
                  return Caml_option.valFromOption(match);
                } else {
                  console.log("Unknown enum value " + (String(str) + (" was provided for field " + (String(fieldName) + (" on " + (String(typename) + ""))))));
                  throw Caml_builtin_exceptions.not_found;
                }
              }));
}

var jsMapperConstantArray = /* array */[
  /* tuple */[
    155386083,
    "PRIVATE"
  ],
  /* tuple */[
    427175081,
    "PUBLIC"
  ]
];

function cacheControlScope_enumToJs(param) {
  return Js_mapperRt.binarySearch(2, param, jsMapperConstantArray);
}

function cacheControlScope_enumFromJs(param) {
  return Js_mapperRt.revSearch(2, jsMapperConstantArray, param);
}

var cacheControlScopeMap = /* record */[
  /* toString */cacheControlScope_enumToJs,
  /* fromString */cacheControlScope_enumFromJs
];

var typename = "Query";

function todos(eta) {
  var param = undefined;
  var param$1 = eta;
  return getArray(typename, "todos", param, param$1);
}

function users(eta) {
  var param = undefined;
  var param$1 = eta;
  return getArray(typename, "users", param, param$1);
}

var Query = /* module */[
  /* typename */typename,
  /* todos */todos,
  /* users */users
];

var typename$1 = "Todo";

var id = getString(typename$1)("id");

var title = getString(typename$1)("title");

var isComplete = getBool(typename$1)("isComplete");

function assignedTo(param) {
  return getNullableField("assignedTo", typename$1, param);
}

var Todo = /* module */[
  /* typename */typename$1,
  /* id */id,
  /* title */title,
  /* isComplete */isComplete,
  /* assignedTo */assignedTo
];

var typename$2 = "User";

var id$1 = getString(typename$2)("id");

var name = getString(typename$2)("name");

function todos$1(eta) {
  var param = undefined;
  var param$1 = eta;
  return getArray(typename$2, "todos", param, param$1);
}

var User = /* module */[
  /* typename */typename$2,
  /* id */id$1,
  /* name */name,
  /* todos */todos$1
];

var typename$3 = "Mutation";

function createUser(param) {
  return getField("createUser", typename$3, param);
}

var Mutation = /* module */[
  /* typename */typename$3,
  /* createUser */createUser
];

function make(name, param) {
  return {
          name: name
        };
}

var CreateUserInput = /* module */[/* make */make];

exports.verifyGraphQLType = verifyGraphQLType;
exports.getField = getField;
exports.getNullableField = getNullableField;
exports.getArray = getArray;
exports.getNullableArray = getNullableArray;
exports.makeDecoder = makeDecoder;
exports.makeNullableDecoder = makeNullableDecoder;
exports.decodeInt = decodeInt;
exports.getString = getString;
exports.getNullableString = getNullableString;
exports.getFloat = getFloat;
exports.getNullableFloat = getNullableFloat;
exports.getInt = getInt;
exports.getNullableInt = getNullableInt;
exports.getBool = getBool;
exports.getNullableBool = getNullableBool;
exports.decodeEnum = decodeEnum;
exports.getEnum = getEnum;
exports.getNullableEnum = getNullableEnum;
exports.cacheControlScope_enumToJs = cacheControlScope_enumToJs;
exports.cacheControlScope_enumFromJs = cacheControlScope_enumFromJs;
exports.cacheControlScopeMap = cacheControlScopeMap;
exports.Query = Query;
exports.Todo = Todo;
exports.User = User;
exports.Mutation = Mutation;
exports.CreateUserInput = CreateUserInput;
/* id Not a pure module */
