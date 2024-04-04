import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import 'core-js/stable/atob';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import UserChat from '../components/UserChat';

const ChatScreen = () => {
  const [matches, setmatches] = useState([]);
  const [userId, setUserId] = useState('');
  useEffect(() => {
    console.log('hi');
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);
  const fetchMatches = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/get-matches/${userId}`,
      );
      setmatches(response.data.matches);
    } catch (error) {
      console.log('Error', error);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchMatches();
    }
  }, [userId]);
  useFocusEffect(
    useCallback(() => {
      if (userId) {
        fetchMatches();
      }
    }, [userId]),
  );
  console.log('matches', matches);
  return (
    <ScrollView style={{marginTop:55,padding:12}}>
      <View>
        <Text style={{fontSize:20,fontWeight:"500"}}>Your Matches</Text>
        <View style={{marginVertical:12}}>
          {matches?.map((item,index) => (
            <UserChat key={index} userId={userId} item={item} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
