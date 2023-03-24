import '../_mockLocation';
import React,{ useContext,useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withNavigationFocus } from '@react-navigation/compat';
import { Text } from '@rneui/themed';
import Spacer from '../components/Spacer'
import Map from '../components/Map';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';

const TrackCreateScreen = ({ isFocused }) => {
 const { state: { recording }, addLocation } = useContext(LocationContext);
 const callback = useCallback(location => {
   addLocation(location,recording);
 },[recording]);
 const [ errorMsg ] = useLocation(isFocused || recording,callback);

 return (
   <SafeAreaView forceInset={{top:'always'}}>
    <Spacer>
     <Text h2 style={{textAlign:'center'}}>Create a Track</Text>
    </Spacer> 
    <Map />
    {errorMsg ? <Text>{errorMsg}</Text> : null }
    <TrackForm />
   </SafeAreaView>
 );
}
 
export default withNavigationFocus(TrackCreateScreen);