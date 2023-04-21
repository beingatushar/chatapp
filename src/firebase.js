// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCUIO1Ut-9zeeF6iDKEMFXiHHc6tmZkwcc",
    authDomain: "chatapp-beingatushar.firebaseapp.com",
    projectId: "chatapp-beingatushar",
    storageBucket: "chatapp-beingatushar.appspot.com",
    messagingSenderId: "498218042877",
    appId: "1:498218042877:web:6299e7808a70837a6c0594",
    measurementId: "G-CSL9TNQMMX"
};

export const app = initializeApp(firebaseConfig);