import React,{ useEffect,useContext } from 'react';
import { View,StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignupScreen = () => {

const navigation = useNavigation();
const { state:{errorMessage}, signup,clearErrorMessage } = useContext(AuthContext);

useEffect(() => {
   const unsubscribe = navigation.addListener('focus', () => clearErrorMessage())
   return unsubscribe 
},[navigation]);

  
 return (
     <View style={styles.container}>
        <AuthForm 
          headerText="Sign Up For Tracker"
          errorMessage={errorMessage}
          submitButtonText="Sign Up"
          onSubmit={signup}
        />
        <NavLink 
          routeName="SignIn"
          text="Already have a account? Sign in instead!"
        />
     </View>
  )
}

const styles = StyleSheet.create({
   container:{
      flex:1,
      justifyContent:'center',
      marginBottom:200
   }
});
 
export default SignupScreen;