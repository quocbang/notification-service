import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

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

export const messaging = getMessaging(app)