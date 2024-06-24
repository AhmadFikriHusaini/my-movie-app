import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SearchScreen from '../screens/Search'
import FavoriteScreen from '../screens/Favorite'
import { Feather } from '@expo/vector-icons'
import HomeStackNavigator from './HomeStackNavigation'

const Tab = createBottomTabNavigator()
const BottomTabNavigator = (): JSX.Element => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="hometab"
        component={HomeStackNavigator}
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="search"
        component={SearchScreen}
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="favorite"
        component={FavoriteScreen}
        options={{
          title: 'Favorite',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="heart" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator
