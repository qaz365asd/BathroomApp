import { StyleSheet, View, Dimensions } from "react-native";
import { useEffect, useState, useRef } from "react";
import * as React from "react";
import MapView, { Marker } from "react-native-maps";
import BottomSheet from "react-native-gesture-bottom-sheet";

import * as Location from "expo-location";
import AddButton from "./MainMap/AddButton";
import WashroomTab from "./WashroomTab";

const defaultMarkers = [
   { latitude: 49.2827, longitude: -123.1207 },
   { latitude: 49.4, longitude: -123.15 },
];

export default function App(this: any) {
   const bottomSheet = useRef();
   const [markers, setMarkers] = useState(defaultMarkers);
   const [route, setRoute] = useState("main");
   const [currentCoords, setCurrentCoords] = useState<{
      latitude: number | null;
      longitude: number | null;
   }>({ latitude: null, longitude: null });

   useEffect(() => {
      (async () => {
         let { status } = await Location.requestForegroundPermissionsAsync();
         if (status !== "granted") {
            console.log("Permission to access location was denied");
         }
         let location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest,
         });
         const { latitude, longitude } = location.coords;
         setCurrentCoords({ latitude: latitude, longitude: longitude });
      })();
   }, []);

   if (
      route === "main" &&
      currentCoords.latitude !== null &&
      currentCoords.longitude !== null
   ) {
      return (
         <View style={styles.container}>
            <MapView
               style={styles.map}
               initialRegion={{
                  latitude: currentCoords.latitude,
                  longitude: currentCoords.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
               }}
            >
               {markers.map((marker, index) => (
                  <Marker
                     key={index}
                     coordinate={{
                        latitude: marker.latitude,
                        longitude: marker.longitude,
                     }}
                     onPress={(e) => {
                        bottomSheet.current.show();
                     }}
                  />
               ))}
            </MapView>
            <BottomSheet
               hasDraggableIcon
               draggable={false}
               ref={bottomSheet}
               height={400}
               sheetBackgroundColor="#fff"
            >
               <WashroomTab
                  title="The ICICS Building Washroom"
                  address="ICICS Building Third Floor"
                  reviews={[
                     "lol this bathroom stinks",
                     "yeah not good",
                     "dang the smell",
                  ]}
               ></WashroomTab>
            </BottomSheet>
            <View style={styles.buttonContainer}>
               <AddButton
                  onPress={() => {
                     setRoute("form");
                  }}
                  title={"Add"}
               />
            </View>
         </View>
      );
   } else if (route === "form") {
      return (
         <View style={styles.container}>
            <AddButton
               onPress={() => {
                  setRoute("main");
               }}
               title={"Go Back"}
            />
         </View>
      );
   }

   return <View />;
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 50,
   },
   map: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
   },
   buttonContainer: {
      position: "absolute",
      bottom: 20,
      right: 20,
   },
});
