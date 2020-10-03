

/*
* reduce the amount of code that your app uses by 
* only including the features that you need.
*/

// import core firebase client (required)
import firebase from '@firebase/app';

// import Firebase Authentication (optional)
import '@firebase/auth';

// import Firebase Realtime Database (optional)
import '@firebase/database';

// import Cloud Firestore (optional)
import '@firebase/firestore';

import * as admin from 'firebase-admin';


const firebaseConfig = {
  apiKey: "AIzaSyCCC1xR5Obq1DOwoqHbV3K4jaeq3P_BcIU",
  authDomain: "chat3-f8994.firebaseapp.com",
  databaseURL: "https://chat3-f8994.firebaseio.com",
  projectId: "chat3-f8994",
  storageBucket: "chat3-f8994.appspot.com",
  messagingSenderId: "1091879896625",
  appId: "1:1091879896625:web:6987ebc176213c9f58f710"
};

 const firebaseApp = firebase.initializeApp(firebaseConfig);

 const db = firebaseApp.firestore();
 const auth = firebaseApp.auth();

 export {auth};
 export default db;
