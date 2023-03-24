import React,{ useContext, useLayoutEffect,useEffect } from 'react';
import { View,StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { Context as AuthContext } from '../context/AuthContext';

const SigninScreen = () => {
  const navigation = useNavigation();  
  const { state:{errorMessage}, signin, clearErrorMessage } = useContext(AuthContext);
 
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  },[]);

  useEffect(() => {
   const unsubscribe = navigation.addListener('focus', () => clearErrorMessage())
   return unsubscribe 
  },[navigation]);

  return (
     <View style={styles.container}>
      <AuthForm 
          headerText="Sign In to Your Account"
          errorMessage={errorMessage}
          onSubmit={signin}
          submitButtonText="Sign In"
        />
        <NavLink 
          text="Dont have an account? Sign up instead"
          routeName="SignUp"
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
 
export default SigninScreen;