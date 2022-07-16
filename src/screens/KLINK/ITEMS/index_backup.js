import React, { Component } from "react";
import { Linking, SafeAreaView, AppState, PermissionsAndroid, StyleSheet, TouchableHighlight, ViewPagerAndroid, TextInput, TouchableWithoutFeedback, Modal, TouchableOpacity, ScrollView, Alert, AlertIOS, Image, Platform, AsyncStorage } from "react-native";
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
const loading_cart = require("../../../../assets/loading_cart.gif");
// import {useTailwind} from 'tailwind-rn';

import { useForm } from "react-hook-form";
import { transFetchData, itemsFetchData } from "../../../actions";

import styles from "./styles";

import { reduxForm } from "redux-form";
class ItemsForm extends Component {


  /////////////////////////////////////////
  constructor(props) {
    
    super(props);
    this.state = {
      isLoading: true,
      datapesanan:[],
      id_items: "",
      nama_items: "",
      harga: "",
      fhoto: "",
      statuspage: "BERANDA",
      qty: 1,
      subtotal: 0,

      grandtotal: 0,

      checkout: false,

      kode_negara: "62",
      tlp: "",
      alamat: "",
      kurir: "Gojek",
      metodepembayaran: "Transfer"

    };
    this.start()

  }

  konfirmasi_keranjang()
  {

    if(this.state.fhoto != "")
    {
      var feed = {
        "id_items": this.state.id_items,
        "nama_items": this.state.nama_items,
        "harga": this.state.harga,
        "qty": this.state.qty
      };
      var data = this.state.datapesanan;
      var data_filter = data.filter(it => it.nama_items.includes(this.state.nama_items))

      if(JSON.stringify(data_filter) == "[]")
      {
        data.push(feed);
        this.setState({
          datapesanan: data,

          id_items: "",
          nama_items: "",
          harga: "",
          fhoto: "",
          qty: 1,
          subtotal: 0
        })

        var arr = data
        const sum = arr.reduce((accumulator, object) => {
          return accumulator + (object.qty * object.harga);
        }, 0);
        this.setState({
          grandtotal: sum
        })

      }
    }
    else if(this.state.fhoto == "")
    {
      
      var arr1 = this.state.datapesanan
      const data = arr1.map(obj => {
        if (obj.id_items === this.state.id_items) {
          return {...obj, qty: this.state.qty};
        }
        return obj;
      });

        this.setState({
          datapesanan: data,

          id_items: "",
          nama_items: "",
          harga: "",
          fhoto: "",
          qty: 1,
          subtotal: 0
        })


        var arr = data
        const sum = arr.reduce((accumulator, object) => {
          return accumulator + (object.qty * object.harga);
        }, 0);
        this.setState({
          grandtotal: sum
        })
        
    }

    
  }

  async start()
  {
    await this.props.fetchDataItems()
    
    setTimeout(() => this.setState({isLoading: false}), 3700);
    // this.setState({isLoading: false})
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
                                                paddingBottom: 15
                                              }}
                                              circular
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
    if(JSON.stringify(this.props.data_items) != "[]")
    {
      return(
        <Container style={{ backgroundColor: "white", justifyContent: "center" }}>
          <Content padder enableResetScrollToCoords={false}>


            <List
              dataArray={this.props.data_items}
              renderRow={(                      
                data // menggunakan kodingan lama saat list kategoriSoal
              ) =>
                <TouchableOpacity 
                  onPress={() => { this.add_list(data.nama_items, data.harga, data.fhoto, data.id_items) }}
                >                    
                <View style={{borderRadius: 15,marginBottom: 7, marginTop: 7, borderLeftWidth: 10, borderRightWidth: 10, borderBottomWidth: 10, borderBottomColor: '#F5F5F5', borderWidth: 2, borderColor: '#696969', backgroundColor: "white"}}>
                  
                  <View
                    style={{ 
                      paddingLeft: 7,
                      width: "100%", 
                      height: 125, 
                      backgroundColor: "white", 
                      alignSelf: "center",
                      borderWidth: 1,
                      borderColor: "#DCDCDC",
                      borderRadius: 0
                    }}
                    
                  >
                    <View style={{flexDirection: "row"}}>
                      <View style={{width: "25%"}}>
                        <View style={{paddingTop: 15,height: "90%", width: "90%"}}>
                        <Thumbnail
                                                style={{
                                                  alignSelf: "center",
                                                  height: "90%",
                                                  width: "90%",
                                                  
                                                  borderWidth: 1,
                                                  borderColor: "#F5F5F5"
                                                }}
                                                circular
                                                source={{ uri: `data:image/png;base64,${data.fhoto}` }}
                        />
                        </View>
                      </View>

                      <View style={{width: "50%"}}>

                                                <Text 
                                                  style={{ 
                                                    paddingTop: 10,
                                                    paddingBottom: 10,
                                                    fontSize: 12, 
                                                    paddingLeft: 9,
                                                    alignSelf: "flex-start", 
                                                    fontWeight: "bold", 
                                                    color: "black" 
                                                  }}
                                                >
                                                  {data.nama_items}
                                                </Text>
                                                <Text 
                                                  style={{ 
                                                    paddingTop: 10,
                                                    paddingBottom: 10,
                                                    fontSize: 15, 
                                                    paddingLeft: 9,
                                                    alignSelf: "flex-start", 
                                                    fontWeight: "bold", 
                                                    color: "black" 
                                                  }}
                                                >
                                                  Rp.{data.harga.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")},-
                                                </Text>

                      </View>
                      
                    </View>
                  </View>
                </View>
                </TouchableOpacity>                    
              }
            />
          
          </Content>

          {this.form_footer()}
        </Container>
      )
    }


    if(JSON.stringify(this.props.data_items) == "[]")
    {
      return(
        <Container style={{ backgroundColor: "white", justifyContent: "center" }}>
          <Content padder enableResetScrollToCoords={false}>
            <View style={{marginTop: 25, paddingTop: 25}}>
              <Spinner />
            </View>
          </Content>

          {this.form_footer()}
        </Container>
      )
    }
  }

  form_footer()
  {
    if(this.state.nama_items == "")
    {
      return(
        <View 
          style={{
              alignSelf: "stretch",
              justifyContent: "center",
              borderTopLeftRadius: 35,
              borderTopRightRadius: 35,
              height: 75,
              width: "100%",
              backgroundColor: "#DCDCDC",
              flexDirection: "row"
          }}
        >
          <View style={{width: "32%", justifyContent: "center"}}>
            <TouchableOpacity
              style={{paddingRight: 10}}
              onPress={() => { this.setState({
                statuspage: "BERANDA"
              }) }}
            >
              <Text style={{color: "black", fontSize: 12, alignSelf: "center"}}>
                🏠
              </Text>
              <Text style={{color: "black", fontSize: 12, alignSelf: "center"}}>
                BERANDA
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{width: "32%", justifyContent: "center"}}>
            <TouchableOpacity
              style={{paddingLeft: 10}}
              onPress={() => { this.go_to_kerangjang() }}
            >
              <Text style={{color: "black", fontSize: 12, alignSelf: "center"}}>
                🛒
              </Text>
              <Text style={{color: "black", fontSize: 12, alignSelf: "center"}}>
                KERANJANG
              </Text>
            </TouchableOpacity>
          </View>

          

        </View>
      )
    }
    else if(this.state.nama_items != "")
    {
      return(
        <View 
          style={{
              alignSelf: "stretch",
              justifyContent: "center",
              borderTopLeftRadius: 35,
              borderTopRightRadius: 35,
              height: "55%",
              width: "100%",
              backgroundColor: "#DCDCDC"
          }}
        >
          <View style={{justifyContent: "center"}}>
                    <TouchableOpacity 
                      style={{paddingBottom: 10, alignSelf: "flex-start", justifyContent: "flex-start", paddingLeft: 22}}
                      onPress={() => { this.setState({
                        id_items: "",
                        nama_items: "",
                        harga: "",
                        fhoto: "",
                        qty: 1,
                        subtotal: 0
                      }) }}
                    >
                      <Text style={{ fontSize: 35, fontWeight: "bold", color: "white", alignSelf: "center" }}>
                        ❌
                      </Text>
                    </TouchableOpacity>
          </View>
                      <CardItem style={{backgroundColor: "transparent", height: 150, width: 150 }}>
                      <Thumbnail
                                              style={{
                                                alignSelf: "flex-start",
                                                height: "100%",
                                                width: "100%",
                                                paddingTop: 15,
                                                borderWidth: 1,
                                                borderColor: "#F5F5F5",
                                                paddingLeft: 22
                                              }}
                                              circular
                                              source={{ uri: `data:image/png;base64,${this.state.fhoto}` }}
                      />
                      </CardItem>

                      <Text style={{fontSize: 17, alignSelf: "flex-start", paddingLeft: 22, color: "black"}}>
                        {this.state.nama_items}
                      </Text>
                      <Text style={{fontSize: 17, alignSelf: "flex-start", paddingLeft: 22, color: "black"}}>
                        Rp.{this.state.harga.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")},-
                      </Text>

                      <Text style={{fontSize: 17, alignSelf: "flex-start", paddingLeft: 22, color: "black", paddingTop: 12}}>
                        Total : Rp.{this.state.subtotal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")},-
                      </Text>


          <View style={{paddingTop: 27}}>
            <View style={{flexDirection: "row", justifyContent: "flex-end", paddingRight: 18}}>
              <View style={{width: "12%"}}>
                        <CardItem style={{ backgroundColor: '#FFD700', alignSelf: "center", paddingBottom: 15, paddingTop: 15, borderRadius: 50,borderWidth: 2,borderColor: "#DAA520" }}>
                                <TouchableOpacity 
                                  onPress={() => { this.minus_qty() }}
                                >
                                  <Text style={{ fontSize: 7, fontWeight: "bold", color: "white" }}>
                                    ➖
                                  </Text>
                                </TouchableOpacity>
                        </CardItem>
              </View>

              <View style={{width: "10%", justifyContent: "center"}}>
                        <Text style={{fontSize: 35, color: "black", alignSelf: "center"}}>
                          {this.state.qty.toString()}
                        </Text>
              </View>

              <View style={{width: "12%"}}>
                        <CardItem style={{ backgroundColor: '#FFD700', alignSelf: "center", paddingBottom: 15, paddingTop: 15, borderRadius: 50,borderWidth: 2,borderColor: "#DAA520" }}>
                                <TouchableOpacity 
                                  onPress={() => { this.plus_qty() }}
                                >
                                  <Text style={{ fontSize: 7, fontWeight: "bold", color: "white" }}>
                                    ➕
                                  </Text>
                                </TouchableOpacity>
                        </CardItem>
              </View>
            </View>

            <View style={{paddingRight: 25,flexDirection: "row", alignSelf: "flex-end", width: "34%"}}>
                        <CardItem style={{  width: "100%", backgroundColor: '#008000', alignSelf: "center", paddingBottom: 15, paddingTop: 15, borderRadius: 50,borderWidth: 2,borderColor: "#ADFF2F" }}>
                                <TouchableOpacity 
                                  onPress={() => { this.konfirmasi_keranjang() }}
                                >
                                  {this.form_tambahkan()}
                                </TouchableOpacity>
                        </CardItem>
            </View>
          </View>

        </View>
      )
    }
  }

  go_to_kerangjang()
  {
    if(JSON.stringify(this.state.datapesanan) == "[]")
    {
      this.setState({
        statuspage: "KERANJANG"
      })
    }
    else if(JSON.stringify(this.state.datapesanan) != "[]")
    {
      var arr = this.state.datapesanan
      const sum = arr.reduce((accumulator, object) => {
        return accumulator + (object.qty * object.harga);
      }, 0);


      this.setState({
        statuspage: "KERANJANG",
        grandtotal: sum
      })
    }
  }

  form_tambahkan()
  {
    if(this.state.fhoto != "")
    {
      return(
        <View>  
          <Text style={{ fontSize: 10, fontWeight: "bold", color: "white" }}>
            ✔️ Tambahkan
          </Text>
        </View>
      )
    }

    else if(this.state.fhoto == "")
    {
      return(
        <View>  
          <Text style={{ fontSize: 10, fontWeight: "bold", color: "white" }}>
            ✔️ Konfirmasi
          </Text>
        </View>
      )
    }
  }

  minus_qty()
  {
    if(this.state.qty >= 2)
    {
      var jumlah = this.state.qty - 1
      var subtotal = jumlah * parseInt(this.state.harga)
      this.setState({
        qty: jumlah,
        subtotal: subtotal
      })

      
    }
  }

  plus_qty()
  {
    var jumlah = this.state.qty + 1
    var subtotal = jumlah * parseInt(this.state.harga)
   
    this.setState({
      qty: jumlah,
      subtotal: subtotal
    })

    
  }



  form_keranjang()
  {
    if(JSON.stringify(this.state.datapesanan) != "[]")
    {
          console.log(this.state.grandtotal.toString())
          return(
            <Container style={{ backgroundColor: "white" }}>

              <Content padder enableResetScrollToCoords={false}>
                <List
                  dataArray={this.state.datapesanan}
                  renderRow={(                      
                    data // menggunakan kodingan lama saat list kategoriSoal
                  ) =>
                    

                    <View style={{marginBottom: 7, marginTop: 7, backgroundColor: "white"}}>
                      
                      <View
                        style={{ 
                          paddingLeft: 7,
                          width: "100%", 
                          height: 125, 
                          backgroundColor: "white", 
                          alignSelf: "center",
                          borderWidth: 1,
                          borderColor: "black",
                          borderRadius: 0
                        }}
                        
                      >
                        <View style={{flexDirection: "row"}}>
                          

                          <View style={{width: "55%"}}>

                                                    <Text 
                                                      style={{ 
                                                        paddingTop: 10,
                                                        paddingBottom: 10,
                                                        fontSize: 12, 
                                                        paddingLeft: 9,
                                                        alignSelf: "flex-start", 
                                                        fontWeight: "bold", 
                                                        color: "black" 
                                                      }}
                                                    >
                                                      {data.nama_items}
                                                    </Text>
                                                    <Text 
                                                      style={{ 
                                                        paddingTop: 10,
                                                        paddingBottom: 10,
                                                        fontSize: 15, 
                                                        paddingLeft: 9,
                                                        alignSelf: "flex-start", 
                                                        fontWeight: "bold", 
                                                        color: "black" 
                                                      }}
                                                    >
                                                      Harga : Rp.{data.harga.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")},-
                                                    </Text>

                          </View>

                          <View style={{width: "25%"}}>
                                                    <Text 
                                                      style={{ 
                                                        paddingTop: 10,
                                                        paddingBottom: 10,
                                                        fontSize: 12, 
                                                        paddingRight: 19,
                                                        alignSelf: "flex-end", 
                                                        fontWeight: "bold", 
                                                        color: "black" 
                                                      }}
                                                    >
                                                      x {data.qty}
                                                    </Text>
                              <View>
                                <CardItem style={{ width: 75, height: 25, backgroundColor: '#FFD700',paddingRight: 19,alignSelf: "flex-end", paddingBottom: 15, paddingTop: 15, borderRadius: 50,borderWidth: 2,borderColor: "#DAA520" }}>
                                        <TouchableOpacity 
                                          onPress={() => { this.editkeranjang(data.nama_items, data.harga, data.qty, data.id_items) }}
                                        >
                                          <Text style={{ fontSize: 7, fontWeight: "bold", color: "black" }}>
                                            Edit
                                          </Text>
                                        </TouchableOpacity>
                                </CardItem>
                              </View>

                              <View style={{marginTop: 3, paddingTop: 3}}>
                                <CardItem style={{ width: 75, height: 25, backgroundColor: '#FF0000',paddingRight: 19,alignSelf: "flex-end", paddingBottom: 15, paddingTop: 15, borderRadius: 50,borderWidth: 2,borderColor: "#FF6347" }}>
                                        <TouchableOpacity 
                                          onPress={() => { this.hapuskeranjang(data.nama_items, data.harga, data.qty, data.id_items) }}
                                        >
                                          <Text style={{ fontSize: 7, fontWeight: "bold", color: "black" }}>
                                            Hapus
                                          </Text>
                                        </TouchableOpacity>
                                </CardItem>
                              </View>


                          </View>
                          
                        </View>
                      </View>
                    </View>

                  }
                />
              </Content>

              {this.form_pesanantotal()}

              {this.form_footer()}
            </Container>
          )
    }

    if(JSON.stringify(this.state.datapesanan) == "[]")
    {
          console.log(this.state.grandtotal.toString())
          return(
            <Container style={{ backgroundColor: "white" }}>

              <Content padder enableResetScrollToCoords={false}>
                <View style={{marginTop: 25, paddingTop: 25, justifyContent: "center"}}>
                                              <Text 
                                                style={{ 
                                                  paddingTop: 10,
                                                  paddingBottom: 10,
                                                  fontSize: 12, 
                                                  alignSelf: "center", 
                                                  fontWeight: "bold", 
                                                  color: "#FF0000" 
                                                }}
                                              >
                                                Anda Belum Beli-Beli
                                              </Text>
                </View>
              </Content>

              {this.form_pesanantotal()}

              {this.form_footer()}
            </Container>
          )
    } 
  }

  form_pesanantotal()
  {
    if(JSON.stringify(this.state.datapesanan) != "[]")
    {
      if(this.state.nama_items == "")
      {
        return(
            <View style={{flexDirection: "row",height: "20%", width: "90%", backgroundColor: "#A9A9A9", marginBottom: 10, alignSelf: "center", borderRadius: 10}}>
              <View style={{width: "70%"}}>
                <CardItem style={{backgroundColor: "transparent"}}>
                  <Text style={{color: "black", fontSize: 15}}>
                    Total: 
                  </Text>
                </CardItem>
                <CardItem style={{backgroundColor: "transparent"}}>
                  <Text style={{color: "black", fontSize: 25, fontWeight: "bold"}}>
                    Rp.{this.state.grandtotal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")},-
                  </Text>
                </CardItem>
              </View>
              <View style={{width: "30%",justifyContent: "center"}}>
                            <CardItem style={{ backgroundColor: '#4169E1', alignSelf: "center", paddingBottom: 15, paddingTop: 15, borderRadius: 50,borderWidth: 2,borderColor: "#87CEEB" }}>
                                    <TouchableOpacity 
                                      onPress={() => { this.setState({checkout: true}) }}
                                    >
                                      <Text style={{ fontSize: 10, fontWeight: "bold", color: "white" }}>
                                        CHECKOUT
                                      </Text>
                                    </TouchableOpacity>
                            </CardItem>
              </View>
            </View>
        )
      }
    }
  }

  editkeranjang(nama_items, harga, qty, id_items)
  {
    
    if(this.state.nama_items == "")
    {
      this.setState({
        id_items: id_items,
        nama_items: nama_items,
        harga: harga,
        subtotal: parseInt(harga) * parseInt(qty),
        qty: qty
      })
    }
  }

  hapuskeranjang(nama_items, harga, qty, id_items)
  {  
    var data_filter_hapus = this.state.datapesanan.filter(elem => elem.id_items != id_items)
    this.setState({
      datapesanan: data_filter_hapus
    })
  }

  add_list(nama_items, harga, fhoto, id_items)
  {
    if(this.state.nama_items == "")
    {
      this.setState({
        id_items: id_items,
        nama_items: nama_items,
        harga: harga,
        subtotal: harga,
        fhoto: fhoto
      })
    }
  }


  form_checkout()
  {
    return(
      <Container style={{backgroundColor: "white"}}>
                    <TouchableOpacity 
                      style={{paddingTop: 10, alignSelf: "flex-start", justifyContent: "flex-start", paddingLeft: 22}}
                      onPress={() => { this.setState({
                        checkout: false
                      }) }}
                    >
                      <Text style={{ fontSize: 25, fontWeight: "bold", color: "white", alignSelf: "center" }}>
                        ❌
                      </Text>
                    </TouchableOpacity>

        <Content padder enableResetScrollToCoords={false}>
          <View style={{backgroundColor: "#FAFAD2", paddingBottom: 5, paddingTop: 25, paddingRight: 10, paddingLeft: 10, borderWidth: 1, borderColor: "black", borderRadius: 15}}>

                            <Text style={{ alignSelf: "flex-start", fontWeight: "bold", fontSize: 15, color: 'black', paddingTop: 9}}>
                              Nomor HP
                            </Text>
                            <CardItem style={{ backgroundColor: 'transparent', alignSelf: "flex-start" }}>
                              <Text style={{ alignSelf: "flex-start", fontWeight: "bold", fontSize: 25, color: 'black'}}>
                                🇮🇩
                              </Text>
                              <View style={{width: "20%", paddingLeft: 7}}>
                              <TextInput
                                value={this.state.kode_negara}
                                editable = {false}
                                placeholderTextColor="#878787"
                                style={{ paddingHorizontal: 15, height: 40, width: "100%", borderColor: 'gray', borderWidth: 1, borderRadius: 20,  marginBottom: 20, fontSize: 18, backgroundColor: "white" }}
                                onChangeText={(text) => { this.setState({tlp: text})} }
                              />
                              </View>
                              <View style={{width: "70%", paddingLeft: 7}}>
                              <TextInput
                                value={this.state.tlp}
                                placeholderTextColor="#878787"
                                style={{ paddingHorizontal: 15, height: 40, width: "100%", borderColor: 'gray', borderWidth: 1, borderRadius: 20,  marginBottom: 20, fontSize: 18, backgroundColor: "white" }}
                                onChangeText={(text) => { this.setState({tlp: text})} }
                              />
                              </View>
                            </CardItem>


                            <Text style={{ alignSelf: "flex-start", fontWeight: "bold", fontSize: 15, color: 'black', paddingTop: 9}}>
                              Alamat
                            </Text>
                            <CardItem style={{ backgroundColor: 'transparent', alignSelf: "center" }}>
                              <TextInput
                                value={this.state.alamat}
                                placeholderTextColor="#878787"
                                style={{ paddingHorizontal: 15, height: 40, width: "100%", borderColor: 'gray', borderWidth: 1, borderRadius: 20,  marginBottom: 20, fontSize: 18, backgroundColor: "white" }}
                                onChangeText={(text) => { this.setState({alamat: text})} }
                              />
                            </CardItem>

                                <Text style={{ alignSelf: "flex-start", fontWeight: "bold", fontSize: 15, color: 'black', paddingTop: 9}}>
                                  Kurir
                                </Text>
                                <View style={{minHeight: 20, backgroundColor: "white"}}>
                                  <Picker
                                    selectedValue={this.state.kurir}
                                    style={{ backgroundColor: "white", height: 50, width: "90%", alignSelf: "center" }}
                                    onValueChange={(itemValue, itemIndex) => this.setState({kurir: itemValue})}
                                  >
                                    <Picker.Item label="Gojek" value="Gojek" />
                                    <Picker.Item label="Grab" value="Grab" />
                                    <Picker.Item label="JNE" value="JNE" />
                                    <Picker.Item label="J & T" value="J & T" />
                                  </Picker>
                                </View>

                                <Text style={{ alignSelf: "flex-start", fontWeight: "bold", fontSize: 15, color: 'black', paddingTop: 9}}>
                                  Metode Pembayaran
                                </Text>
                                <View style={{minHeight: 20, backgroundColor: "white", marginBottom: 25}}>
                                  <Picker
                                    selectedValue={this.state.metodepembayaran}
                                    style={{ backgroundColor: "white", height: 50, width: "90%", alignSelf: "center" }}
                                    onValueChange={(itemValue, itemIndex) => this.setState({metodepembayaran: itemValue})}
                                  >
                                    <Picker.Item label="Transfer" value="Transfer" />
                                    <Picker.Item label="Cash On Delivery" value="Cash On Delivery" />
                                  </Picker>
                                </View>

          </View>
        </Content>


        <View style={{justifyContent: "center", paddingBottom: 25}}>
                        <CardItem style={{ backgroundColor: '#FFD700', alignSelf: "center", paddingTop: 15, borderRadius: 50,borderWidth: 2,borderColor: "#DAA520" }}>
                                <TouchableOpacity 
                                  onPress={() => { this.proses_confirm() }}
                                >
                                  <Text style={{ fontSize: 35, fontWeight: "bold", color: "white" }}>
                                    ✔️
                                  </Text>
                                </TouchableOpacity>
                        </CardItem>
        </View>

      </Container>
    )
  }

  async proses_confirm()
  {
    this.setState({isLoading: true})

    // let url = Linking.openURL('whatsapp://send?text=' + this.state.alamat + '&phone=' + this.state.tlp);
    // Linking.openURL(url)
    // .then((data) => {

        var body_trans = {
          tlp: this.state.tlp,
          alamat: this.state.alamat,
          data: JSON.stringify(this.state.datapesanan),
          metodepembayaran: this.state.metodepembayaran,
          kurir: this.state.kurir
        }

        await this.props.fetchPostTrans(body_trans)

        Alert.alert("Selamat","✔️ Pemesanan sukses")
        this.setState({
          isLoading: true,
          datapesanan:[],
          id_items: "",
          nama_items: "",
          harga: "",
          fhoto: "",
          statuspage: "BERANDA",
          qty: 1,
          subtotal: 0,
          grandtotal: 0,
          checkout: false,
          tlp: "",
          alamat: "",
          kurir: "Gojek",
          metodepembayaran: "Transfer"
        })
        this.start()
    // })
    // .catch(() => {
    //   Alert.alert("Server sibuk")
    // });

        
  }

  render() {
    if(this.state.isLoading == true)
    {
      return (this.form_loading())
    }
    else if(this.state.isLoading == false)
    {
      if(this.state.statuspage == "BERANDA")
      {
        return (this.form_utama())
      }
      else if(this.state.statuspage == "KERANJANG")
      {
        if(this.state.checkout == false)
        {
          return (this.form_keranjang())
        }
        else if(this.state.checkout == true)
        {
          return (this.form_checkout())
        }
      }
      
    }
  }

  
}

const ITEMS = reduxForm({
  form: "ITEMS"
})(ItemsForm);


function bindAction(dispatch) {
  return {
    fetchPostTrans: body_trans => dispatch(transFetchData(body_trans)),
    fetchDataItems: url => dispatch(itemsFetchData(url))
  };
}
const mapStateToProps = state => ({
  data_items: state.itemsReducer.data_items
});


export default connect(mapStateToProps, bindAction)(ITEMS);