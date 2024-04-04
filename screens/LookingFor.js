import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { getRegistrationProgress, saveRegistrationProgress } from '../registrationUtils';

const LookingFor = () => {
  const [lookingFor, setlookingFor] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    getRegistrationProgress('LookingFor').then(progressData => {
      if(progressData){
        setlookingFor(progressData.lookingFor)
      }
    })
  },[])
  const handleNext = () => {
    if(lookingFor.trim() !== '' ){
      saveRegistrationProgress('LookingFor',{lookingFor})
    }
    navigation.navigate("Hometown")
  }
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
          What's your dating intention?
        </Text>
        <View style={{ marginTop: 30, flexDirection: 'column', gap: 12 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontSize: 15 }}>Life Partner</Text>
            <Pressable onPress={() => setlookingFor('Life Partner')}>
              <FontAwesome
                name="circle"
                size={26}
                color={lookingFor == 'Life Partner' ? '#581845' : '#f0f0f0'}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontSize: 15 }}>
              Long-term relationship open to short
            </Text>
            <Pressable
              onPress={() =>
                setlookingFor('Long-term relationship open to short')
              }>
              <FontAwesome
                name="circle"
                size={26}
                color={
                  lookingFor == 'Long-term relationship open to short'
                    ? '#581845'
                    : '#f0f0f0'
                }
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontSize: 15 }}>Long-term relationship</Text>
            <Pressable onPress={() => setlookingFor('Long-term relationship')}>
              <FontAwesome
                name="circle"
                size={26}
                color={
                  lookingFor == 'Long-term relationship' ? '#581845' : '#f0f0f0'
                }
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontSize: 15 }}>Short-term relationship</Text>
            <Pressable onPress={() => setlookingFor('Short-term relationship')}>
              <FontAwesome
                name="circle"
                size={26}
                color={
                  lookingFor == 'Short-term relationship'
                    ? '#581845'
                    : '#f0f0f0'
                }
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontSize: 15 }}>
              Short-term relationship open to long
            </Text>
            <Pressable
              onPress={() =>
                setlookingFor('Short-term relationship open to long')
              }>
              <FontAwesome
                name="circle"
                size={26}
                color={
                  lookingFor == 'Short-term relationship open to long'
                    ? '#581845'
                    : '#f0f0f0'
                }
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontSize: 15 }}>Figuring out my dating goals</Text>
            <Pressable
              onPress={() => setlookingFor('Figuring out my dating goals')}>
              <FontAwesome
                name="circle"
                size={26}
                color={
                  lookingFor == 'Figuring out my dating goals'
                    ? '#581845'
                    : '#f0f0f0'
                }
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
          <AntDesign
            name="checksquare"
            size={26}
            color={'#581845'}
          />
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

export default LookingFor;

const styles = StyleSheet.create({});
