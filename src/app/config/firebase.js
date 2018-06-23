import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAZjLaw9RgFGPcdPKV4nGSlIYVQRgyLLh0",
  authDomain: "revents-e2afc.firebaseapp.com",
  databaseURL: "https://revents-e2afc.firebaseio.com",
  projectId: "revents-e2afc",
  storageBucket: "revents-e2afc.appspot.com",
  messagingSenderId: "850963878052"
}

firebase.initializeApp(firebaseConfig)
firebase.firestore()

export default firebase