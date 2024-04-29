import { useNavigation } from "@react-navigation/native";
import React, { useState, useRef, useLayoutEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
  TextInput,
} from "react-native";
import {
  FontAwesome5,
  FontAwesome,
  Ionicons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { firestoreDB } from "../config/firebase.config";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
} from "firebase/firestore";

const ChatScreen = ({ route }) => {
  const { room } = route.params;
  // console.log("room: ", room);
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(null);

  const textInputRef = useRef(null);

  const user = useSelector((state) => state?.user?.user);
  const handleKeyboardOpen = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  const sendMessage = async () => {
    const timeStamp = serverTimestamp();
    const id = `${(Date, now())}`;
    const _doc = {
      _id: id,
      roomId: room._id,
      timeStamp: timeStamp,
      message: message,
      user: user,
    };

    setMessage("");
    await addDoc(
      collection(doc(firestoreDB, "chats", room._id), "messages"),
      _doc
    )
      .then(() => {})
      .catch((err) => alert(err));
  };

  {
    /*
  useLayoutEffect(() => {
    const msgQuery = query(
      collection(firestoreDB, "chats", room?._id, "messages"),
      orderBy("timeStamp", "asc")
    );

    const unsubscribe = onSnapshot(msgQuery, (querySnap) => {
      const upMsg = querySnap.docs.map((doc) => doc.data());
      setMessages(upMsg);
      setisLoading(false);
    });

    return unsubscribe;
  }, []);

*/
  }
  return (
    <View className="flex-1">
      <View className="w-full bg-primarybgr px-4 py-6 flex-[0.25]">
        <View className="flex-row items-center justify-between w-full px-4 py-12">
          {/* go back */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="chevron-left" size={40} color={"#555"} />
          </TouchableOpacity>
          {/* middle */}

          <View className="flex-row items-center justify-center space-x-3">
            <View className="w-12 h-12 rounded-full border border-white flex items-center justify">
              <FontAwesome5 name="users" size={35} color="#fbfbfb" />
            </View>
            <View>
              <Text className="text-gray-50 text-base font-semibold capitalize">
                {/* {room.chatName.length > 16
                  ? `${room.chatName.slice(0, 16)}..`
                  : room.chatName}{" "} */}
              </Text>
              <Text className="text-gray-50 text-base font-semibold capitalize">
                online
              </Text>
            </View>
          </View>

          {/* last section */}
          <View className="flex-row items-center justify-center space-x-3">
            <View className="w-12 h-12 rounded-full border border-white flex items-center justify">
              <FontAwesome5 name="video" size={30} color="#fbfbfb" />
            </View>
            <View className="w-12 h-12 rounded-full border border-white flex items-center justify">
              <FontAwesome5 name="phone" size={30} color="#fbfbfb" />
            </View>
            <View className="w-12 h-12 rounded-full border border-white flex items-center justify">
              <Entypo name="dots-three-vertical" size={30} color="#fbfbfb" />
            </View>
          </View>
        </View>
      </View>
      {/* bottom section */}
      <View className="w-full bg-white px-4 py-6 rounded-3xl flex-1 rounded-t-[50px] -mt-10">
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "android" ? "padding" : "height"}
          keyboardVerticalOffset={50}
        >
          <>
            <ScrollView>
              {isLoading ? (
                <>
                  <View className="w-full flex items-center justify-center">
                    <ActivityIndicator size={"large"} color={"#43C651"} />
                  </View>
                </>
              ) : (
                <>
                  {/* message */}
                  {messages?.map((msg, i) =>
                    msg.user.providerData.email === user.providerData.email ? (
                      <>
                        <View className="m-1" key={i}>
                          <View className="px-4 py-2 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl bg-primary w-auto relative">
                            <Text className="text-base font-semibold text-white">
                              {msg.message}
                            </Text>
                          </View>
                        </View>
                      </>
                    ) : (
                      <>
                        <View key={i}></View>
                      </>
                    )
                  )}
                </>
              )}
            </ScrollView>

            <View className="w-full flex-row items-center justify-center px-8">
              <View className="bg-gray-200 rounded-2xl px-4 space-x-4 py-2 flex-row items-center justify-center">
                <TouchableOpacity onPress={handleKeyboardOpen}>
                  <Entypo name="emoji-happy" size={24} color="#555" />
                </TouchableOpacity>

                <TextInput
                  className="flex-1 h-8 text-base text-primaryText font-semibold"
                  placeholder="Type here..."
                  placeholderTextColor={"#999"}
                  value={message}
                  onChangeText={(text) => setMessage(text)}
                />

                <TouchableOpacity>
                  <Entypo name="mic" size={24} color="#43C651" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity className="pl-4" onPress={sendMessage}>
                <FontAwesome name="send" size={24} color="#555" />
              </TouchableOpacity>
            </View>
          </>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default ChatScreen;
