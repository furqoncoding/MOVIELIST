const React = require("react-native");
const { Platform } = React;

const { Dimensions } = React;
const width = Dimensions.get("window").width;

const deviceHeight = Dimensions.get("window").height;

const commonColor = require("../../../theme/variables/commonColor");

export default {

  button_bank: {
    width: 158,
    justifyContent: "center", 
    height: 225, 
    backgroundColor: 'transparent'
  },
  button_zmart: {
    width: 158,
    justifyContent: "center", 
    height: 225, 
    backgroundColor: 'transparent'
  },
  footer: {
    width,
    flexDirection: "row",
    height: 55,
    borderWidth: 0,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "black"
  },

  MainContainer :{
    
   flex:0,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: 'transparent'
   
  },
   
  Alert_Main_View:{
   
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor : "#009688", 
    height: 200 ,
    width: '90%',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius:7,
   
  },
   
  Alert_Title:{
   
    fontSize: 25, 
    color: "#fff",
    textAlign: 'center',
    padding: 10,
    height: '28%'
   
  },
   
  Alert_Message:{
   
      fontSize: 22, 
      color: "#fff",
      textAlign: 'center',
      padding: 10,
      height: '42%'
     
    },
   
  buttonStyle: {
      
      width: '50%',
      height: '25%',
      justifyContent: 'center',
      alignItems: 'center'
   
  },
     
  TextStyle:{
      color:'#fff',
      textAlign:'center',
      fontSize: 12,
      marginTop: -5
  },

  links: {
    marginTop: 5,
    marginBottom: 5
  },

  logoShadowImage: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: "transparent",
    justifyContent:'center'
  },

  baris1 : {flex:2,flexDirection:'row', justifyContent:'center'},
  baris2 : {flex:0,flexDirection:'row', justifyContent:'center'},
  Box1 : {flex:1,backgroundColor:'black',alignItems:'center',justifyContent:'center'},
  Box2 : {flex:0,backgroundColor:'#ff000000',alignItems:'center',justifyContent:'center'},

  containerImage: {
    flex: 1,
    width: null,
    height: null
  },
  roundedButton: {
    alignSelf: "center",
    marginTop: 40,
    backgroundColor: commonColor.brandPrimary,
    borderRadius: 90,
    width: 65,
    height: 65,
    alignItems: "center",
    justifyContent: "center"
  },
  closeIcon: {
    marginTop: Platform.OS === "ios" ? 2 : 2,
    fontSize: Platform.OS === "ios" ? 35 : 25,
    color: "#fff"
  },
  name: {
    color: "red"
  },
  text: {
    marginBottom: 10,
    fontSize: 18
  },
  listitem: {
    justifyContent:'center',
    borderBottomWidth: 0,
    marginTop: 5,
    marginBottom: 5
  },
  containerImage: {
    flex: 1,
    width: null,
    height: null
  },
  card: {
    marginBottom: 20,
    backgroundColor : "#ff000000"
  },
 
  TextInputStyleClass:{
        
   textAlign: 'center',
   height: 40,
   borderWidth: 2,
   borderColor: 'grey',
   borderRadius: 0 ,
   backgroundColor : "#FFFFFF"
        
   }
};