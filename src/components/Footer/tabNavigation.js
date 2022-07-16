import React, { Component } from "react";
import { View, Text, Icon, FooterTab, Button, Footer as FTab } from "native-base";
import { TabNavigator } from "react-navigation";

import Spinner from "../../screens/Spinner/";
import styles from "./styles";

import ITEMS from "../../screens/KLINK/ITEMS";

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';


const Footer = TabNavigator(
  {
    ITEMS: {
      screen: ({ screenProps, navigation }) => <ITEMS navigation={navigation} />
    }
  },
  { 
    tabBarPosition: "bottom",
    lazy: false,
    tabBarComponent: props => {
      // Alert.alert("oo")
      return (
        <View style={styles.footer}>  

        </View>
      );
    }
  }
);




const FooterTabNavigation = Footer;
export default FooterTabNavigation;

