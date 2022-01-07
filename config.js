import firebase from 'firebase'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXLZ0-HtI-nPkmwZIW2nR5GhAeBDFM6Ns",
  authDomain: "groceryapp-a450c.firebaseapp.com",
  databaseURL: "https://groceryapp-a450c-default-rtdb.firebaseio.com",
  projectId: "groceryapp-a450c",
  storageBucket: "groceryapp-a450c.appspot.com",
  messagingSenderId: "546858149472",
  appId: "1:546858149472:web:883fd663a0f255ffe30505"
};

// Initialize Firebase

// Initialize Firebase
if (!firebase.apps.length){firebase.initializeApp(firebaseConfig);}
export default firebase.firestore()