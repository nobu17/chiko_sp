import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

import { AppEnv } from '../config/appenv'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: AppEnv.FIREBASE_API_KEY,
  authDomain: AppEnv.FIREBASE_AUTH_DOMAIN,
  databaseURL: AppEnv.FIREBASE_DATABASE_URL,
  projectId: AppEnv.FIREBASE_PROJECT_ID,
  storageBucket: AppEnv.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: AppEnv.FIREBASE_MESSAGING_SENDER_ID,
  appId: AppEnv.FIREBASE_APP_ID
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase
