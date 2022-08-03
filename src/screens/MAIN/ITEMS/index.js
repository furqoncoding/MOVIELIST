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
const loading_cart = require("../../../../assets/loadings.gif");
const background = require("../../../../assets/bgg.jpg");

// import {useTailwind} from 'tailwind-rn';

import { useForm } from "react-hook-form";
import { itemsFetchData } from "../../../actions";

import styles from "./styles";

import { reduxForm } from "redux-form";

import AppIntroSlider from 'react-native-app-intro-slider';



class ItemsForm extends Component {


  /////////////////////////////////////////
  constructor(props) {
    
    super(props);
    this.state = {
      urutan: 2,
      isLoading: true,

      showRealApp: false,
      slides: []
    };
    this.find_film()

  }

  ////////////////////////////////////////////////////////////////////////////////

  
  async find_film()
  {
    let length = this.state.slides.length


    if(length.toString() != "2")
    {
        var body_items = this.state.urutan.toString()
        await this.props.fetchDataItems(body_items)
        setTimeout(() => 
          {
            this.convert_data()
          }
        , 3700)
    }
    if(length.toString() == "2")
    {
      this.setState({
        isLoading: false
      })
      this.start_bs()
    }
  }

  async convert_data()
  {
    if(!this.props.data_items.status_message)
    {
        var slides = this.state.slides
        var data_items = {
          "backdrop_path": this.props.data_items.backdrop_path,
          "poster_path": this.props.data_items.poster_path,
          "original_title": this.props.data_items.original_title,
          "release_date": this.props.data_items.release_date,
          "overview": this.props.data_items.overview,
          "homepage": this.props.data_items.homepage
        }
        slides.push(data_items)
        this.setState({
          // isLoading: false,
          urutan: this.state.urutan + 1,
          slides: slides
        })

        this.find_film()
    }
    else if(this.props.data_items.status_message)
    {
        this.setState({
          urutan: this.state.urutan + 1
        })

        this.find_film()
    }
  }

  ////////////////////////////////////////////////////////////////////////////////

  async start_bs()
  {
    // 
    BackgroundTimer.runBackgroundTimer(() => { 
      this.find_film_bs()
    },
    2000)
  }

  async find_film_bs()
  {
    let length = this.state.slides.length

    
        var body_items = this.state.urutan.toString()
        await this.props.fetchDataItems(body_items)
        setTimeout(() => 
          {
            this.convert_data_bs()
          }
        , 3700)
    
  }

  async convert_data_bs()
  {
    if(!this.props.data_items.status_message)
    {
      var data_filter = this.state.slides.filter(elem => elem.original_title == this.props.data_items.original_title)

      if(data_filter.length.toString() != "1")
      {
        var slides = this.state.slides
        var data_items = {
          "backdrop_path": this.props.data_items.backdrop_path,
          "poster_path": this.props.data_items.poster_path,
          "original_title": this.props.data_items.original_title,
          "release_date": this.props.data_items.release_date,
          "overview": this.props.data_items.overview,
          "homepage": this.props.data_items.homepage
        }
        
        slides.push(data_items)

        this.setState({
          urutan: this.state.urutan + 1,
          slides: slides
        })
      }
      else if(data_filter.length.toString() == "1")
      {
        this.find_film_bs()
      }

    }
    else if(this.props.data_items.status_message)
    {
        this.setState({
          urutan: this.state.urutan + 1
        })

        this.find_film_bs()
    }
  }



  ///////////////////////////////////////////////////////////////////////////////
  _renderItem = ({ item }) => {
    return (
      <View style={{background: "black"}}>

                            <Header style={{ backgroundColor:'black' }}>
                              <Left>
                              </Left>
                              <Body>
                              </Body>
                              <Right>
                              </Right>
                            </Header>

        <ImageBackground 
          source={{ uri: "https://image.tmdb.org/t/p/original/" + item.backdrop_path }} 
          resizeMode="cover"
          style={{ justifyContent: "center",height: "100%", paddingTop: -50, marginTop: -50 }}
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
                                                source={{ uri: "https://image.tmdb.org/t/p/original/" + item.poster_path }}
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
                                                  {item.original_title} 
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
                                                  ({item.release_date})
                                                </Text>
                          </View>
                        </View>

                        {this.form_rating()}

                        <Content enableResetScrollToCoords={false}>
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
                                                  {item.overview} 
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
                                                    Linking.openURL(item.homepage);
                                                  }}
                                                >
                                                  {item.homepage} 
                                                </Text>
                        </View>
                        </Content>

                        
          </View>

        </ImageBackground>
        

      </View>
    );
  }

  _onDone = () => {
    this.setState({ showRealApp: true });
  }
  


  form_loading()
  {
    return (
      <Container style={{ backgroundColor: "white", justifyContent: "center" }}>

        <View style={{ flex: 0, justifyContent: "center" }}>
                                            <Thumbnail
                                              style={{
                                                alignSelf: "center",
                                                height: "50%",
                                                width: "50%",
                                                paddingBottom: 15,
                                                borderRadius: 25
                                              }}
                                              circle
                                              source={loading_cart}
                                            />
        </View>

        <Text style={{color: "black",paddingBottom: 0, fontSize: 12, alignSelf: "center"}}>
          version
        </Text>
        <Text style={{color: "black",paddingBottom: 0, fontSize: 12, alignSelf: "center"}}>
          1.0.0
        </Text>

      </Container>
    )
  }

  




  form_utama()
  {
    if (this.state.showRealApp) {
      return(
        <View>

        </View>
      )
    } else {
      return <AppIntroSlider renderItem={this._renderItem} data={this.state.slides} onDone={this._onDone}/>;
    }
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