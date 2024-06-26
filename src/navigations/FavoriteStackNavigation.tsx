import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MovieDetailScreen from '../screens/MovieDetail'
import FavoriteScreen from '../screens/Favorite'
import GenreScreen from '../screens/Genre'

const Stack = createNativeStackNavigator()
const FavoriteStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="favorite"
        component={FavoriteScreen}
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
export default FavoriteStackNavigator
