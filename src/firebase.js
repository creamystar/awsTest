import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    //대시보드에서 가져와야 하는 config 정보 
    apiKey: "AIzaSyAsVHLNdWnZfFRCqJSypdyJc72bmgyN70s",
    authDomain: "exam1120.firebaseapp.com",
    projectId: "exam1120",
    storageBucket: "exam1120.appspot.com",
    messagingSenderId: "273844641467",
    appId: "1:273844641467:web:d413f5872594dc6d87139e",
    measurementId: "G-40GVER49F7"
};

firebase.initializeApp(firebaseConfig); //앱 초기화 (파이어베이스콘피그 가지고)

const firestore = firebase.firestore();

export {firestore}; // default 해도 됨 

