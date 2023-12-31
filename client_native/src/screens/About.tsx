import React from "react";
import { View, Linking } from "react-native";
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
  const auth = getAuth();
  return (
    <Layout>
      <TopNav
        middleContent="Settings"
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Section style={{ marginTop: 20 }}>
          <Text>
            Michael Bucchi
          </Text>
          <Button
              status="danger"
              text="Logout"
              onPress={() => {
                signOut(auth);
              }}
              style={{
                marginTop: 10,
              }}
          />
        </Section>
      </View>
    </Layout>
  );
}