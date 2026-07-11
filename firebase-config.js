/*
 * Lucky Table sync config.
 *
 * Reuses the shared `dinner-wheel` Firebase project (same free-tier database,
 * different top-level node: luckytable/<table-code>). Zero new console setup.
 *
 * This config is safe to publish — Firebase web configs are public by design.
 * Access is limited by the database rules plus the table code in the URL hash.
 */
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyC82HNLrOUK16wDnJhCWFqw4PEk4tbPhak",
  authDomain: "dinner-wheel-7de5f.firebaseapp.com",
  databaseURL: "https://dinner-wheel-7de5f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dinner-wheel-7de5f",
  storageBucket: "dinner-wheel-7de5f.firebasestorage.app",
  messagingSenderId: "150821649337",
  appId: "1:150821649337:web:de89845c28b03e6a31d468",
  measurementId: "G-CLP3TXFH1Q"
};
