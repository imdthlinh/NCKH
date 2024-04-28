import React, { useLayoutEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import {useSelector, Provider} from 'react-redux'
import {Avatars} from "../avatars"
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


const HomeScreen = () =>  {
  const[isLoading, setIsLoading] = useState(true);
  const [chats, setChats] = useState(null);

  const navigation = useNavigation();
  useLayoutEffect(() =>{

  }, [])
    return (
      <View className="flex-1">
        <SafeAreaView>
          <View className="w-full flex-row items-center justify-between px-4 py-2">
            {/* Back button */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="chevron-left" size={40} color={"#555"}/>
            </TouchableOpacity>
            {/* Avatar */}
            <TouchableOpacity className="w-20 h-20 p-1 rounded-full border-2 bg-primarybgr relative">
            <Avatars  resizeMode="cover" />
            </TouchableOpacity>
          </View>
          {/* scrolling area */}
          <ScrollView className="w-full px-4 pt-4">
            <View className="w-full">
              {/* message title */}
              <View className="w-full flex-row items-center justify-between px-2">
                <Text className="text-primaryText text-base font-extrabold pb-2">
                  Messages
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("AddToChat")}>
                  <Ionicons name="chatbox" size={28} color="#555"/>
                </TouchableOpacity>
              </View>
              {/* messages card */}
              {isLoading ? (
              <>
                <View className="w-full flex items-center justify-center">
                  <ActivityIndicator size={"large"} color={"#43C651"}/>
                </View>
              </>
              ) : (
                <>
                  <MessageCard/>
                  <MessageCard/>
                  <MessageCard/>
                  <MessageCard/>
                  <MessageCard/>
                  <MessageCard/>
                  <MessageCard/>
                  <MessageCard/>
                  <MessageCard/>
                  <MessageCard/>
                  <MessageCard/>
                </>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    )
}

const MessageCard = () => {
  return (
    <TouchableOpacity className="w-full flex-row items-center justify-start py-2">
      {/* images */}
      <View className="w-16 h-16 rounded-full flex items-center border-2 border-primary p-1 justify-center">
        <FontAwesome5 name="users" size={24} color="#555"/>
      </View>
      {/* content */}
      <View className="flex-1 flex items-start justify-center ml-4">
        <Text className="text-[#333] text-base font-semibold capitalize">
          Messages title
        </Text>
        <Text className="text-primaryText text-sm">
          Hello, welcome back to my app...
        </Text>
      </View>
      {/* time text */}
      <Text className="text-primay px-4 text-base font-semibold">27 min</Text>
    </TouchableOpacity>
  )
}

export default HomeScreen;
