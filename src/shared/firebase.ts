import 'firebase/storage';

import firebase from 'firebase/app';

var firebaseConfig = {
  apiKey: "AIzaSyBYly9_WAtDWTDv-R7ZTOUVUtQinBnln8o",
  authDomain: "productgrid-8bc97.firebaseapp.com",
  databaseURL: "https://productgrid-8bc97.firebaseio.com",
  projectId: "productgrid-8bc97",
  storageBucket: "productgrid-8bc97.appspot.com",
  messagingSenderId: "563362281028",
  appId: "1:563362281028:web:c17cada23e86f097b56e11"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;