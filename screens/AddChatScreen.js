import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLayoutEffect, useState } from 'react'
import { Button, Input } from 'react-native-elements'
import Icon  from 'react-native-vector-icons/FontAwesome'
import {db}  from '../firebase'


const AddChatScreen = ({ navigation }) => {

    const [input, setInput] = useState('')
 

useLayoutEffect(()=>{
    navigation.setOptions({
        title: "Commencer une nouvelle discussion",
        headerBackTitle: "Chats"
    })

}, [navigation])

const createChat = async () => {
    await db
    .collection("chats")
    .add({
        chatName: input,
    })
    .then(() => {
        navigation.goBack();
    })
    .catch((error) => alert(error));
};

  return (
    <View style={styles.container}>
      <Input 
      placeholder='Le nom de la discussion'
      value={input} 
      onChangeText={(text)=>setInput(text)}
      onSubmitEditing={createChat}
      leftIcon={
        <Icon name="wechat" type="antdesign" size={24} color="black"/>
      }/>
      <Button 
      disabled={!input}
      onPress={createChat} 
      title="Lancer la discussion"/>
    </View>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        padding: 30,
        height: "100%",
    }
})