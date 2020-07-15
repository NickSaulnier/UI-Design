import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDCVPPON0SWAld9NMWXXgyQeVYqiIZ5CW8",
    authDomain: "discussion-board-3383f.firebaseapp.com",
    databaseURL: "https://discussion-board-3383f.firebaseio.com",
    projectId: "discussion-board-3383f",
    storageBucket: "discussion-board-3383f.appspot.com",
    messagingSenderId: "1060170758832",
    appId: "1:1060170758832:web:0f948830219fca19299975"
}

firebase.initializeApp(firebaseConfig);
export default firebase;