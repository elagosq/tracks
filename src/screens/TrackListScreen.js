import React,{ useEffect,useContext } from 'react';
import { StyleSheet,FlatList,TouchableOpacity,Text } from 'react-native';
import { ListItem } from "@rneui/themed";
import Spacer from '../components/Spacer';
import { useNavigation } from '@react-navigation/native';
import { Context as TrackContext } from '../context/TrackContext';

const TrackListScreen = () => {
 const navigation = useNavigation();
 const {state:{tracks},fetchTracks} = useContext(TrackContext);
 
 useEffect(() => {
   console.log('Effect tracklist')
   const unsub = navigation.addListener('focus', fetchTracks)
   return unsub
 }, [navigation]);

 return (
     <>
     <Spacer />
     <FlatList 
       data={tracks}
       keyExtractor={item => item._id}
       renderItem={({ item }) => {
       return (
       <TouchableOpacity 
          onPress={() => 
            navigation.navigate('TrackDetail', { _id: item._id })
          }
        >
        <ListItem bottomDivider>   
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        </TouchableOpacity>
      )
     }}
     />
     </>
    )
}

const styles = StyleSheet.create({});
 
export default TrackListScreen;