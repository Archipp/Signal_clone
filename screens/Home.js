import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import CustomListitem from '../components/CustomListitem'
import { Avatar } from 'react-native-elements';
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"
import { auth, db } from '../firebase'

const Home = ({ navigation }) => {

  const [chats, setChats] = useState([]);
  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login")
    });
  };

  useEffect(() => {
    const unsubscribe = db.collection('chats').onSnapshot(snapshot=>(
      setChats(snapshot.docs.map(doc=>({
        id: doc.id,
        data: doc.data()
      })))
    ))
    return unsubscribe;
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle : { backgroundColor: '#fff' },
      headerTitleStyle: {color: "black"},
      headerIntColor: "black",
      headerLeft: () => {
      <View style={{marginLeft: 20}}>
        <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }}/>
        </TouchableOpacity>
      </View>
      },
        headerRight: () => (
          <View style={styles.headerRight}>
            <TouchableOpacity activeOpacity={0.5}>
              <AntDesign name='camerao' size={24} color="black"/>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate("AddChat")} >
              <SimpleLineIcons name="pencil" size={24} color="black"/>
            </TouchableOpacity>
          </View>
    ),
      })



}, [navigation]);

const enterChat = (id, chatName) => {
  navigation.navigate("Chat", {
    id,
    chatName,
  });
};

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({id, data: { chatName }}) => (

      <CustomListitem 
      key={id} 
      id={id} 
      chatName={chatName}
      enterChat={enterChat}/>

      ))}
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home

const styles = StyleSheet.create({
  headerRight: {
    flexDirection:"row",
    justifyContent:"space-between",
    width: 80,
    marginRight: 20,
  },
  container:{
    height:"100%",
  }
})