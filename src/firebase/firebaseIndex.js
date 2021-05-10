import firebase from "firebase";
import "firebase/auth";
import "firebase/app";

var firebaseConfig = {
  apiKey: "AIzaSyCV9WkinLvV98yvJetsRQ6C3I0TbZfNXqU",
  authDomain: "react-auth-532af.firebaseapp.com",
  projectId: "react-auth-532af",
  storageBucket: "react-auth-532af.appspot.com",
  messagingSenderId: "630970286892",
  appId: "1:630970286892:web:dad08cdd7aa139ad08e289",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth();

export default {
  firebaseConfig,
};
