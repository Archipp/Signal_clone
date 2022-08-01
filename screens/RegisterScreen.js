import { KeyboardAvoidingView, TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Input } from 'react-native-elements'
import { auth } from '../firebase'

const RegisterScreen = () => {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassowrd] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const handleSignUp = () => {
        auth
        .createUserWithEmailAndPassword(email, password)
        .then(authUser => {
            authUser.user.updateProfile({
              displayName: name,
             photoURL: imageUrl || "https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png"   
            })
        }) 
        .catch(error => alert(error.message))
    }

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>

    <View style={styles.Inputcontainer}>
        <Input placeholder="Nom complet"
        autoFocus 
        type="text"
        value={name}
        onChangeText={(text) => setName(text)} 
        />
        <Input 
        placeholder="Adresse electronique"
        value={email}
        onChangeText={text => setEmail(text)}
        />
        <Input 
        placeholder="Mot de passe" 
        secureTextEntry 
        value={password}
        type="password"
        onChangeText={(text) => setPassowrd(text)}
        />
        <Input placeholder="Photo de profil (facultatif)"
        type="text"
        value={imageUrl}
        onChangeText={(text) => setImageUrl(text)} 
        onSubmitEditing={handleSignUp}
        />
    
    </View>

    <View style={styles.buttonsContainer}>
          
          <TouchableOpacity onPress={handleSignUp} style={styles.button}>
                <Text style={styles.buttonText}> S'inscrire </Text>
          </TouchableOpacity>

    </View>

    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
    },

    Inputcontainer:{
        width:"80%",
    },
    input:{
        backgroundColor:"white",
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:5,
        marginTop:10,
    },
    buttonsContainer:{
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    button:{
        backgroundColor: "#0782F9",
        width: "100%",
        padding: 10,
        borderRadius: 10,
        alignItems: "center"
    },
    buttonText:{

    }

})