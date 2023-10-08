import React, { useContext } from "react";
import { getApps, initializeApp } from "firebase/app";
import { AuthContext } from "../provider/AuthProvider";

import { NavigationContainer } from "@react-navigation/native";

import Main from "./MainStack";
import Auth from "./AuthStack";
import Loading from "../screens/utils/Loading";

// Better put your these secret keys in .env file
const firebaseConfig = {
  apiKey: "AIzaSyCerq7huPOqxVT95gbSHEzNxyQLVs521x0",
  authDomain: "prismatic-voice-401300.firebaseapp.com",
  projectId: "prismatic-voice-401300",
  storageBucket: "prismatic-voice-401300.appspot.com",
  messagingSenderId: "640657004577",
  appId: "1:640657004577:web:d4faf5912178223bd56b60",
  measurementId: "G-41R0F7Z6XG"
};
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

export default () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  return (
    <NavigationContainer>
      {user == null && <Loading />}
      {user == false && <Auth />}
      {user == true && <Main />}
    </NavigationContainer>
  );
};
