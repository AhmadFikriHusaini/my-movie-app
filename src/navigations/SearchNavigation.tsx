import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MovieDetailScreen from '../screens/MovieDetail'
import SearchScreen from '../screens/Search'
import GenreScreen from '../screens/Genre'

const Stack = createNativeStackNavigator()
const SearchStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="search"
        component={SearchScreen}
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
export default SearchStackNavigator
