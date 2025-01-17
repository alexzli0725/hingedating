import { SafeAreaView, StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import { saveRegistrationProgress } from '../registrationUtils';
const LocationScreen = () => {
  const [location, setLocation] = useState('');
  const navigation = useNavigation();
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const handleNext = () => {
    saveRegistrationProgress('Location',{location})
    navigation.navigate("Gender")
  }
  const [coordinates] = useState([
    {
      latitude: 12.9716,
      longitude: 77.5946,
    },
    {
      latitude: 13.0451,
      longitude: 77.6269,
    },
  ]);
  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setRegion({ ...region, latitude, longitude });

      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDJqEKwV49K0ycxK_os6f9ZgKuv6pJHINA`,
      )
        .then(response => response.json())
        .then(data => {
          console.log('data', data);
          if (data.results.length > 0) {
            setLocation(data.results[0].formatted_address);
          }
        })
        .catch(error => console.log('Error fetching the location'));
    });
  }, []);
  console.log('location', location);
  const handleMarkerDragEnd = coordinate => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinate.latitude},${coordinate.longitude}&key=AIzaSyDJqEKwV49K0ycxK_os6f9ZgKuv6pJHINA`,
    )
      .then(response => response.json())
      .then(data => {
        console.log('New location'.data);
        if (data.results.length > 0) {
          const addressComponents = data?.results[0].address_components;
          let formattedAddress = '';
          for (let component of addressComponents) {
            if (component.types.includes('route')) {
              formattedAddress += component.long_name + ', ';
            }
            if (component.types.includes('sublocality_level_1')) {
              formattedAddress += component.long_name + ', ';
            }
            if (component.types.includes('locality')) {
              formattedAddress += component.long_name + ', ';
            }
          }
          formattedAddress = formattedAddress.trim().slice(0, -1);
          setLocation(formattedAddress);
        }
      })
      .catch(error => console.log('Error fetching the location'));
  };
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
              name="location-exit"
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
          Where do you live?
        </Text>
        <MapView
          initialRegion={{
            latitude: 13.0451,
            longitude: 77.6269,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={{
            width: '100%',
            height: 500,
            marginTop: 20,
            borderRadius: 5,
          }}>
          <Marker
            onDragEnd={e => handleMarkerDragEnd(e.nativeEvent.coordinate)}
            draggable
            coordinate={coordinates[1]}>
            <View
              style={{
                backgroundColor: 'black',
                padding: 12,
                borderRadius: 20,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: '500',
                  color: 'white',
                }}>
                {location}
              </Text>
            </View>
          </Marker>
        </MapView>
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          style={{marginTop: 20, marginLeft: 'auto'}}>
          <MaterialCommunityIcons
            name="arrow-right-circle"
            size={45}
            color="#581845"
            style={{alignSelf: 'center', marginTop: 20}}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({});
