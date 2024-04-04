import { SafeAreaView, StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../AuthContext';
import { getRegistrationProgress } from '../registrationUtils';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PreFinalScreen = () => {
  const [userData, setuserData] = useState();
  const { token, settoken } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (token) {
      navigation.replace('MainStack', { screen: 'Main' });
    }
  }, [token]);
  useEffect(() => {
    getAllUserData();
  }, []);
  const getAllUserData = async () => {
    try {
      const screens = [
        'Name',
        'Email',
        'Password',
        'Birth',
        'Location',
        'Gender',
        'Type',
        'Dating',
        'LookingFor',
        'Hometown',
        'Photos',
        'Prompts',
      ];
      let userData = {};
      for (const screenName of screens) {
        const screenData = await getRegistrationProgress(screenName);
        if (screenData) {
          userData = { ...userData, ...screenData };
        }
      }

      setuserData(userData);
    } catch (error) {
      console.log('Error', error.message);
    }
  };
  
  console.log('data', userData);
  const clearAllScreenData = async() => {
    try{
      const screens = [
        'Name',
        'Email',
        'Password',
        'Birth',
        'Location',
        'Gender',
        'Type',
        'Dating',
        'LookingFor',
        'Hometown',
        'Photos',
        'Prompts',
      ];
      for(const screenName of screens){
        const key = `registration_progress_${screenName}`
        await AsyncStorage.removeItem(key)
      }
      console.log("All screen data cleared!")
    }catch(error){
      console.log("Error",error.message)
    }
  }
  const registerUser = async () => {
    try {
      const response = axios
        .post('http:/localhost:3000/register', userData)
        .then(response => {
          console.log(response);
          const token = response.data.token;
          AsyncStorage.setItem('token', token);
          settoken(token);
        });

        clearAllScreenData();
    } catch (error) {
      console.log('Error', error.message);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ marginTop: 80 }}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginLeft: 20,
          }}>
          All set to register
        </Text>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginLeft: 20,
          }}>
          Setting up your profile for you
        </Text>
      </View>
      <View>
        <LottieView
          style={{
            height: 260,
            width: 300,
            fontFamily: 'GeezaPro-Bold',
            alignSelf: 'center',
            marginTop: 40,
            justifyContent: 'center',
          }}
          source={require('../assets/love.json')}
          autoPlay
          loop={true}
          speed={0.7}
        />
      </View>
      <Pressable
        onPress={registerUser}
        style={{ backgroundColor: '#908', padding: 15, marginTop: 'auto' }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontWeight: '600',
            fontSize: 15,
          }}>
          Finish Registering
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default PreFinalScreen;

const styles = StyleSheet.create({});
