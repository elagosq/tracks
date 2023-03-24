import React,{ useContext } from 'react';
import { StyleSheet,Text } from 'react-native';
import Spacer from '../components/Spacer';
import { Context as TrackContext } from '../context/TrackContext';
import MapView,{Polyline} from 'react-native-maps';

const TrackDetailScreen = ({ route }) => {
 
 const { state:{tracks} } = useContext(TrackContext);   
 const _id = route.params._id
 const track = tracks.find(t => t._id === _id)
 const initialCoords = track.locations[0].coords;
 
 console.log('Coords ',initialCoords)
 return (
   <>
   <Spacer>
     <Text style={styles.titleName}>{track.name}</Text>
   </Spacer>
   <MapView
    initialRegion={{
        longitudeDelta:0.01,
        latitudeDelta:0.01,
        ...initialCoords
    }}
    style={styles.map}
   >
    <Polyline coordinates={track.locations.map((loc) => loc.coords)} /> 
   </MapView>
   </>
 )
}

const styles = StyleSheet.create({
    titleName:{
     fontSize:48,
     textAlign:'center'   
    },
    map:{
      height:300
    }
});
 
export default TrackDetailScreen;