import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { saveRegistrationProgress, getRegistrationProgress } from '../registrationUtils';

const HomeTownScreen = () => {
  const [hometown, sethometown] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    getRegistrationProgress('Hometown').then(progressData => {
      if(progressData){
        sethometown(progressData.hometown)
      }
    })
  },[])
  const handleNext = () => {
    if(hometown.trim() !== ''){
      saveRegistrationProgress('Hometown',{hometown})
    }
    navigation.navigate('Photos');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ marginHorizontal: 20, marginTop: 90 }}>
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
            <AntDesign name="hearto" size={26} color="black" />
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
          Where's your hometown?
        </Text>
        <TextInput
          autoFocus={true}
          value={hometown}
          onChangeText={text => sethometown(text)}
          placeholder="HomeTown"
          placeholderTextColor={'#bebebe'}
          style={{
            width: 340,
            marginVertical: 10,
            marginTop: 25,
            fontFamily: 'GeezaPro-Bold',
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            paddingBottom: 10,
            fontSize: hometown ? 22 : 22,
          }}
        />
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

export default HomeTownScreen;

const styles = StyleSheet.create({});
