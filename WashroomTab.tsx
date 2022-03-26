import { StyleSheet, View, Dimensions, Text } from "react-native";
import * as React from "react";
import { Rating } from "react-native-ratings";
import { ScrollView } from "react-native-gesture-handler";
import Review from "./Review";

interface WashroomTabProps {
   title: string;
   address: string;
   reviews: string[];
}

function WashroomTab({ title, address, reviews }: WashroomTabProps) {
   return (
      <ScrollView contentContainerStyle={styles.scrollview}>
         <Text style={[styles.scrollviewinner, { fontSize: 24 }]}>{title}</Text>
         <View style={styles.scrollviewinner}>
            <Text
               style={{
                  marginLeft: 10,
                  marginRight: 10,
                  fontSize: 14,
                  color: "grey",
               }}
            >
               Average Rating:
            </Text>
            <Rating
               type="star"
               ratingCount={5}
               imageSize={20}
               readonly={true}
               style={{ marginLeft: 10, marginRight: 10 }}
            ></Rating>
         </View>
         <View style={styles.scrollviewinner}>
            <Text
               style={{
                  marginLeft: 10,
                  marginRight: 10,
                  fontSize: 14,
                  color: "grey",
               }}
            >
               Address:
            </Text>
            <Text
               style={{
                  marginLeft: 10,
                  marginRight: 10,
                  fontSize: 14,
                  color: "grey",
               }}
            >
               {address}
            </Text>
         </View>
         <Text style={[styles.scrollviewinner, { fontSize: 20 }]}>
            Add your review:
         </Text>
         <Rating
            type="star"
            ratingCount={5}
            imageSize={30}
            style={[
               styles.scrollviewinner,
               { marginLeft: 10, marginRight: 10 },
            ]}
         ></Rating>
         <Text style={[styles.scrollviewinner, { fontSize: 20 }]}>
            What other people say
         </Text>
         {reviews.map((review: string, index: number) => (
            <Review key={index} description={review}></Review>
         ))}
      </ScrollView>
   );
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
   scrollview: {
      flexGrow: 1,
      padding: 10,
   },
   review: {},
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
      justifyContent: "flex-start",
   },
});

export default WashroomTab;
