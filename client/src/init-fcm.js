import firebase from "firebase/app";
import "firebase/messaging";

firebase.initializeApp({
  apiKey: "AIzaSyAiJxbM6mGAQTXCI1mvYTaBM_A4rC2Oq_I",
  authDomain: "webrtc-30da6.firebaseapp.com",
  projectId: "webrtc-30da6",
  storageBucket: "webrtc-30da6.appspot.com",
  messagingSenderId: "755486160634",
  appId: "1:755486160634:web:76bfac8bd36e18a6ab7b43",
  measurementId: "G-7X1P55JGSB",
});

let messaging = firebase.messaging();

messaging.onMessage(function (payload) {
  try {
    //try???
    console.log("Message received. ", payload);

    const noteTitle = payload.notification.title;
    const noteOptions = {
      body: payload.notification.body,
      icon: "typewriter.jpg", //this is my image in my public folder
    };

    console.log("title ", noteTitle, " ", payload.notification.body);
    //var notification = //examples include this, seems not needed

    new Notification(noteTitle, noteOptions).onclick = function (event) {
      // console.log(event);
      // console.log(payload.notification.click_action);
      if (
        payload &&
        payload.notification &&
        payload.notification.click_action &&
        payload.notification.click_action.length > 0
      ) {
        window.open(payload.notification.click_action, "_blank");
      }
      this.close();
    };
  } catch (err) {
    console.log("Caught error: ", err);
  }
});

messaging.usePublicVapidKey(
  "BDSTjwrFXrDKYLbBLiBIgv5OzGbgZ3qMlPwor68CfvNLyyzyNJ7HJqWCzbUU-RVeKy1hXWviUfHftzDB5EdwJpw"
);

export { messaging };
