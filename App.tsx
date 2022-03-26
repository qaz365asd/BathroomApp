import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Dimensions, Text} from 'react-native';
import { useState } from 'react';
import * as React from 'react';
import MapView, {Marker} from 'react-native-maps';
import AddButton from './MainMap/AddButton';

const defaultMarkers = [{latitude: 49.2827, longitude: -123.1207},{latitude: 49.4, longitude: -123.15}];

export default function App(this: any) {
   const [markers, setMarkers] = useState(defaultMarkers);
   const [isMain, setIsMain] = useState(true);

  return (
    <View  style={styles.container}>
      {isMain ?
        <View>
          <MapView style={styles.map}
          initialRegion={{
            latitude: 49.2827,
            longitude: -123.1207,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
            {markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
              />))}
          </MapView>
          <View style={styles.buttonContainer}>
            <AddButton onPress={()=>{setIsMain(!isMain)}} title={"Add"}/>
          </View>
        </View>  :
        <View></View>
      }
      {/* { isMain 
      ? 
      <View style={styles.container}>
        <MapView style={styles.map}
        initialRegion={{
          latitude: 49.2827,
          longitude: -123.1207,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
            />))}
        </MapView>
        <View style={styles.buttonContainer}>
          <AddButton onPress={()=>{setIsMain(!isMain)}} title={"Add"}/>
        </View>
      </View> 
      :
      null
      } */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  buttonContainer:{
    position: 'absolute',
    bottom: 20,
    right: 20
  }
});
