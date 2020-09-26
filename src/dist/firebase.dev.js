"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.provider = exports.auth = void 0;

var _app = _interopRequireDefault(require("@firebase/app"));

require("@firebase/auth");

require("@firebase/database");

require("@firebase/firestore");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
* reduce the amount of code that your app uses by 
* only including the features that you need.
*/
// import core firebase client (required)
// import Firebase Authentication (optional)
// import Firebase Realtime Database (optional)
// import Cloud Firestore (optional)
var firebaseConfig = {
  apiKey: "AIzaSyCCC1xR5Obq1DOwoqHbV3K4jaeq3P_BcIU",
  authDomain: "chat3-f8994.firebaseapp.com",
  databaseURL: "https://chat3-f8994.firebaseio.com",
  projectId: "chat3-f8994",
  storageBucket: "chat3-f8994.appspot.com",
  messagingSenderId: "1091879896625",
  appId: "1:1091879896625:web:6987ebc176213c9f58f710"
};

var firebaseApp = _app["default"].initializeApp(firebaseConfig);

var db = firebaseApp.firestore();
var auth = firebaseApp.auth();
exports.auth = auth;
var provider = new _app["default"].auth.GoogleAuthProvider();
exports.provider = provider;
var _default = db;
exports["default"] = _default;