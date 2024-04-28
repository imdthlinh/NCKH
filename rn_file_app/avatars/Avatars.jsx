import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import axios from 'axios';

const Avatars = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getRandomUser = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/');
        const userData = response.data.results[0];
        setUser(userData);
      } catch (error) {
        console.error('Lỗi khi tạo người dùng ngẫu nhiên:', error);
      }
    };

    getRandomUser();
  }, []);

  if (!user) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Image source={{ uri: user.picture.large}}
      style={{width: 75, height: 78, borderRadius: 100, resizeMode: 'cover', justifyContent: 'space-between', right: 4, bottom: 5}}
      />
    </View>
  );
};

export default Avatars;