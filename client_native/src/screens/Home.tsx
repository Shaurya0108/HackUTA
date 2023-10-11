import React from "react";
import { View, Linking, Image } from "react-native";
import { MainStackParamList } from "../types/navigation";
import { getAuth, signOut } from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {
  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();

  return (
    <Layout>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Add the Image component with your image */}
        <Image
          source={require('../../assets/images/camry2.jpg')} // Replace with the correct path to your image
          style={{
            position: 'absolute', // Position the image
            top: 0, // Position it at the top
            width: '100%', // Make it take the full width
            height: 200, // Adjust the height as needed
          }}
        />

        {/* First Card/Box */}
        <View
          style={{
            backgroundColor: "#f0f0f0", // Background color of the card/box
            borderRadius: 10, // Border radius for rounded corners
            padding: 20, // Padding inside the card/box
            shadowColor: "#000", // Shadow color (if desired)
            shadowOffset: {
              width: 1,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 2,
            elevation: 2, // Elevation for Android shadow
            marginBottom: 50, // Add margin to separate the cards
          }}
        >
          <Text
            style={{
              fontSize: 26,
              fontWeight: "bold",
              marginBottom: 10,
              marginHorizontal: 110,
              alignSelf: "flex-start", // Move the text to the left
            }}
          >
            Toyota
          </Text>
          <Text
            style={{
              fontSize: 26,
              fontWeight: "bold",
              marginBottom: 10,
              marginHorizontal: 110,
              alignSelf: "flex-start", // Move the text to the left
            }}
          >
            Camry
          </Text>
        </View>
        
        {/* Second Card/Box */}
        <View
          style={{
            backgroundColor: "#f0f0f0", // Background color of the card/box
            borderRadius: 10, // Border radius for rounded corners
            padding: 20, // Padding inside the card/box
            shadowColor: "#000", // Shadow color (if desired)
            shadowOffset: {
              width: 1,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 2,
            elevation: 2, // Elevation for Android shadow
          }}
        >
          {/* Second Card/Box content */}
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10, marginHorizontal: 90 }}>
          Maintenance List
          </Text>
          <Button
            text="All lists >"
            onPress={() => {
              navigation.navigate("SecondScreen");
            }}
            style={{
              marginTop: 10,
            }}
          />
          {/* Add more buttons as needed */}
          <Button
            text="Tire pressure check-up"
            onPress={() => {
              navigation.navigate("SecondScreen");
            }}
            style={{
              marginTop: 10,
            }}
          />
          <Button
            text="Battery check-up"
            onPress={() => {
              navigation.navigate("SecondScreen");
            }}
            style={{
              marginTop: 10,
            }}
          />
          <Button
            text="Oil check-up"
            onPress={() => {
              navigation.navigate("SecondScreen");
            }}
            style={{
              marginTop: 10,
            }}
          />
        </View>
      </View>
    </Layout>
  );
}