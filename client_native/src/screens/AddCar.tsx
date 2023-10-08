import React, { useState } from "react";
import { View, TextInput } from "react-native";
import {
  Layout,
  Text,
  TopNav,
  Button,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";


export default function ({
    navigation,
  }: NativeStackScreenProps<MainStackParamList, "SecondScreen">) {
  const { isDarkmode, setTheme } = useTheme();
  const [carName, setCarName] = useState("");
  const [carModel, setCarModel] = useState("");

  const handleSaveCar = () => {
    // You can implement logic here to save the car data
    // For now, we'll just log the car data
    console.log("Car Name:", carName);
    console.log("Car Model:", carModel);

    // After saving, you can navigate back to the previous screen or perform other actions
    // For example, navigate back to the previous screen:
    navigation.goBack();
  };

  return (
    <Layout>
      <TopNav
        middleContent="Add Car"
        leftContent={
          <Button
            text="Cancel"
            onPress={() => {
              navigation.goBack();
            }}
            color="transparent"
          />
        }
        rightContent={
          <Button
            text="Save"
            onPress={handleSaveCar}
            color="transparent"
          />
        }
      />
      <View style={{ padding: 20 }}>
        <Text>Name:</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            padding: 10,
            marginBottom: 20,
          }}
          value={carName}
          onChangeText={(text) => setCarName(text)}
        />

        <Text>Model:</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            padding: 10,
            marginBottom: 20,
          }}
          value={carModel}
          onChangeText={(text) => setCarModel(text)}
        />
      </View>
    </Layout>
  );
}
