import { API_ACCESS_TOKEN } from '@env'
import { StackActions, useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { FlatList, Pressable, Text, View } from 'react-native'

const CategorySearch = (): JSX.Element => {
  const navigation = useNavigation()
  const [genres, setGenres] = useState<any>([])
  const fetchData = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
      .then((response) => response.json())
      .then((response) => setGenres(response.genres))
      .catch((err) => console.error(err))
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <View style={{ marginTop: 18, marginHorizontal: 4 }}>
      <FlatList
        numColumns={4}
        data={genres}
        renderItem={({ item }) => (
          <Pressable
            style={{
              backgroundColor: '#8978A4',
              padding: 8,
              gap: 8,
              borderRadius: 10,
              margin: 4,
            }}
            onPress={() => {
              navigation.dispatch(
                StackActions.push('Genre', { id: item.id, name: item.name }),
              )
            }}
          >
            <Text style={{ fontWeight: 'bold', color: 'white' }}>
              {item.name}
            </Text>
          </Pressable>
        )}
      />
    </View>
  )
}

export default CategorySearch
