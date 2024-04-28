import { useNavigation } from '@react-navigation/native'
import React, { useState }  from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import {FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import {Avatars} from "../avatars"
import { doc, setDoc } from 'firebase/firestore';
import { firestoreDB } from '../config/firebase.config';
import { useSelector } from 'react-redux';

const AddToChat = () => {
    const navigation = useNavigation();
    const [addChat, setAddChat] = useState("");
    const createNewChat = async () => {
        let id = `${Date.now()}`

        const _doc = {
            _id : id,
            chatName: addChat
        }

        if(addChat !== ""){
            setDoc(doc(firestoreDB, "chats", id), _doc).then(()=>{
                setAddChat("")
                navigation.replace("HomeScreen")
            }).catch((error) => {
                alert("Error: ", error);
            })
        }
    }
    return (
      <View className="flex-1">
        <View className="w-full bg-primarybgr px-4 py-6 flex-[0.25]">
            <View className="flex-row items-center justify-between w-full px-4 py-12">
                {/* go back */}
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="chevron-left" size={40} color={"#555"}/>
                </TouchableOpacity>
                {/* middle */}

                {/* last section */}
                <View className="flex-row items-center justify-center space-x-3">
                    <Avatars  resizeMode="cover" />
                </View>
            </View>
        </View>
        {/* bottom section */}
            <View className="w-full bg-white px-4 py-6 rounded-3xl flex-1 rounded-t-[50px] -mt-10">
                <View className="w-full px-4 py-4">
                    <View className="w-full px-4 flex-row items-center justify-between py-3 roundeed-xl border border-gray-200 space-x-3">
                        {/* icon */}
                        <Ionicons name="chatbubbles" size={24} color={"#777"}/>
                        {/* text input */}
                        <TextInput className="flex-1 text-lg text-primaryText -mt-2 h-12 w-full" 
                        placeholder="Create a chat" 
                        placeholderTextColor={"#999"}
                        value={addChat}
                        onChangeText={(text) => setAddChat(text)}
                        />
                        {/* icon */}
                        <TouchableOpacity onPress={createNewChat}>
                            <FontAwesome name="send" size={24} color="#777"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
      </View>
    )
  
}

export default AddToChat
