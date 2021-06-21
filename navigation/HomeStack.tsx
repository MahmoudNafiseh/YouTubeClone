import { createStackNavigator } from "@react-navigation/stack";
import { TabOneParamList } from "../types";
import HomeScreen from "../screens/HomeScreen";
import React from 'react'
import { SafeAreaView, Image, View, Text } from "react-native";
const logo = require('../assets/images/logo.png')
const HomeStack = createStackNavigator<TabOneParamList>()
import {AntDesign, FontAwesome, Feather} from '@expo/vector-icons'

function YoutubeHeader () {
    return (
        <SafeAreaView style={{backgroundColor: '#272727',}}>
            <View style={{alignItems:'center',marginTop: 25, paddingRight: 12, paddingLeft: 12, paddingTop: 10, paddingBottom: 10,   flexDirection:'row', justifyContent:'space-between' }}>
                <Image source={logo} resizeMode={"contain"} style={{height: 25, width: "25%" }}/>
                <View style={{ justifyContent:'space-between', flexDirection: 'row', width: "50%"}}>
                    <Feather name="cast" size={22} color="white" />
                    <AntDesign name="bells" size={22} color="white" />
                    <AntDesign name="search1" size={22} color="white" />
                    <FontAwesome name="user-circle-o" size={22} color="white" />
                </View>
            </View>

        </SafeAreaView>
    )
}

function HomeStackComponent() {
    return (
      <HomeStack.Navigator
      screenOptions={{
          header: () => <YoutubeHeader />,
      }}
      >
        <HomeStack.Screen
          name="TabOneScreen"
          component={HomeScreen}
          options={{ headerTitle: 'Home' }}
        />
      </HomeStack.Navigator>
    );
  }
  
  export default HomeStackComponent