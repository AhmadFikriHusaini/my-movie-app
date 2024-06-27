import { API_ACCESS_TOKEN } from '@env'
import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Movie } from '../types/app'
import MovieItem from './movies/MovieItem'

const GenreScreen = ({ route }: any): JSX.Element => {
  const { id, name } = route.params
  const [genreMovies, setGenreMovies] = useState<Movie[]>([])
  const fetchData = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }
    if (API_ACCESS_TOKEN == null) {
      throw new Error('ENV not found')
    }

    fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`,
      options,
    )
      .then((response) => response.json())
      .then((response) => setGenreMovies(response.results))
      .catch((err) => console.error(err))
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 18 }}>
      <View style={styles.header}>
        <View style={styles.purpleLabel}></View>
        <Text style={styles.title}>{name}</Text>
      </View>
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
        {genreMovies.map((movie: Movie) => {
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

const styles = StyleSheet.create({
  header: {
    marginLeft: 6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  purpleLabel: {
    width: 20,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8978A4',
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
  },
})

export default GenreScreen
