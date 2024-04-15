import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseApp= firebase.initializeApp({
	apiKey: "AIzaSyBSzHEhyW1jryGDB4QdSHwFnOcOrLo_voo",
	authDomain: "sathibhai-c264f.firebaseapp.com",
	projectId: "sathibhai-c264f",
	storageBucket: "sathibhai-c264f.appspot.com",
	messagingSenderId: "395430205006",
	appId: "1:395430205006:web:2f1c12d6c342bf6218951f",
	measurementId: "G-RL5498TBZ9"
});

const db = firebaseApp.firestore();
const auth=firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};