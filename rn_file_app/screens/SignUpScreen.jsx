import React,  { useState } from 'react'
import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import { MaterialIcons, Ionicons, Entypo  } from '@expo/vector-icons';
import { scrBGI, BGRImage, rabbit,  } from "../assets"
import UserTextInput from '../components/UserTextInput';
import { useNavigation } from "@react-navigation/native";
import {Avatars} from "../avatars"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth, firestoreDB } from '../config/firebase.config';
import { doc, setDoc } from 'firebase/firestore';


const SignUpScreen = () =>  {
  const screenWidth = Math.round(Dimensions.get("window").width);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
 

  const[getEmailValidationStatus, setGetEmailValidationSatus] =useState(false);

  const navigation = useNavigation();

  const handleSignUp = async () => {
    if(getEmailValidationStatus && email !== ""){
      await createUserWithEmailAndPassword(firebaseAuth, email, password).then(
        (userCred) => {
          const data = {
            _id : userCred?.user.uid,
            fullName: name,
            providerData: userCred.user.providerData[0]
          }

          setDoc(doc(firestoreDB, "users", userCred?.user.uid), data).then(
            () => {
              navigation.navigate("LoginScreen");
            }
          )
        }
      )
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
            items-center justify-start py-1 px-6 space-y-6 ">
              
        {/* Logo */}
        <Image
          source={rabbit}
          className="w-16 h-20 top-5"
          resizeMode="cover"
        />
        <Text className="py-2 text-primaryText text-xl font-semibold"> Join with us!</Text>
      
      <View className="w-full flex items-center justify-center">

        {/* avatar  */}
        <View className="w-full flex items-center justify-center relative -my-4">
          <TouchableOpacity className="w-20 h-20 p-1 rounded-full border-2 bg-primarybgr relative">
            <Avatars  resizeMode="cover" />
            <View className="w-6 h-6 bg-primarybgr rounded-full absolute top-0 right-0 flex items-center justify-center">
              <MaterialIcons name="edit" size={18} color={"#fff"}/>
            </View>
          </TouchableOpacity>
        </View>

        <View className="w-full flex items-center justify-center relative top-5">
          {/* fullname */}
        <UserTextInput 
            placeholder="Full Name"
            isPass={false}
            setStateValue={setName}
        />
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
        {/* login  */}

        <TouchableOpacity onPress={handleSignUp} className="w-full px-4 py-2 rounded-xl bg-primarybgr 
            my-3 flex items-center justify-center">
            <Text className="py-2 text-white text-xl font-semibold">
              SIGN IN
            </Text>
        </TouchableOpacity>

        <View className="w-full py-12 flex-row items-center justify-center space-x-2">
          <Text className="text-base text-primaryText">
                Have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text className="text-base font-semibold text-primaryBold">
              Login Here
            </Text>
          </TouchableOpacity>
        </View>
        </View>
        

      </View>
      </View>
    </View>
    )
}

export default SignUpScreen;
