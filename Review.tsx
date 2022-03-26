import { StyleSheet, View, Dimensions, ScrollView, Text } from "react-native";
import * as React from "react";
import { Rating } from "react-native-ratings";

interface ReviewProps {
   description: string;
}

function Review({ description }: ReviewProps) {
   return (
      <View style={styles.review}>
         <Text style={styles.scrollviewinner}>Anonymous User</Text>
         <View style={styles.scrollviewinner}>
            <Text
               style={{
                  marginLeft: 10,
                  marginRight: 10,
                  fontSize: 14,
                  color: "grey",
               }}
            >
               Rating:
            </Text>
            <Rating
               type="star"
               ratingCount={5}
               imageSize={20}
               readonly={true}
               ratingBackgroundColor="#fff"
               tintColor="#fff"
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
               Review:
            </Text>
            <Text key={description}>{description}</Text>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   review: {},
   scrollviewinner: {
      marginTop: 10,
      flexDirection: "row",
      justifyContent: "flex-start",
   },
});

export default Review;
