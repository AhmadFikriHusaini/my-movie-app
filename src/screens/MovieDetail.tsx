import { API_ACCESS_TOKEN, API_URL } from '@env'
import { ImageBackground, Pressable, Text, View } from 'react-native'

const MovieDetailScreen = ({ route }: any): JSX.Element => {
  const { movie } = route.params
  const fetchData = (): void => {
    const option = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }
    if (API_ACCESS_TOKEN == null || API_URL == null) {
      throw new Error('ENV not found')
    }
    fetch(API_URL, option)
      .then(async (response) => await response.json())
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }
  return (
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //   }}
    // >
    //   <Text>Movie Detail Screen</Text>
    //   <Pressable onPress={() => fetchData()}>
    //     <Text>Fetch Data</Text>
    //   </Pressable>
    //   <Text
    //     style={{
    //       fontSize: 30,
    //     }}
    //   >
    //     Movie ID: {movie.id}
    //   </Text>
    // </View>
    <View>
      <ImageBackground>
        
      </ImageBackground>
    </View>
  )
}

export default MovieDetailScreen
