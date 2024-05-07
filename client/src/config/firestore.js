import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

console.log("this is the env ", process.env.REACT_APP_FIREBASE_API_KEY);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

let database;

try {
  // Initialize Firebase app
  const app = initializeApp(firebaseConfig);
  // Initialize the Realtime Database instance
  database = getDatabase(app);
  console.log('Firebase Realtime Database initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
  // You can handle the error here, such as displaying a message to the user or logging it for debugging.
}

export default database;
