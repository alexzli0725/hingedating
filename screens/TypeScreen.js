import {
  StyleSheet,
  Text,
  Pressable,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity
} from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
import { getRegistrationProgress, saveRegistrationProgress } from '../registrationUtils';
const TypeScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    getRegistrationProgress('Type').then(progressData => {
      if(progressData){
        settype(progressData.type || '')
      }
    })
  },[])
  const handleNext = () => {
    if(type.trim() !== '') {
      saveRegistrationProgress('Type', {type})
    }
    navigation.navigate("Dating")
  }
  const [type, settype] = useState('');
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
          What's your sexuality
        </Text>
        <Text style={{ marginTop: 30, fontSize: 15, color: 'gray' }}>
          Hinge users are matched based on these three gender groups. You can
          add more about gender after
        </Text>
        <View style={{ marginTop: 30, flexDirection: 'column', gap: 12 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontSize: 15 }}>Straight</Text>
            <Pressable onPress={() => settype('Straight')}>
              <FontAwesome
                name="circle"
                size={26}
                color={type == 'Straight' ? '#581845' : '#f0f0f0'}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontSize: 15 }}>Gay</Text>
            <Pressable onPress={() => settype('Gay')}>
              <FontAwesome
                name="circle"
                size={26}
                color={type == 'Gay' ? '#581845' : '#f0f0f0'}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontSize: 15 }}>Lesbian</Text>
            <Pressable onPress={() => settype('Lesbian')}>
              <FontAwesome
                name="circle"
                size={26}
                color={type == 'Lesbian' ? '#581845' : '#f0f0f0'}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontSize: 15 }}>Bisexual</Text>
            <Pressable onPress={() => settype('Bisexual')}>
              <FontAwesome
                name="circle"
                size={26}
                color={type == 'Bisexual' ? '#581845' : '#f0f0f0'}
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
          <AntDesign name="checksquare" size={26} color={type == '#581845'} />
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

export default TypeScreen;

const styles = StyleSheet.create({});
