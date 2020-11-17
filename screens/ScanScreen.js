import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
        scannedBookId: '',
        scannedStudentId:'',
        buttonState: 'normal'
      }
    }

    getCameraPermissions = async (id) =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      
      this.setState({
        /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
        hasCameraPermissions: status === "granted",
        buttonState: id,
 });
    }

    handleBarCodeScanned = async({type, data})=>{
      const {buttonState} = this.state

        this.setState({
          scanned: true,
          scannedData: data,
          buttonState: 'normal'
        });
      
      
    }

    render() {
      const scanned = this.state.scanned;
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const buttonState = this.state.buttonState;

      if (buttonState !== "normal" && hasCameraPermissions){
        return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}/>
        );
      }

      else if (buttonState === "normal"){
        return(
          <View style={styles.container}>
            <View>
              <Image source={require("../assets/camera.jpg")} style={{width:200, height: 200}}/>
              <Text style={{textAlign: 'center', fontSize: 30}}>QR Code Scanner</Text>
             </View>
             <Text style={styles.displayText}>Request Camera Permission</Text>
           
            <View style={styles.inputView}>
            
            <TouchableOpacity 
              style={styles.QrButton}
              onPress={()=>{
                this.getCameraPermissions("StudentId")
              }}>
              <Text style={styles.buttonText}>Scan QR Code</Text>
            </TouchableOpacity>
            </View>
          </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    buttonText:{
      fontSize: 20,
      alignContent: 'center',
      textAlign: 'center',
      marginTop: 10
    },
    inputView:{
      flexDirection: 'row',
      margin: 20
    },
    QrButton:{
      backgroundColor: '#87CEEB', 
      width: 150,
      borderWidth: 2,
    
    }
  });