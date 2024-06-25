import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Movie } from '../types/app'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MovieItem from './movies/MovieItem'

const FavoriteScreen = (): JSX.Element => {
  const [favoriteList, setFavoriteList] = useState<Movie[]>([])
  const fetchData = async (): Promise<void> => {
    try {
      const initialData: string | null = await AsyncStorage.getItem('favorite')

      let favMovieList: Movie[] = []

      if (initialData !== null) {
        favMovieList = JSON.parse(initialData)
      }

      setFavoriteList(favMovieList)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchData()
  })
  return (
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //   }}
    // >
    //   <Text>Favorite Screen</Text>
    //   <Text>{favoriteList.length}</Text>
    // </View>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          marginTop: 16,
          marginLeft: 20,
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
          flexWrap: 'wrap',
        }}
      >
        {favoriteList.map((movie: Movie) => {
          return (
            <MovieItem
              movie={movie}
              size={{ width: 100, height: 160 }}
              coverType="poster"
              key={movie.id}
            />
          )
        })}
      </View>
    </ScrollView>
  )
}

export default FavoriteScreen
