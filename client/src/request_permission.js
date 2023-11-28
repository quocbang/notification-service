import { getToken } from "firebase/messaging";
import { messaging } from "./firebase-messaging-sw";

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

requestPermission();