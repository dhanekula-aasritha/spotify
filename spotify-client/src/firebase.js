import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAxGHRufgc1ftOwIU8YSiUBA9KiAoPXWI8",
  authDomain: "spotify-940e0.firebaseapp.com",
  projectId: "spotify-940e0",
  storageBucket: "spotify-940e0.appspot.com",
  messagingSenderId: "974194270695",
  appId: "1:974194270695:web:471cd35fc157eb531cdd42",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, process.env.REACT_APP_BUCKET_URL);
export default storage;
