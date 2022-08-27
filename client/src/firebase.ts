import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyB3w94x_BjGOZGLhrg_GOl0cx-RssWvUIo",
  authDomain: "eagle-dev-test-2d9be.firebaseapp.com",
  projectId: "eagle-dev-test-2d9be",
  storageBucket: "eagle-dev-test-2d9be.appspot.com",
  messagingSenderId: "447041672401",
  appId: "1:447041672401:web:b50005d9ba01833ed961f0",
  measurementId: "G-GB620F9QSC"
};

export const application = initializeApp(firebaseConfig)
export const auth = getAuth(application)
export const validateEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/