import { TouchableOpacity, KeyboardAvoidingView, Text ,StyleSheet, TextInput, View} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { StatusBar } from "expo-status-bar";
import { Image, Input } from 'react-native-elements';
import { auth } from '../firebase'

const LoginScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            console.log(authUser);
            if(authUser){
                navigation.replace("Home");
            }
        })

       return unsubscribe;
    }, [])

    const handleLogin = () => {
        auth
        .signInWithEmailAndPassword(email, password)
        .catch(error => alert(error.message))
    }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
<StatusBar style="light" />
            <Image source={{ uri:"https://th.bing.com/th/id/R.4a85d836951735c0eaefd904636d5480?rik=Ug5q5S76FEB%2fXQ&pid=ImgRaw&r=0"}}
            style={{ width: 200, height: 200 }}
            />            
            <View style={styles.inputContainer}></View>
        <View style={styles.inputContainer}>
         
            <Input 
            placeholder='Adresse électronique' 
            style={styles.input}
            value={email}
            onChangeText={text => setEmail(text)}
            />
            
            
            <Input 
            placeholder='Mot de passe' 
            style={styles.input} 
            type="password"
            secureTextEntry 
            value={password}
            onSubmitEditing={handleLogin}
            onChangeText={(text) => setPassword(text)}
            />
        
        </View>

        <View style={styles.buttonsContainer}>
          
          <TouchableOpacity 
          onPress={handleLogin} 
          style={styles.button}>
                <Text style={styles.buttonText}> Se connecter </Text>
          </TouchableOpacity>

          <TouchableOpacity 
          onPress={()=>{navigation.navigate("Signup")}} 
          style={[styles.button, styles.buttonOutline]}>
                <Text style={styles.buttonOutlineText}> S'inscrire </Text>
          </TouchableOpacity>
        </View>

    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        marginTop: 10,
        backgroundColor:"white",
    },
    inputContainer:{
    width:"70%",
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
        color:"white",
        fontWeight:"700",
        fontSize: 16
    },
    buttonOutline:{
        backgroundColor:"white",
        marginTop:5,
        borderColor:"#0782F9",
        borderWidth:2
    },
    buttonOutlineText:{
        color:"#0782F9",
        fontWeight:"700",
        fontSize: 16
    }

})