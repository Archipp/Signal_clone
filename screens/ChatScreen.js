import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { Avatar } from 'react-native-elements';
import { AntDesign, FontAwesome, Ionicons} from "@expo/vector-icons";
import { TextInput } from 'react-native';
import { Platform } from 'react-native';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Keyboard } from 'react-native';
import { auth, db } from '../firebase';
import firebase from "firebase/compat/app";

const ChatScreen = ({ navigation, route }) => {
    const[input, setInput] = useState("");
    const[message, setMessage] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Discussion",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View style={styles.headerTitles}>
                    <Avatar 
                    rounded
                    source={{uri: message[0]?.data.photoURL,}}/>
                <Text style={styles.text}>
                {route.params.chatName}
                </Text>
                </View>
            ),
            headerRight: () => (
                <View style={styles.headerRight}>
                    <TouchableOpacity>
                        <FontAwesome name='video-camera' size={24} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name='call' size={24} color="white"/>
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation, message]);

const sendMessage = () => {
    Keyboard.dismiss();

    db.collection('chats').doc(route.params.id).collection('message').add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        displayName: auth.currentUser.displayName,
        email:auth.currentUser.email,
        photoURL: auth.currentUser.photoURL
    })

    setInput('')
};

useLayoutEffect(() => {
    const unsubscribe = db
    .collection('chats')
    .doc(route.params.id)
    .collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot((snapshot) => setMessage(
        snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        }))
    ));
    return unsubscribe;
}, [route]);

  return (
    <SafeAreaView style={styles.safe}>
   <StatusBar style="light"/>
    <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "padding":"height"}
    style={styles.container}
    keyboardVerticalOffset={90}
    > 
    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
        <ScrollView contentContainerStyle={{paddingTop: 15}}>
            {message.map(({id, data}) => 
                data.email === auth.currentUser.email ? (
                    <View key={id} style={styles.reciever}>
                        <Avatar
                        position="absolute"
                        rounded

                        containerStyle={{
                            position: "absolute",
                            bottom: -15,
                            right: -5,
                        }}

                        bottom={-15}
                        right={-5}
                        size={30}
                        source={{uri: data.photoURL} }
                        />
                        <Text style={styles.recieverText}>{data.message}</Text>
                    </View>
                ) :
                 (
                    <View style={styles.sender}>
                        <Avatar 
                        position="absolute"
                        rounded

                        containerStyle={{
                            position: "absolute",
                            bottom: -15,
                            left: -5,
                        }}

                        bottom={-15}
                        left={-5}
                        size={30}
                        source={{uri: data.photoURL} }/>

                        <Text style={styles.senderText}>{data.message}</Text>
                        <Text style={styles.senderName}>{data.displayName}</Text>
                    </View>
                )
            )}
        </ScrollView>

        <View style={styles.footer}>
            <TextInput 
            value={input}
            onChangeText={(text)=>setInput(text)}
            onSubmitEditing={sendMessage}
            style={styles.textInput}
            />
            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
            <Ionicons name="send" size={24} color="#2B68E6"/>
            </TouchableOpacity>
        </View>
    </>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    reciever:{
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf:"flex-end", 
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth:"80%",
        position: "relative"
    },
    headerTitles:{
        flexDirection: "row",
        alignItems:"center",
    },
    text:{
        color:'white',
        marginLeft: 10,
        fontWeight:"700"
    }, 
    headerRight:{
        flexDirection: "row",
        justifyContent: "space-between",
        width: 80,
        marginRight: 20,
    },
    safe:{
        flex: 1,
        backgroundColor: "white",
    },
    footer:{
        flexDirection:"row",
        alignItems:"center",
        width:"100%",
        padding:15,
    },
    textInput:{
        bottom:0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30,
    },
    senderName:{
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white",
    },
    senderText:{
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
    },
    recieverText:{
        color:"black",
        fontWeight: "500",
        marginLeft: 10,
    },
})