import {getApp, getApps, initializeApp} from "firebase/app"
import {initializeAuth, getAuth, getReactNativePersistence} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
    apiKey: "AIzaSyDHv7uv6kkU116lAUHP_TldsVnr8V8_tgE",
    authDomain: "file-trans-app.firebaseapp.com",
    projectId: "file-trans-app",
    storageBucket: "file-trans-app.appspot.com",
    messagingSenderId: "100732540907",
    appId: "1:100732540907:web:c75116734b8a8c92a1abae"
  };

  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });

  const firebaseAuth = getAuth(app);
  const firestoreDB = getFirestore(app);

  export {app, auth, firebaseAuth, firestoreDB};