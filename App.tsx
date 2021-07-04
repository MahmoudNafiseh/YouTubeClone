import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import Amplify, { Auth, DataStore } from "aws-amplify";
import config from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
Amplify.configure(config);
import { User } from "./src/models";

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const addUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      if (!userInfo) return;
      const userID = userInfo.attributes.sub;
      const user = (await DataStore.query(User)).find(
        (user) => user.userID === userID
      );
      if (!user) {
        await DataStore.save(
          new User({
            userID: userID,
            username: userInfo.attributes.email,
            subscribers: 0,
          })
        );
      } else {
        console.log("User already exists");
      }
    };

    addUser();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider style={{ flex: 1 }}>
        <Navigation colorScheme={"dark"} />
        <StatusBar style="light" backgroundColor="#141414" />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
