
import React, { Component } from "react";
import { Provider } from "react-redux";

import { SafeAreaView, AppState, PermissionsAndroid, StyleSheet, TouchableHighlight, ViewPagerAndroid, TextInput, TouchableWithoutFeedback, Modal, TouchableOpacity, ScrollView, Alert, AlertIOS, Image, Platform, AsyncStorage } from "react-native";

import {
  Picker,
  Container,
  View,
  Header,
  Title,
  Content,
  Text,
  Button,
  Card,
  CardItem,
  Label,
  Item,
  Input,
  Left,
  Right,
  Body,
  Spinner,
  List,
  ListItem,
  Thumbnail
} from "native-base";

import { useForm } from "react-hook-form";

export default function Root() {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);
  return (
    <View>

    </View>
  )

}