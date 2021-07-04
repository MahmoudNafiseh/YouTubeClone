/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import {
  Foundation,
  Ionicons,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRef } from "react";
import { View, Text, Pressable } from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  TouchableOpacity,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";
import HomeStackComponent from "./HomeStack";
import UploadScreen from "../screens/UploadScreen";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import { StackFrame } from "react-native/Libraries/Core/Devtools/parseErrorStack";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
function UploadVideoNavigator() {
  return (
    <UploadVideo.Navigator>
      <UploadVideo.Screen
        name="Upload"
        component={UploadScreen}
        options={{ headerTitle: "Upload A Video" }}
      />
    </UploadVideo.Navigator>
  );
}

export default function BottomTabNavigator({ navigation }) {
  const colorScheme = useColorScheme();
  const uploadRef = useRef<BottomSheetModal>(null);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        style={{
          flexGrow: 1,
          borderBottomColor: "#000000",
          borderBottomWidth: 1,
        }}
        backgroundComponent={({ style }) => (
          <View
            style={[
              style,
              {
                backgroundColor: "#272727",
                flexGrow: 1,
                borderRadius: 15,
                borderBottomColor: "black",
                borderBottomWidth: 1,
              },
            ]}
          />
        )}
        handleComponent={() => (
          <View>
            <Text
              style={{
                color: "white",
                padding: 15,
                fontSize: 22,
                paddingBottom: 0,
                fontWeight: "500",
              }}
            >
              Create
            </Text>
          </View>
        )}
        backdropComponent={BottomSheetBackdrop}
        ref={uploadRef}
        snapPoints={["33%"]}
        enableFlashScrollableIndicatorOnExpand={false}
        enableOverDrag={false}
        index={0}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 10,
            height: "33.3%",
            width: "100%",
          }}
          onPress={() => {
            uploadRef.current?.dismiss();
            setTimeout(() => {
              navigation.navigate("Add");
            }, 500);
          }}
        >
          <View
            style={{
              borderRadius: 25,
              backgroundColor: "rgba(255,255,255,0.1)",
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="file-upload" size={28} color="white" />
          </View>
          <Text style={{ fontSize: 16, color: "white", paddingLeft: 10 }}>
            Upload a video
          </Text>
        </Pressable>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 10,
            height: "33.3%",
            width: "100%",
          }}
        >
          <View
            style={{
              borderRadius: 25,
              backgroundColor: "rgba(255,255,255,0.1)",
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons name="podcast" size={28} color="white" />
          </View>
          <Text style={{ fontSize: 16, color: "white", paddingLeft: 10 }}>
            Go live
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "black",
            borderBottomWidth: 1,
            height: "33.3%",
            width: "100%",
          }}
        >
          <View
            style={{
              marginLeft: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                borderRadius: 25,
                backgroundColor: "rgba(255,255,255,0.1)",
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="square-edit-outline"
                size={28}
                color="white"
              />
            </View>
            <Text style={{ fontSize: 16, color: "white", paddingLeft: 10 }}>
              Create a post
            </Text>
          </View>
        </View>
      </BottomSheetModal>
      <BottomTab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: Colors[colorScheme].tint,
          labelPosition: "below-icon",
          labelStyle: { color: "white" },

          tabStyle: {
            backgroundColor: "#272727",
            borderTopColor: "rgba(255,255,255,0.1)",
            borderTopWidth: 1,
          },
        }}
      >
        <BottomTab.Screen
          name="Home"
          component={HomeStackComponent}
          options={{
            tabBarIcon: () => (
              <Foundation name="home" size={24} color={"white"} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Explore"
          component={TabOneNavigator}
          options={{
            tabBarIcon: () => (
              <Ionicons name="compass-outline" size={24} color={"white"} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Add"
          component={UploadVideoNavigator}
          options={{
            tabBarVisible: false,
            tabBarIcon: () => (
              <AntDesign name="pluscircleo" size={34} color={"white"} />
            ),
            tabBarLabel: () => null,
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              // Prevent default action
              e.preventDefault();

              // Do something with the `navigation` object
              uploadRef.current?.present();
            },
          })}
        />
        <BottomTab.Screen
          name="Subscriptions"
          component={TabTwoNavigator}
          options={{
            tabBarIcon: () => (
              <MaterialIcons name="subscriptions" size={24} color={"white"} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Library"
          component={TabTwoNavigator}
          options={{
            tabBarIcon: () => (
              <MaterialIcons
                name="video-collection"
                size={24}
                color={"white"}
              />
            ),
          }}
        />
      </BottomTab.Navigator>
    </BottomSheetModalProvider>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: "Tab One Title" }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: "Tab Two Title" }}
      />
    </TabTwoStack.Navigator>
  );
}

const UploadVideo = createStackNavigator();
