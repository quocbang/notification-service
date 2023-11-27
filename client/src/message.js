import { onBackgroundMessage } from 'firebase/messaging/sw';
import messaging from './firebase-messaging-sw';

const MyFCMComponent = () => {
  onBackgroundMessage(messaging, (payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
  });  
};

export default MyFCMComponent;
