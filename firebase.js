import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCnO6DiR7P_y59J_-IAVO3CJhCxlLE4ubc",
  authDomain: "signal-clone-4fa54.firebaseapp.com",
  projectId: "signal-clone-4fa54",
  storageBucket: "signal-clone-4fa54.appspot.com",
  messagingSenderId: "909738029159",
  appId: "1:909738029159:web:627e242bc6722503c124c2"
};

let app;

if(firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
}
else{
  app = firebase.app();
}
const db = app.firestore();
const auth = firebase.auth();

export { auth, db };