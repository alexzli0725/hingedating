import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../registrationUtils';

const PhotoScreen = () => {
  useEffect(() => {
    getRegistrationProgress('Photos').then(progressData => {
      if (progressData && progressData.imageUrls) {
        setimageUrls(progressData.imageUrls);
      }
    });
  }, []);
  const handleNext = () => {
    saveRegistrationProgress('Photos', { imageUrls });
    navigation.navigate('Prompts');
  };
  const navigation = useNavigation();
  const [imageUrls, setimageUrls] = useState(['', '', '', '', '', '']);
  const [imageUrl, setimageUrl] = useState('');
  const handleAddImage = () => {
    const index = imageUrls?.findIndex(url => url === '');
    if (index !== -1) {
      const updatedUrls = [...imageUrls];
      updatedUrls[index] = imageUrl;
      setimageUrls(updatedUrls);
      setimageUrl('');
    }
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
            <MaterialIcons name="photo-camera-back" size={26} color="black" />
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
          Pick your photos and videos
        </Text>
        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 20,
              justifyContent: 'space-between',
            }}>
            {imageUrls?.slice(0, 3).map((url, index) => (
              <Pressable
                key={index}
                style={{
                  borderColor: '#581845',
                  borderWidth: url ? 0 : 2,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderStyle: 'dashed',
                  borderRadius: 10,
                  height: 100,
                }}>
                {url ? (
                  <Image
                    source={{ uri: url }}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 10,
                      resizeMode: 'cover',
                    }}
                  />
                ) : (
                  <EvilIcons name="image" size={22} color="black" />
                )}
              </Pressable>
            ))}
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 20,
              justifyContent: 'space-between',
            }}>
            {imageUrls?.slice(3, 6).map((url, index) => (
              <Pressable
                key={index}
                style={{
                  borderColor: '#581845',
                  borderWidth: url ? 0 : 2,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderStyle: 'dashed',
                  borderRadius: 10,
                  height: 100,
                }}>
                {url ? (
                  <Image
                    source={{ uri: url }}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 10,
                      resizeMode: 'cover',
                    }}
                  />
                ) : (
                  <EvilIcons name="image" size={22} color="black" />
                )}
              </Pressable>
            ))}
          </View>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ color: 'gray', fontSize: 15 }}>Drag to reorder</Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '500',
              color: '#581845',
              marginTop: 3,
            }}>
            Add four to six photos
          </Text>
        </View>
        <View style={{ marginTop: 25 }}>
          <Text>Add a picture of yourself</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 10,
              backgroundColor: '#dcdcdc',
            }}>
            <EvilIcons
              style={{ marginLeft: 8 }}
              name="image"
              size={22}
              color="black"
            />
            <TextInput
              value={imageUrl}
              onChangeText={text => setimageUrl(text)}
              style={{ color: 'gray', marginVertical: 10, width: 300 }}
              placeholder="Enter your image url"
            />
          </View>
          <Button onPress={handleAddImage} title="Add Image" />
        </View>
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

export default PhotoScreen;

const styles = StyleSheet.create({});
