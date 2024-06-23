/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pressable, Text, View } from 'react-native'

const HomeScreen = ({ navigation }: any): JSX.Element => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Home Screen</Text>
      <Pressable
        onPress={() => {
          navigation.navigate('MovieDetail')
        }}
      >
        <Text>Go To Detail</Text>
      </Pressable>
    </View>
  )
}

export default HomeScreen
