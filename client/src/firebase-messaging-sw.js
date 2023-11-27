import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw"

const config =  {
  apiKey: "AIzaSyA3Bpug9NNA8HlBSBNPbjvdc4eeD7vw7-E",
  authDomain: "notification-service-tes-b61d1.firebaseapp.com",
  projectId: "notification-service-tes-b61d1",
  storageBucket: "notification-service-tes-b61d1.appspot.com",
  messagingSenderId: "154777958958",
  appId: "1:154777958958:web:12c6dfd66357f872397dbf",
  measurementId: "G-PSQYYM7T22"
}

const app = initializeApp(config)
const messaging = getMessaging(app)

function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      
      // Add the public key generated from the console here.
      getToken(messaging, { vapidKey: 'BEu2yonFEYKzVj5OEj7DriJ4fESeB9UCr8gjhDSBuBHt90VuQ1NDTGqY-RSgnKBe7k1ttF3XmBHDfegZjFcntRU' }).then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          console.log('token', currentToken)
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
          // ...
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
      });
    }else {
      console.log('Failed to request permission')
    }
  })
};

// receive message
function receiveMessage() {
  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
  });
}

function receiveMessageWithBackground() {
  onBackgroundMessage(messaging, (payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    // const notificationTitle = 'Background Message Title';
    // const notificationOptions = {
    //   body: 'Background Message body.',
    //   icon: '/firebase-logo.png'
    // };
  
    // self.registration.showNotification(notificationTitle,
    //   notificationOptions);
  });
}

requestPermission();
receiveMessage();
// receiveMessageWithBackground();