import React, { Component } from "react";
import { ImageBackground, Linking, SafeAreaView, AppState, PermissionsAndroid, StyleSheet, TouchableHighlight, ViewPagerAndroid, TextInput, TouchableWithoutFeedback, Modal, TouchableOpacity, ScrollView, Alert, AlertIOS, Image, Platform, AsyncStorage } from "react-native";
import { connect } from "react-redux";
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

import { FooterTab, Footer as FTab } from "native-base";
///////////////////////////////////////////////////////////////////////////////

import ImgToBase64 from 'react-native-image-base64';

import TimedSlideshow from 'react-native-timed-slideshow';


import { NavigationActions, StackActions } from "react-navigation";

import Geolocation from 'react-native-geolocation-service';

import SearchInput, { createFilter } from 'react-native-search-filter';

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob';

import BackgroundTimer from 'react-native-background-timer';
const loading_cart = require("../../../../assets/loading.gif");
const background = require("../../../../assets/bgg.jpg");

// import {useTailwind} from 'tailwind-rn';

import { useForm } from "react-hook-form";
import { itemsFetchData } from "../../../actions";

import styles from "./styles";

import { reduxForm } from "redux-form";
class ItemsForm extends Component {


  /////////////////////////////////////////
  constructor(props) {
    
    super(props);
    this.state = {
      urutan: 2,
      isLoading: true
    };
    this.find_film()

  }

  
  async find_film()
  {
    var body_items = this.state.urutan.toString()
    await this.props.fetchDataItems(body_items)
    setTimeout(() => this.setState({isLoading: false}), 3700);
  }

  form_loading()
  {
    return (
      <Container style={{ backgroundColor: "black", justifyContent: "center" }}>

        <View style={{ flex: 0, justifyContent: "center" }}>
                                            <Thumbnail
                                              style={{
                                                alignSelf: "center",
                                                height: "50%",
                                                width: "50%",
                                                paddingBottom: 15
                                              }}
                                              circular
                                              source={loading_cart}
                                            />
        </View>

        <Text style={{color: "white",paddingBottom: 0, fontSize: 12, alignSelf: "center"}}>
          version
        </Text>
        <Text style={{color: "white",paddingBottom: 0, fontSize: 12, alignSelf: "center"}}>
          1.0.0
        </Text>

      </Container>
    )
  }

  form_utama()
  {
    if(!this.props.data_items.status_message)
    {
      // Alert.alert("data_items2",JSON.stringify(this.props.data_items))
      return(
        <Container style={{backgroundColor: "black"}}>
                            <Header style={{ backgroundColor:'black' }}>
                              <Left>
                                      
                              </Left>
                              <Body>
                                
                              </Body>
                              <Right>
                              </Right>
                            </Header>


        

        <ImageBackground 
          source={{ uri: "https://image.tmdb.org/t/p/original/" + this.props.data_items.backdrop_path }} 
          resizeMode="cover"
          style={{ justifyContent: "center",height: "85%" }}
          blurRadius={8}
        >


                            

          
          <View style={{paddingTop: 2,paddingLeft: 10}}>
                        <Thumbnail
                                                style={{
                                                  alignSelf: "flex-start",
                                                  height: "50%",
                                                  width: "98%"
                                                }}
                                                circular
                                                source={{ uri: "https://image.tmdb.org/t/p/original/" + this.props.data_items.poster_path }}
                        />


                        <View style={{flexDirection: "row"}}>
                          <View style={{width: "49%"}}>
                                                <Text 
                                                  style={{ 
                                                    paddingTop: 10,
                                                    fontSize: 25, 
                                                    alignSelf: "flex-start", 
                                                    fontWeight: "bold", 
                                                    color: "white" 
                                                  }}
                                                >
                                                  {this.props.data_items.original_title} 
                                                </Text>
                          </View>
                          <View style={{width: "49%"}}>
                                                <Text 
                                                  style={{ 
                                                    paddingTop: 10,
                                                    fontSize: 18, 
                                                    alignSelf: "flex-end", 
                                                    fontWeight: "bold", 
                                                    color: "white" 
                                                  }}
                                                >
                                                  ({this.props.data_items.release_date})
                                                </Text>
                          </View>
                        </View>

                        {this.form_rating()}

                        <View style={{width: "85%"}}>
                                                <Text 
                                                  style={{ 
                                                    paddingTop: 30,
                                                    fontSize: 15, 
                                                    alignSelf: "flex-start", 
                                                    fontWeight: "bold", 
                                                    color: "white" 
                                                  }}
                                                >
                                                  Overview
                                                </Text>

                                                <Text 
                                                  style={{ 
                                                    paddingTop: 10,
                                                    fontSize: 8, 
                                                    alignSelf: "flex-start", 
                                                    fontWeight: "bold", 
                                                    color: "white" 
                                                  }}
                                                >
                                                  {this.props.data_items.overview} 
                                                </Text>

                                                <Text 
                                                  style={{ 
                                                    paddingTop: 10,
                                                    fontSize: 8, 
                                                    alignSelf: "flex-start", 
                                                    fontWeight: "bold", 
                                                    color: "#1E90FF" 
                                                  }}
                                                  onPress={() => {
                                                    Linking.openURL(this.props.data_items.homepage);
                                                  }}
                                                >
                                                  {this.props.data_items.homepage} 
                                                </Text>
                        </View>

                        
          </View>

        </ImageBackground>
        
        <Content padder enableResetScrollToCoords={false}>
        </Content>             
              
              <FTab>
                <FooterTab style={styles.footer}>
                  <TouchableOpacity
                    onPress={() => this.previous()}
                  >
                    <Text>
                      ⬅️
                    </Text>
                  </TouchableOpacity>

                  <Text>
                    {this.state.urutan}
                  </Text>

                  <TouchableOpacity
                    onPress={() => this.next()}
                  >
                    <Text>
                      ➡️
                    </Text>
                  </TouchableOpacity>
                </FooterTab>
              </FTab>

        </Container>
      )
    }


    if(this.props.data_items.status_message)
    {
      return(
        <Container style={{backgroundColor: "black"}}>
                            <Header style={{ backgroundColor:'black' }}>
                              <Left>
                                      
                              </Left>
                              <Body>
                                
                              </Body>
                              <Right>
                              </Right>
                            </Header>


        
        
        <ImageBackground 
          source={background} 
          resizeMode="cover"
          style={{ justifyContent: "center",height: "85%" }}
          blurRadius={8}
        > 
        



              <View style={{paddingTop: 2,paddingLeft: 10, height: "80%"}}>

                        <View style={{flexDirection: "row"}}>
                          <View style={{width: "100%"}}>
                                                <Text 
                                                  style={{ 
                                                    paddingTop: 10,
                                                    fontSize: 25, 
                                                    alignSelf: "center", 
                                                    fontWeight: "bold", 
                                                    color: "#FF0000" 
                                                  }}
                                                >
                                                  No Entry Film
                                                </Text>
                          </View>
                        </View>

              </View>

        </ImageBackground>
        
        <Content padder enableResetScrollToCoords={false}>
        </Content>        

              <FTab>
                <FooterTab style={styles.footer}>
                  <TouchableOpacity
                    onPress={() => this.previous()}
                  >
                    <Text>
                      ⬅️
                    </Text>
                  </TouchableOpacity>

                  <Text>
                    {this.state.urutan}
                  </Text>

                  <TouchableOpacity
                    onPress={() => this.next()}
                  >
                    <Text>
                      ➡️
                    </Text>
                  </TouchableOpacity>
                </FooterTab>
              </FTab>

        </Container>
      )
    }
  }

  previous()
  {
    if(this.state.urutan != 1)
    {
      this.setState({isLoading: true})
      var urutan_now = this.state.urutan
      this.setState({urutan: urutan_now - 1})
      
      setTimeout(() => this.find_film(), 1500);
    }
  }

  next()
  {
    this.setState({isLoading: true})
    var urutan_now = this.state.urutan
    this.setState({urutan: urutan_now + 1})
    
    setTimeout(() => this.find_film(), 1500);
  }

 form_rating()
 {
    var rate = this.props.data_items.vote_average.toString().charAt(0)

    if(rate == "1")
    {
              return(
                <View>
                  <View style={{width: "65%"}}>
                                                <Text 
                                                  style={{ 
                                                    paddingTop: 10,
                                                    fontSize: 10, 
                                                    alignSelf: "flex-start", 
                                                    fontWeight: "bold", 
                                                    color: "white" 
                                                  }}
                                                >
                                                  ⭐
                                                </Text>

                  </View>
                </View>
              )
    }
    if(rate == "2")
    {
              return(
                <View>
                  <View style={{width: "65%"}}>
                                                <Text 
                                                  style={{ 
                                                    paddingTop: 10,
                                                    fontSize: 10, 
                                                    alignSelf: "flex-start", 
                                                    fontWeight: "bold", 
                                                    color: "white" 
                                                  }}
                                                >
                                                  ⭐⭐
                                                </Text>

                  </View>
                </View>
              )
    }
    if(rate == "3")
    {
              return(
                <View>
                  <View style={{width: "65%"}}>
                                                <Text 
                                                  style={{ 
                                                    paddingTop: 10,
                                                    fontSize: 10, 
                                                    alignSelf: "flex-start", 
                                                    fontWeight: "bold", 
                                                    color: "white" 
                                                  }}
                                                >
                                                  ⭐⭐⭐
                                                </Text>

                  </View>
                </View>
              )
    }
    if(rate == "4")
    {
              return(
                <View>
                  <View style={{width: "65%"}}>
                                                <Text 
                                                  style={{ 
                                                    paddingTop: 10,
                                                    fontSize: 10, 
                                                    alignSelf: "flex-start", 
                                                    fontWeight: "bold", 
                                                    color: "white" 
                                                  }}
                                                >
                                                  ⭐⭐⭐⭐
                                                </Text>

                  </View>
                </View>
              )
    }
    if(rate == "5")
    {
              return(
                <View>
                  <View style={{width: "65%"}}>
                                                <Text 
                                                  style={{ 
                                                    paddingTop: 10,
                                                    fontSize: 10, 
                                                    alignSelf: "flex-start", 
                                                    fontWeight: "bold", 
                                                    color: "white" 
                                                  }}
                                                >
                                                  ⭐⭐⭐⭐⭐
                                                </Text>

                  </View>
                </View>
              )
    }
    if(rate == "6")
    {
              return(
                <View>
                  <View style={{width: "65%"}}>
                                                <Text 
                                                  style={{ 
                                                    paddingTop: 10,
                                                    fontSize: 10, 
                                                    alignSelf: "flex-start", 
                                                    fontWeight: "bold", 
                                                    color: "white" 
                                                  }}
                                                >
                                                  ⭐⭐⭐⭐⭐⭐
                                                </Text>

                  </View>
                </View>
              )
    }
    if(rate == "7")
    {
              return(
                <View>
                  <View style={{width: "65%"}}>
                                                <Text 
                                                  style={{ 
                                                    paddingTop: 10,
                                                    fontSize: 10, 
                                                    alignSelf: "flex-start", 
                                                    fontWeight: "bold", 
                                                    color: "white" 
                                                  }}
                                                >
                                                  ⭐⭐⭐⭐⭐⭐⭐
                                                </Text>

                  </View>
                </View>
              )
    }
    if(rate == "8")
    {
              return(
                <View>
                  <View style={{width: "65%"}}>
                                                <Text 
                                                  style={{ 
                                                    paddingTop: 10,
                                                    fontSize: 10, 
                                                    alignSelf: "flex-start", 
                                                    fontWeight: "bold", 
                                                    color: "white" 
                                                  }}
                                                >
                                                  ⭐⭐⭐⭐⭐⭐⭐⭐
                                                </Text>

                  </View>
                </View>
              )
    }
 }

  render() {
    if(this.state.isLoading == true)
    {
      return (this.form_loading())
    }
    else if(this.state.isLoading == false)
    {
      return (this.form_utama())      
    }
  }

  
}

const ITEMS = reduxForm({
  form: "ITEMS"
})(ItemsForm);


function bindAction(dispatch) {
  return {
    // fetchDataItems: url => dispatch(itemsFetchData(url))
    fetchDataItems: body_items => dispatch(itemsFetchData(body_items))
  };
}
const mapStateToProps = state => ({
  data_items: state.itemsReducer.data_items
});


export default connect(mapStateToProps, bindAction)(ITEMS);