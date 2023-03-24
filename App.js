import { ThemeProvider } from '@rneui/themed';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as LocationProvider } from './src/context/LocationContext';
import { Provider as TrackProvider } from './src/context/TrackContext';
import Navigation from './src/createRootNavigator';

export default function App () {
  return (  
    <ThemeProvider>
      <TrackProvider>
       <LocationProvider>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </LocationProvider> 
      </TrackProvider> 
    </ThemeProvider>
  );
}
 
