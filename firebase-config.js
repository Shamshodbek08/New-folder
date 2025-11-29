// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYq3WtGkcZ5vqWQPA8i3q5ACLDlp_9TTM",
  authDomain: "school-website-84ba7.firebaseapp.com",
  projectId: "school-website-84ba7",
  storageBucket: "school-website-84ba7.firebasestorage.app",
  messagingSenderId: "211862756888",
  appId: "1:211862756888:web:65b4501e95e2a285032d6d",
  measurementId: "G-MRBNYL1M91"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
