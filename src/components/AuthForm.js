import React from "react";
import { StyleSheet } from "react-native";
import { Text,Button,Input } from '@rneui/themed';
import { Formik  } from "formik";
import * as yup from 'yup';
import Spacer from "./Spacer";


const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
  
  const loginValidationSchema = yup.object().shape({
   email: yup
   .string()
   .email("Please enter valid email")
   .required("Email Address is required"),
   password: yup
   .string()
   .min(6,({ min }) => `Password must be at least ${min} characters`)
   .required('Password is required')
  });
 
  return (
    <>
      <Spacer>
        <Text h3>{headerText}</Text>
      </Spacer>
      <Formik
       validateOnMount={true}
       validationSchema={loginValidationSchema}
       initialValues={{ email:'',password:'' }}
       onSubmit={values => onSubmit(values) }
      >
       {({
         handleChange,
         handleBlur,
         handleSubmit,
         values,
         errors,
         touched,
         isValid
       }) => (
      <>
       <Spacer>
       <Input 
          inputContainerStyle={{borderBottomWidth:0}} 
          label="Email"
          style={styles.textInput} 
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          keyboardType="email-address" 
          autoCapitalize="none" 
          autoCorrect={false} 
        />
        {(errors.email && touched.email) ? <Text style={styles.errorText}>{errors.email}</Text>:null}
      </Spacer>
      <Spacer>
        <Input 
          inputContainerStyle={{borderBottomWidth:0}} 
          label="Password" 
          style={styles.textInput}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
          secureTextEntry
        />
        {(errors.password && touched.password) ?
          <Text style={styles.errorText}>{errors.password}</Text> : null
        }
      </Spacer>
      { errorMessage ? (
        <Spacer>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </Spacer>
      ) : null }
      <Spacer>
        <Button 
          title={submitButtonText}
          disabled={!isValid || values.email === ''}
          onPress={handleSubmit} 
        />
      </Spacer>
     </>
    )} 
  </Formik> 
    </>
  )
}

const styles = StyleSheet.create({
  textInput:{
    height: 40,
    width: '100%',
    backgroundColor:'white',
    borderRadius:5
  },
  errorText:{
    fontSize:14,
    marginHorizontal:10,
    color:'red'
  },
  errorMessage: {
    fontSize: 14,
    color: 'red',
  }
})

export default AuthForm;