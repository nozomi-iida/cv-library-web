import firebase from 'firebase';
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBTnjBa1DELwOkfq0XYEni1w55cJlJiMjQ",
  authDomain: "cv-libarary.firebaseapp.com",
  databaseURL: "https://cv-libarary.firebaseio.com",
  projectId: "cv-libarary",
  storageBucket: "cv-libarary.appspot.com",
  messagingSenderId: "536569334157",
  appId: "1:536569334157:web:8bcaa62ea430cc81f415c4",
  measurementId: "G-ZL98YZ4QXX"
};

firebase.initializeApp(firebaseConfig);

export const fireStore = firebase.firestore();
export const fireStorage = firebase.storage();

export default firebase;