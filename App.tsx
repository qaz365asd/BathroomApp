import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as React from 'react';
import MapView from 'react-native-maps';
import { Rating } from 'react-native-ratings';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import { useRef } from 'react';

export default function App() {
  const bottomSheet = useRef();
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
       initialRegion={{
        latitude: 49.2827,
        longitude: -123.1207,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        }} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => bottomSheet.current.show()}
      >
        <Text>Open modal</Text>
      </TouchableOpacity>
      <BottomSheet hasDraggableIcon draggable={false} ref={bottomSheet} height={400} sheetBackgroundColor="#fff">
        <WashroomTab title="The ICICS Building Washroom" address="ICICS Building Third Floor" reviews={["lol this bathroom stinks", "yeah not good", "dang the smell"]}></WashroomTab>
      </BottomSheet>
      <StatusBar style="auto" />
    </View>
  );
}

interface WashroomTabProps {
  title: string;
  address: string;
  reviews: string[]
} 

function WashroomTab({title, address, reviews}: WashroomTabProps) {
  return (
    <ScrollView contentContainerStyle={styles.scrollview}>
      <Text style={[styles.scrollviewinner, { fontSize: 24 }]}>{title}</Text>
      <View style={styles.scrollviewinner}>
        <Text style={{marginLeft: 10, marginRight: 10, fontSize: 14, color: "grey"}}>Average Rating:</Text>
        <Rating type='star'
          ratingCount={5}
          imageSize={20}
          readonly={true}
          style={{marginLeft: 10, marginRight: 10}}> 
        </Rating>
      </View>
      <View style={styles.scrollviewinner}>
        <Text style={{marginLeft: 10, marginRight: 10, fontSize: 14, color: "grey"}}>Address:</Text>
        <Text style={{marginLeft: 10, marginRight: 10, fontSize: 14, color: "grey"}}>{address}</Text>
      </View>
      <Text style={[styles.scrollviewinner, { fontSize: 20 }]}>Add your review:</Text>
      <Rating type='star'
        ratingCount={5}
        imageSize={30}
        style={[styles.scrollviewinner, {marginLeft: 10, marginRight: 10}]}> 
      </Rating>
      <Text style={[styles.scrollviewinner, { fontSize: 20 }]}>What other people say</Text>
      {reviews.map((review: string) => <Review description={review}></Review>)}
      </ScrollView>
  );
}

interface ReviewProps {
  description: string;
} 

function Review({ description }: ReviewProps) {
  return (
    <View style={styles.review}>
      <Text style={styles.scrollviewinner}>Anonymous User</Text>
      <View style={styles.scrollviewinner}>
        <Text style={{marginLeft: 10, marginRight: 10, fontSize: 14, color: "grey"}}>Rating:</Text>
        <Rating type='star'
          ratingCount={5}
          imageSize={20}
          readonly={true}
          ratingBackgroundColor="#fff"
          tintColor="#fff">
        </Rating>
      </View>
      <View style={styles.scrollviewinner}>
        <Text style={{marginLeft: 10, marginRight: 10, fontSize: 14, color: "grey"}}>Review:</Text>
        <Text key={description}>{description}</Text>
      </View>
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
  scrollview: {
    flexGrow: 1,
    padding: 10,
  },
  review: {

  },
  button: {
    height: 50,
    width: 150,
    backgroundColor: "#140078",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#8559da",
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    elevation: 6,
  },
  scrollviewinner: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: 'flex-start'
  }
});