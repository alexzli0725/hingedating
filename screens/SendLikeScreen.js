import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
const SendLikeScreen = () => {
  const route = useRoute();
  const [comment, setcomment] = useState('');
  const navigation = useNavigation();
  const likeProfile = async () => {
    try {
      const response = await axios.post('http://localhost:3000/like-profile', {
        userId: route.params.userId,
        likedUserId: route.params.likedUserId,
        image: route?.params?.image,
        comment: comment,
      });
      console.log(response);
      if(response.status == 200) {
        navigation.goBack();
      }
    } catch (error) {
      console.log('Error', error.message);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#faf9f6' }}>
      <View
        style={{
          marginTop: 'auto',
          marginBottom: 'auto',
          marginHorizontal: 40,
        }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
          {route?.params?.name}
        </Text>
        <Image
          style={{
            width: '100%',
            height: 350,
            resizeMode: 'cover',
            borderRadius: 10,
          }}
          source={{ uri: route?.params?.image }}
        />
        <TextInput
          placeholder="Add a comment"
          value={comment}
          onChangeText={text => setcomment(text)}
          style={{
            padding: 15,
            backgroundColor: 'white',
            borderRadius: 8,
            marginTop: 14,
            fontSize: comment ? 17 : 17,
          }}
        />
        <View
          style={{
            marginVertical: 12,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#ffc0cb',
              paddingHorizontal: 14,
              paddingVertical: 10,
              gap: 4,
              borderRadius: 22,
            }}>
            <Text>1</Text>
            <Ionicons name="rose-outline" size={22} color="black" />
          </View>
          <Pressable
            onPress={likeProfile}
            style={{
              backgroundColor: '#fffdd0',
              borderRadius: 20,
              padding: 10,
              flex: 1,
            }}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
              Send Like
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SendLikeScreen;

const styles = StyleSheet.create({});
