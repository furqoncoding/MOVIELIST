import React from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";

import { Root } from "native-base";

import FooterTabNavigation from "./components/Footer/tabNavigation";


import ITEMS from "./screens/MAIN/ITEMS";


import { NativeModules } from "react-native";
const activityStarter = NativeModules.ActivityStarter;

const Drawer = DrawerNavigator(
  {
    
    FooterTabNavigation: { screen: FooterTabNavigation }

  }
  ,{
    initialRouteName: "FooterTabNavigation",
    contentOptions: {
      activeTintColor: "#e91e63"
    }
  }
);

const App = StackNavigator(
  {




    ITEMS: { screen: ITEMS },
    
    
  
  },
  {
    index: 0,
    initialRouteName: "ITEMS",
    headerMode: "none"
  }

);

export default () =>
  <Root>
    <App />
  </Root>;
