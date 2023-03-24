import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from "./createDataContext";
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';


const authReducer = (state,action) => {
    switch(action.type){
      case 'add_error':
      return {...state, errorMessage : action.payload };
      case 'signin':
      return { errorMessage:'', token: action.payload };
      case 'clear_error_message':
      return {...state, errorMessage:''}
      case 'signout': 
      return { token : null, errorMessage: ''}      
      default: 
      return state;
    }
};

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  if(token){
    dispatch({ 
      type: 'signin',
      payload:token
    })
    navigate('MainFlow');
  }else{
    navigate('LoginFlow');
  }
}

const clearErrorMessage = dispatch => async () => {
   dispatch({
     type:'clear_error_message'
   })
}

const signup = dispatch => async (data) => {
    //make api request to sign up with that email and password
    //if we sign up, modify our state,and say that we are authentication
    //if signing up fails,we probably need to reflect an error message
    //somewhere
    const {email,password} = data;
    try {
      const response = await trackerApi.post('/signup', { email, password });
      await AsyncStorage.setItem('token', response.data.token);
      dispatch({
        type: 'signin',
        payload: response.data.token
      });
     } catch (err) {
     console.log('Error...') 
     dispatch({
        type: 'add_error',
        payload: 'Something went wrong with sign up'
      });
    }
  }

const signin = dispatch => async ({ email,password}) => {
     // Try to signin
     // Handle success by updating state
     // Handle failure by showing error message (somehow)
     try {
       const response = await trackerApi.post('/signin', { email,password });
       await AsyncStorage.setItem('token', response.data.token);
       dispatch({
         type:'signin',
         payload: response.data.token
       });
       navigate('MainFlow');
     } catch (err) {
       console.log(err);
       dispatch({
         type:'add_error',
         payload:'Something went wrong with sign in'
       })
     }
  }  


const signout = dispatch => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({
    type:'signout'
  });
}

export const { Provider,Context } = createDataContext(
   authReducer,
   { signin, signout, signup,clearErrorMessage,tryLocalSignin },
   { 
     token: null,
     errorMessage: ''
   } 
);