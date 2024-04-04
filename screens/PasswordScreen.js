import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { saveRegistrationProgress } from '../registrationUtils';
const PasswordScreen = () => {
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const handleNext = () => {
    if(password.trim() !== '') {
      saveRegistrationProgress('Password',{password})
    }
    navigation.navigate("Birth")
  }
  return (
    <SafeAreaView>
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
            <AntDesign name="lock1" size={26} color="#581845" />
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
          Please choose a password
        </Text>
        <TextInput
          autoFocus={true}
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Enter your password"
          placeholderTextColor={'#bebebe'}
          style={{
            width: 340,
            marginVertical: 10,
            marginTop: 25,
            fontFamily: 'GeezaPro-Bold',
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            paddingBottom: 10,
            fontSize: password ? 22 : 22,
          }}
        />
        <Text style={{color:"gray",fontSize:15,marginTop:7}}>Note: Your details will be safe with us</Text>
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

export default PasswordScreen;

const styles = StyleSheet.create({});