import * as React from "react";
import { StyleSheet, TextInput, Button, View, Alert } from "react-native";

interface FormProps {
   onExit: () => void;
   onAdd: (title: string, latitude: string, longitude: string) => void;
}

const Form: React.FC<FormProps> = ({ onAdd, onExit }) => {
   const [text, onChangeText] = React.useState("");
   const [number, onChangeNumber] = React.useState("");
   const [number2, ChangeNumber] = React.useState("");

   return (
      <View style={{ marginTop: 200 }}>
         <View
            style={{
               flex: 3,
               flexDirection: "column",
               justifyContent: "center",
               alignItems: "center",
            }}
         >
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
            />
            <TextInput
               style={styles.textInputStyle}
               onChangeText={ChangeNumber}
               value={number2}
               placeholder="Latitude"
            />
         </View>
         <View
            style={{
               flex: 2,
               flexDirection: "row",
               justifyContent: "space-between",
               alignItems: "center",
            }}
         >
            <Button
               title="Submit"
               onPress={() => {
                  onAdd(text, number, number2);
                  onExit();
               }}
            />
            <Button title="Return" onPress={onExit} />
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   textInputStyle: {
      width: 170,
      height: 40,
      margin: 20,
      borderWidth: 1,
      padding: 10,
   },
});

export default Form;
