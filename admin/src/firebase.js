import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDNOLtQVZF9k7gqtWoeHJj6UllcS6nB6jY",
  authDomain: "netflix1-27ec9.firebaseapp.com",
  projectId: "netflix1-27ec9",
  storageBucket: "netflix1-27ec9.appspot.com",
  messagingSenderId: "286867863886",
  appId: "1:286867863886:web:d866a25f336d12804b461f",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
