import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/Home'
import MovieDetailScreen from '../screens/MovieDetail'
import GenreScreen from '../screens/Genre'

const Stack = createNativeStackNavigator()
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
      <Stack.Screen
        name="Genre"
        component={GenreScreen}
        options={{
          title: 'Genre',
        }}
      />
    </Stack.Navigator>
  )
}
export default HomeStackNavigator
