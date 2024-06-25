import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MovieDetailScreen from '../screens/MovieDetail'
import SearchScreen from '../screens/Search'

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
    </Stack.Navigator>
  )
}
export default SearchStackNavigator
