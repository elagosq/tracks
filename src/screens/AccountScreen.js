import React,{ useContext } from 'react';
import { StyleSheet,Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@rneui/themed';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';

const AccountScreen = () => {
 const { signout } = useContext(AuthContext);
 return (
 <SafeAreaView forceInset={{ top: 'always' }}>
  <Spacer>
    <Text style={styles.title}>AccountScreen</Text>
  </Spacer> 
 
  <Spacer>
    <Button 
        title="Sign Out"
        onPress={signout}
    />
  </Spacer>
 </SafeAreaView>
 )
}

const styles = StyleSheet.create({
  title:{
     fontSize:48,
     marginLeft:15
  }
});
 
export default AccountScreen;