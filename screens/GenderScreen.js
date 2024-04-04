import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../registrationUtils';
const GenderScreen = () => {
  const navigation = useNavigation();

  const handleNext = () => {
    if (gender.trim() !== '') {
      saveRegistrationProgress('Gender', { gender });
    }
    navigation.navigate('Type');
  };
  const [gender, setgender] = useState('');
  useEffect(() => {
    getRegistrationProgress('Gender').then(progressData => {
      if (progressData !== null) {
        setgender(progressData.gender || '');
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
            <MaterialCommunityIcons
              name="newspaper-variant-outline"
              size={26}
              color="black"
            />
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
          Which gender describes you the best
        </Text>
        <Text style={{ marginTop: 30, fontSize: 15, color: 'gray' }}>
          Hinge users are matched based on these three gender groups. You can
          add more about gender after
        </Text>
        <View style={{ marginTop: 30 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontSize: 15, fontWeight: '500' }}>Men</Text>
            <Pressable onPress={() => setgender('Men')}>
              <FontAwesome
                name="circle"
                size={26}
                color={gender == 'Men' ? '#581845' : '#f0f0f0'}
              />
            </Pressable>
          </View>
          <View
            style={{
              marginTop: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontSize: 15, fontWeight: '500' }}>Women</Text>
            <Pressable onPress={() => setgender('Women')}>
              <FontAwesome
                name="circle"
                size={26}
                color={gender == 'Women' ? '#581845' : '#f0f0f0'}
              />
            </Pressable>
          </View>
          <View
            style={{
              marginTop: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontSize: 15, fontWeight: '500' }}>Non Binary</Text>
            <Pressable onPress={() => setgender('Non Binary')}>
              <FontAwesome
                name="circle"
                size={26}
                color={gender == 'Non Binary' ? '#581845' : '#f0f0f0'}
              />
            </Pressable>
          </View>
        </View>
        <View
          style={{
            marginTop: 30,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}>
          <AntDesign name="checksquare" size={26} color={gender == '#581845'} />
          <Text style={{ fontSize: 15 }}>Visible on profile</Text>
        </View>
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          style={{ marginTop: 20, marginLeft: 'auto' }}>
          <MaterialCommunityIcons
            name="arrow-right-circle"
            size={45}
            color="#581845"
            style={{ alignSelf: 'center', marginTop: 20 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GenderScreen;

const styles = StyleSheet.create({});
