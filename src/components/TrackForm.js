import React,{ useContext } from "react";
import { Input,Button } from "@rneui/themed";
import Spacer from '../components/Spacer';
import useSaveTrack from "../hooks/useSaveTrack";
import { Context as LocationContext } from "../context/LocationContext";

const TrackForm = () => {
    const { state: { name,recording,locations },
           startRecording, 
           stopRecording, 
           changeName 
    } = useContext(LocationContext);
    const [ saveTrack ] = useSaveTrack();
  
    return (  
      <>
      <Spacer>
        <Input value={name} placeholder="Enter name" onChangeText={changeName} /> 
        {recording 
         ? <Button title="Stop Recording" onPress={stopRecording} /> 
         : <Button title="Start Recording" onPress={startRecording}/> 
        }
      </Spacer>
      <Spacer>
        {
          !recording && locations.length ?
          <Button title="Save Recording" onPress={saveTrack} /> : null
        }
      </Spacer>  
     </>
    );
}
 
export default TrackForm;