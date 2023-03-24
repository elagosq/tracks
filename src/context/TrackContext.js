import createDataContext from "./createDataContext";
import TrackerApi from '../api/tracker';

const trackReducer = (state,action) => {
   switch(action.type){
    
    case 'fetch_tracks':
    return {tracks : action.payload}  
    
    default :
    return state;
   }
}


const fetchTracks = dispacth => async () => {
   const { data } = await TrackerApi.get('/tracks');
   dispacth({
     type:'fetch_tracks',
     payload: data
   })
}


const createTrack = () =>  async (name,locations) => {
  //make a request to our api
  await TrackerApi.post('/tracks', {
      name,
      locations 
  })
}

export const { Provider, Context } = createDataContext(
  trackReducer,
  {fetchTracks,createTrack},
  []
)