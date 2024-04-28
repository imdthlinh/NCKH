import React, { useState } from 'react'
import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import { Ionicons, Entypo } from '@expo/vector-icons';
import { scrBGI, BGRImage, rabbit, } from "../assets"
import UserTextInput from '../components/UserTextInput';
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth, firestoreDB } from '../config/firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import {useDispatch} from 'react-redux'
import { SET_USER } from '../context/actions/userActions';


const LoginScreen = () => {
  const screenWidth = Math.round(Dimensions.get("window").width);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [getEmailValidationStatus, setGetEmailValidationSatus] = useState(false);

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if(getEmailValidationStatus && email !== ""){
      await signInWithEmailAndPassword(firebaseAuth, email, password).then((userCred) => {
          if(userCred){
            console.log("User Id:", userCred?.user.uid);
            getDoc(doc(firestoreDB, "users", userCred?.user.uid)).then(
              (docSnap) => {
                if(docSnap.exists()){
                  console.log("User Data: ", docSnap.data());
                  dispatch(SET_USER(docSnap.data()))
                }
              }
            ).catch((error) => {
              console.log("Error: ", error.message);
              if(error.message.includes("wrong-password")){
                setAlert(true);
                setAlertMessage("Password Mismatch");
              }else if(error.message.includes("user-not-found")){
                setAlert(true);
                setAlertMessage("User Not Found");
              }else {
                setAlert(true);
                setAlertMessage("Invalid Email Address");
              }
              setInterval(() => {
                setAlert(false);
              }, 2000);
            });
        }
      })
    }
  }

  return (
    <View className="flex-1 items-center justify-start">
      <Image
        source={BGRImage}
        resizeMode="cover"
        className="h-96"
        style={{ width: screenWidth }}
      />

      {/* Main View */}
      <View className="w-full h-full bg-white rounded-tl-[90px] -mt-52 flex 
            items-center justify-start py-1 px-6 space-y-6">
        
        {/* Logo */}
        <Image source={rabbit} className="w-16 h-20 top-5" resizeMode="cover" />
        <Text className="py-2 text-primaryText text-xl font-semibold">
          WELCOME APP
        </Text>

        <View className="w-full flex items-center justify-center">

          {/* alert */}

          {alert && (
            <Text className="text-base text-red-600">
            {alertMessage}
          </Text>
          )}

          {/* email */}
          <UserTextInput
            placeholder="Email"
            isPass={false}
            setStateValue={setEmail}
            setGetEmailValidationSatus={setGetEmailValidationSatus}
          />

          {/* password */}
          <UserTextInput
            placeholder="Password"
            isPass={true}
            setStateValue={setPassword}
            setGetEmailValidationSatus={setGetEmailValidationSatus}
          />

          {/* login  onPress={handleLogin} */}

          <TouchableOpacity  onPress={() => navigation.navigate("HomeScreen")} className="w-full px-4 py-2 rounded-xl bg-primarybgr 
            my-3 flex items-center justify-center">
            <Text className="py-2 text-white text-xl font-semibold">
              SIGN IN
            </Text>
          </TouchableOpacity>

          <View className="w-full py-12 flex-row items-center justify-center space-x-2">
            <Text className="text-base text-primaryText">
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
              <Text className="text-base font-semibold text-primaryBold">
                Create Here
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </View>
  )
}

export default LoginScreen;
