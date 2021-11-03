import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyAixoRu-IuYMII3ZHnKCx_H7DJIuiles4g",
  authDomain: "letmeask-1e178.firebaseapp.com",
  databaseURL: "https://letmeask-1e178-default-rtdb.firebaseio.com",
  projectId: "letmeask-1e178",
  storageBucket: "letmeask-1e178.appspot.com",
  messagingSenderId: "888086604037",
  appId: "1:888086604037:web:834f511c8fcd81db87ef6c"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database }