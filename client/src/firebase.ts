import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
    apiKey: "AIzaSyD82RdXRohbJl6r5kIgPTzSgHhth8FuVjY",
    authDomain: "crud-react-b2dc8.firebaseapp.com",
    projectId: "crud-react-b2dc8",
    storageBucket: "crud-react-b2dc8.appspot.com",
    messagingSenderId: "538773658201",
    appId: "1:538773658201:web:fd807a4c5d7547d472af48",
    measurementId: "G-70V8TJCE4Y"
  };

export const application = initializeApp(firebaseConfig)
export const auth = getAuth(application)
export const validateEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/