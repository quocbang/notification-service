importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyA3Bpug9NNA8HlBSBNPbjvdc4eeD7vw7-E",
  authDomain: "notification-service-tes-b61d1.firebaseapp.com",
  projectId: "notification-service-tes-b61d1",
  storageBucket: "notification-service-tes-b61d1.appspot.com",
  messagingSenderId: "154777958958",
  appId: "1:154777958958:web:12c6dfd66357f872397dbf",
  measurementId: "G-PSQYYM7T22"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
});
