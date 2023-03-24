import React,{ useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountScreen from './screens/AccountScreen';
import SignInScreen from './screens/SigninScreen';
import SignUpScreen from './screens/SignupScreen';
import TrackCreateScreen from './screens/TrackCreateScreen';
import TrackDetailScreen from './screens/TrackDetailScreen';
import TrackListScreen from './screens/TrackListScreen';
import ResolveAuthScreen from './screens/ResolveAuthScreen';
import { navigationRef } from './navigationRef';
import { Context as AuthContext } from './context/AuthContext';
import { Context as TrackContext } from './context/TrackContext';
import { FontAwesome } from '@expo/vector-icons'; 

const AuthStack = createNativeStackNavigator()

function AuthStackScreen() {
 return (
  <AuthStack.Navigator
    initialRouteName='SignUp'
  >
    <AuthStack.Screen 
      name="SignUp" 
      component={SignUpScreen}
      options={{
        headerShown:false
      }}
      />
    <AuthStack.Screen 
      name="SignIn" 
      component={SignInScreen}
     />
  </AuthStack.Navigator>
 )
}

const TrackListStack = createNativeStackNavigator()

function TrackListScreens () {
 return(
  <TrackListStack.Navigator
    initialRouteName='Tracks'
  >
     <TrackListStack.Screen 
       name="Tracks" 
       component={TrackListScreen}
      />
     <TrackListStack.Screen 
      name="TrackDetail" 
      component={TrackDetailScreen} 
       options={{
         headerBackTitleVisible:false,
       }}
     />
  </TrackListStack.Navigator>
  )
}

const AppStack = createBottomTabNavigator()

function AppStackScreen (){
 const {state:{tracks}} = useContext(TrackContext)
 return (
  <AppStack.Navigator 
    initialRouteName="TracksList"
    screenOptions={{
      tabBarActiveTintColor:'blue',
      headerShown:false,
      tabBarHideOnKeyboard: true
    }}
    >
    <AppStack.Screen 
      name="TracksList" 
      component={TrackListScreens} 
      options={{
        taBarLabel:"Track",
        tabBarIcon:() => (
          <FontAwesome name="th-list" size={20} color="black" />
        ),
        tabBarBadge: tracks?.length
      }}
      />
    <AppStack.Screen 
      name="Add Track" 
      component={TrackCreateScreen} 
      options={{
        tabBarIcon:() => (
          <FontAwesome name="plus" size={20} color="black" />
        ),
        headerShow:false
      }} 
      />
    <AppStack.Screen 
      name="Account" 
      component={AccountScreen} 
      options={{
        taBarLabel:"Account User",
        tabBarIcon:({color,size}) => (
          <FontAwesome name="gear" size={20} color="black" />
        ),
        headerShow:false
      }} 
     />
  </AppStack.Navigator>
 )
}

const Stack = createNativeStackNavigator();

export default function Navigation(){
  const {state:{token}} = useContext(AuthContext);
  console.log('token '+token);
  return (
    <NavigationContainer 
      ref={navigationRef}
      >
      {token === null ? (
        <Stack.Navigator
         screenOptions={{headerShown:false}}
        >
          <Stack.Screen 
            name='ResolveAuth'
            component={ResolveAuthScreen}
          />  
          <Stack.Screen 
            name="LoginFlow" 
            component={AuthStackScreen}
          />
        </Stack.Navigator>
      ) : (
       <Stack.Navigator
          screenOptions={{headerShow:false}}
       >
         <Stack.Screen 
           name='MainFlow'
           component={AppStackScreen}
           options={{
             headerShown:false
           }}
         />
       </Stack.Navigator>
      )
     }
    </NavigationContainer>
  )
}


