import firebase from 'firebase'
  // Initialize Firebase
  const config = {
    apiKey: 'AIzaSyA1xa8SPVp8vZIS1JJ9o5Rw1sfV21ZEPIc',
    authDomain: 'yodj-50333.firebaseapp.com',
    databaseURL: 'https://yodj-50333.firebaseio.com',
    projectId: 'yodj-50333',
    storageBucket: '',
    messagingSenderId: '621374281161'
  }
 const fire = firebase.initializeApp(config)
 export default fire
