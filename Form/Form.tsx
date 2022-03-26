import * as React from "react";
import { SafeAreaView, StyleSheet,
TextInput, Button, View, Alert, ImageBackground} from "react-native";

const Form = () => {
  const [text, onChangeText] = React.useState(null);
  const [number, onChangeNumber] = React.useState(null);
  const [number2, ChangeNumber] = React.useState(null);



  return (
  <View>
    <View
         style={{
            flex: 3,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={onChangeText}
        value={text}
        placeholder="Title"
      />
      <TextInput
        style={styles.textInputStyle}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Longitude"
        keyboardType="numeric"
      />
       <TextInput
              style={styles.textInputStyle}
              onChangeText={ChangeNumber}
              value={number2}
              placeholder="Latitude"
              keyboardType="numeric"
            />
            </View>
            <View
                style={{flex: 3,
                           flexDirection: "column",
                           justifyContent: "center",
                           alignItems: "center"
                         }}>
            <Button
                    title="Submit"
                    onPress={() => Alert.alert('Submit succeed')}

                  />
    </View>

    </View>
  );
};

const styles = StyleSheet.create({
  textInputStyle: {
              width:170,
              height:40,
              margin:20,
              borderWidth: 1,
              padding: 10,
          },


});

export default Form;



