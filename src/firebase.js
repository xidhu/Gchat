

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





 const firebaseApp = firebase.initializeApp(firebaseConfig);

 const db = firebaseApp.firestore();
 const auth = firebaseApp.auth();

 export {auth};
 export default db;
