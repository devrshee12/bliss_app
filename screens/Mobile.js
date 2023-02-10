import {View, Text, TouchableOpacity, TextInput, StyleSheet, Alert} from "react-native"
import React, {useState, useRef} from "react"

import {FirebaseRecaptchaVerifierModal} from "expo-firebase-recaptcha"
import { firebaseConfig } from "../config"
import firebase from "firebase/compat/app"
import axios from "axios"





const Mobile = ({navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [code, setCode] = useState(""); 
    const [verificationID, setVerificationID] = useState(null);
    const recaptchaVerifier = useRef(null);
    const [data, setData] = useState({number: "", otp: ""});

    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        // console.log("in sendVerification", phoneNumber);
        // setData({...data, number: phoneNumber}); 
        // setData({otp: "", number: phoneNumber});
        // console.log("data from phone", data);
        phoneProvider
            .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
            .then(setVerificationID)
            // setPhoneNumber("")
            
            
            console.log("send verification called");     
    };


    const confirmCode = () => { 
        // console.log("here");
        // console.log(phoneNumber);
        // console.log(code);

        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationID,
            code
        );
        
        // data["otp"] = code;
        // console.log("in cofirm code", code);
        // setData({...data, otp: code});
        firebase.auth().signInWithCredential(credential)
        .then(() => {
            // console.log(code);
            // setData({...data, otp: code});
            // console.log("after otp :" , data);
            // setCode("");
            console.log("data ",data);
            // axios.post("/api/v1/users", data)
            // .then((res)=>{  
            //     console.log(res);
            //     
            // }, (err) => {
            //     console.log(err);
            // })
            fetch('http://192.168.35.181:5000/api/v1/users', {
            method: 'POST', // or 'PUT'
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            })
            .then((response) =>{
                console.log("first");
                navigation.navigate('home');
                // response.json()

            })
            .then((data) => {
                // console.log("second");
                // console.log('Success:', JSON.parse(data));
            })
            .catch((error) => {
                console.log("error");
                console.error('Error:', error);
            });

        })
        .catch((error) => {
            // show an alert in case of error 
            console.log(error);
            alert(error);
        })
        console.log("confim code called");
        Alert.alert("login successfull welcome to dashboard")
    }




    return (
        
        <View style={styles.container}>
            <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig}/>
            <Text style={styles.otpText}>Login using OTP</Text>
            <TextInput placeholder="phone number with country code"placeholderTextColor="#808080" onChangeText={(actualData) => {
                setPhoneNumber(actualData);
                setData({...data, number: actualData});
            }}
                keyboardType="phone-pad"
                autoCompleteType="tel"
                style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={sendVerification}>
                <Text style={styles.buttonText}>
                    send OTP
                </Text>
            </TouchableOpacity>

            <TextInput placeholder="confirm code" placeholderTextColor="#808080" value={code} onChangeText={(actualData) => {
                setCode(actualData);
                setData({...data, otp: actualData})
            }}
                keyboardType="number-pad"
                style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={confirmCode}>
                <Text style={styles.buttonText}>
                    Confirm OTP
                </Text>
            </TouchableOpacity>
            

        </View>
    )
}  


export default Mobile;


const styles =  StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3b3433",
        width: "100%"
    },
    textInput: {
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
        fontSize: 24,
        borderBottomColor: "#fff",
        borderBottomWidth: 2,
        marginBottom: 20,
        marginBottom: 20,
        textAlign: "center",
        color: "#FFF",

    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: "rgb(132,194,37)",
        width: "80%",
        marginBottom: 10,
        borderRadius: 5,
        color: "#FFF",
        
    },
    sendVerification: {
        padding: 20,
        backgroundColor: "#3498db",
        borderRadius: 10,
    },
    button: {
        backgroundColor: "rgb(132,194,37)",
        padding: 10,
        borderRadius: 5,
        marginBottom: 25,
        marginTop: 15
    },
    sendCode: {
        padding: 20,
        backgroundColor: "#9b59b6",
        borderRadius: 10,

    },
    buttonText: {
        color: "#3b3433",
        fontWeight: "bold",
    },
    otpText: {
        fontWeight: "bold",
        color: "#FFF",
        margin: 20,
    }


})
