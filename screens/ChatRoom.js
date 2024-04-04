import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { io } from 'socket.io-client';
import axios from 'axios';
const ChatRoom = () => {
  const navigation = useNavigation();
  const [message, setmessage] = useState('');
  const [messages, setmessages] = useState([]);
  const route = useRoute();
  const socket = io('http://localhost:6000');
  socket.on('connect', () => {
    console.log('Connected to the server');
  });
  socket.on('receiveMessage', newMessage => {
    console.log(newMessage);
    setmessages(prevMessages => [...prevMessages, newMessage]);
  });
  const sendMessage = async (senderId, receiverId) => {
    console.log('hey');
    socket.emit('sendMessage', { senderId, receiverId, message });
    setmessage('');
    setTimeout(() => {
      fetchMessages();
    }, 200);
  };
  useLayoutEffect(() => {
    return navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="black" />
          <View>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              {route?.params?.name}
            </Text>
          </View>
        </View>
      ),
    });
  }, []);
  const fetchMessages = async () => {
    try {
      const senderId = route?.params?.senderId;
      const receiverId = route?.params?.receiverId;
      const response = await axios.get('http://localhost:3000/messages', {
        params: { senderId, receiverId },
      });
      setmessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMessages();
  }, []);
  console.log(messages);
  const formatTime = time => {
    const options = { hour: 'numeric', minute: 'numeric' };
    return new Date(time).toLocaleString('en-US', options);
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {messages?.map((item, index) => (
          <Pressable
            style={[
              item?.senderId == route?.params?.senderId
                ? {
                    alignSelf: 'flex-end',
                    backgroundColor: '#662d91',
                    padding: 8,
                    maxWidth: '60%',
                    borderRadius: 7,
                    margin: 10,
                  }
                : {
                    alignSelf: 'flex-start',
                    backgroundColor: '#452c63',
                    padding: 8,
                    maxWidth: '60%',
                    borderRadius: 7,
                    margin: 10,
                  },
            ]}
            key={index}>
            <Text
              style={{
                fontSize: 15,
                textAlign: 'left',
                color: 'white',
                fontWeight: '500',
              }}>
              {item?.message}
            </Text>
            <Text style={{ fontSize: 9, textAlign: 'right', color: '#f0f0f0' }}>
              {formatTime(item?.timestamp)}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: '#dddddd',
          marginBottom: 30,
        }}>
        <Entypo
          style={{ marginRight: 7 }}
          name="emoji-happy"
          size={24}
          color="black"
        />
        <TextInput
          value={message}
          onChangeText={text => setmessage(text)}
          style={{
            flex: 1,
            height: 40,
            backgroundColor: '#dddddd',
            borderWidth: 1,
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
          placeholder="Type your message"
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            marginHorizontal: 8,
          }}>
          <Entypo name="camera" size={24} color="gray" />

          <Feather name="mic" size={24} color="gray" />
        </View>
        <Pressable
          onPress={() =>
            sendMessage(route?.params?.senderId, route?.params?.receiverId)
          }
          style={{
            backgroundColor: '#662d91',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 20,
          }}>
          <Text style={{ textAlign: 'center', color: 'white' }}>Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({});
