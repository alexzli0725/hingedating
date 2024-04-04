import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';
import { saveRegistrationProgress, getRegistrationProgress } from '../registrationUtils';
const EmailScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const handleNext = () => {
    if(email.trim() !== '' ) {
      saveRegistrationProgress('Email',{email})
    }
    navigation.navigate('Password');
  };
  useEffect(() => {
    getRegistrationProgress('Email').then((progressData) => {
      if (progressData) {
        setEmail(progressData.email || '');
      }
    });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ marginTop: 90, marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              borderWidth: 2,
              borderColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Fontisto name="email" size={26} color="black" />
          </View>
          <Image
            style={{ width: 100, height: 40 }}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginTop: 15,
          }}>
          Please provide a valid email
        </Text>
        <Text style={{ marginTop: 10, fontSize: 15, color: 'gray' }}>
          Email verification helps us keep the account secure
        </Text>
        <TextInput
          autoFocus={true}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Enter your email"
          placeholderTextColor={'#bebebe'}
          style={{
            width: 340,
            marginVertical: 10,
            marginTop: 25,
            fontFamily: 'GeezaPro-Bold',
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            paddingBottom: 10,
            fontSize: email ? 22 : 22,
          }}
        />
        <Text style={{ color: 'gray', marginTop: 7, fontSize: 15 }}>
          Note: You will be asked to verify your email
        </Text>
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          style={{ marginTop: 30, marginLeft: 'auto' }}>
          <MaterialCommunityIcons
            style={{ alignSelf: 'center', marginTop: 20 }}
            name="arrow-right-circle"
            size={45}
            color="#581845"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EmailScreen;

const styles = StyleSheet.create({});
