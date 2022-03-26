
import * as React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text, StyleProp, TextStyle } from "react-native";

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 16
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});

interface AddButtonProps {
    onPress: () => void;
    title: String;
}

const AppButton: React.FC<AddButtonProps> = ({ onPress, title})  => {
    
    return (
        <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>{title}</Text>
        </TouchableOpacity>
    );

};

export default AppButton;