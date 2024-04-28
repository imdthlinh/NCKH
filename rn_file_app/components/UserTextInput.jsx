import React, {useLayoutEffect, useState} from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { MaterialIcons, Entypo  } from '@expo/vector-icons';

const UserTextInput = ({placeholder, isPass, setStateValue, setGetEmailValidationSatus}) =>  { 
    const[value, setValue] = useState("");
    const [showPass, setShowPass] = useState(true);
    const [icon, setIcon] = useState(null);
    const [isEmailValid, setIsEmailValid] = useState(false);

    const handleTextChanged = (text) => {
        setValue(text);
        setStateValue(value);

        if(placeholder === "Email"){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const status = emailRegex.test(value);
            console.log(status);
            setIsEmailValid(status);
            setGetEmailValidationSatus(status);
        }
    };

    useLayoutEffect(() => {
        switch (placeholder) {
            case "Full Name":
                return setIcon("person");
            case "Email":
                return setIcon("email");
            case "Password":
                return setIcon("lock");
        }
    }, []);

    return (
      <View className={`border rounder-2xl px-4 py-6 flex-row items-center 
        justify-between space-x-4 my-2 
        ${
            !isEmailValid && placeholder == "Email" && value.length > 0 ? "border-red-500" : "border-gray-200"
        }`}>
         <MaterialIcons name={icon} size={24} color="black" />
        <TextInput
            className="flex-1 text-base text-primaryText font-semibold -mt-1"
            placeholder={placeholder}
            value={value}
            onChangeText={handleTextChanged}
            secureTextEntry={isPass && showPass}
            autoCapitalize="none"
        />
        
        {isPass && (
                <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                    <Entypo 
                        name={`${showPass ?"eye" : "eye-with-line"}`}
                        size={24}
                        color={"#6c6d83"}
                    />
                </TouchableOpacity>
            )}
      </View>
    )
}

export default UserTextInput;
