import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as React from 'react';
import MapView from 'react-native-maps';
import Form from "./Form/Form";

export default function App() {
  return (
//     <View style={styles.container}>
//       <MapView style={styles.map}
//        initialRegion={{
//         latitude: 48.2827,
//         longitude: -123.1207,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       }}/>
//
//       <StatusBar style="auto" />
//
//     </View>
    <View style={styles.container}>
    <Form/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
