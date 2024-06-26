// import { API_ACCESS_TOKEN, API_URL } from '@env'
import { FontAwesome } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import {
  FlatList,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native'
import { Movie, MovieDetailProps } from '../types/app'
import { LinearGradient } from 'expo-linear-gradient'
import { API_ACCESS_TOKEN } from '@env'
import MovieItem from './movies/MovieItem'
import { StackActions, useNavigation } from '@react-navigation/native'

const MovieDetailScreen = ({ route }: any): JSX.Element => {
  const { id } = route.params
  const [recommendation, setRecommendation] = useState<Movie[]>([])
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [movieDetail, setMovieDetail] = useState<MovieDetailProps>()
  const navigation = useNavigation()

  const fetchMovieDetail = (): void => {
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

    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then((response) => response.json())
      .then((response) => setMovieDetail(response))
      .catch((err) => console.error(err))
  }

  const fetchRecomedation = (): void => {
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
      `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`,
      options,
    )
      .then((response) => response.json())
      .then((response) => setRecommendation(response.results))
      .catch((err) => console.error(err))
  }

  const addFavorite = async (movie: MovieDetailProps): Promise<void> => {
    try {
      const initialData: string | null = await AsyncStorage.getItem('favorite')

      // console.log(initialData)

      let favMovieList: MovieDetailProps[] = []

      if (initialData !== null) {
        favMovieList = [...JSON.parse(initialData), movie]
      } else {
        favMovieList = [movie]
      }
      await AsyncStorage.setItem('favorite', JSON.stringify(favMovieList))
      setIsFavorite(true)
    } catch (error) {
      console.error(error)
    }
  }

  const removeFavorite = async (id: number): Promise<void> => {
    try {
      const initialData: string | null = await AsyncStorage.getItem('favorite')

      // console.log(initialData)

      let favMovieList: MovieDetailProps[] = []

      if (initialData !== null) {
        favMovieList = JSON.parse(initialData).filter(
          (movie: MovieDetailProps) => movie.id !== id,
        )
      } else {
        favMovieList = []
      }

      await AsyncStorage.setItem('favorite', JSON.stringify(favMovieList))
      setIsFavorite(false)
    } catch (error) {
      console.error(error)
    }
  }

  const checkIsFavorite = async (id: number): Promise<boolean> => {
    try {
      const initialData: string | null = await AsyncStorage.getItem('favorite')

      if (initialData !== null) {
        const favMovieList: MovieDetailProps[] = JSON.parse(initialData)
        return favMovieList.some((movie: MovieDetailProps) => movie.id === id)
      } else {
        return false
      }
    } catch (error) {
      console.error(error)
    }
    return false
  }
  useEffect(() => {
    fetchMovieDetail()
    fetchRecomedation()
    checkIsFavorite(id).then((result) => {
      setIsFavorite(result)
    })
  }, [])
  // const fetchData = (): void => {
  //   const option = {
  //     method: 'GET',
  //     headers: {
  //       accept: 'application/json',
  //       Authorization: `Bearer ${API_ACCESS_TOKEN}`,
  //     },
  //   }
  //   if (API_ACCESS_TOKEN == null || API_URL == null) {
  //     throw new Error('ENV not found')
  //   }
  //   fetch(API_URL, option)
  //     .then(async (response) => await response.json())
  //     .then((data) => {
  //       console.log(data)
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //     })
  // }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageBackground
        style={{
          width: '100%',
          height: 300,
        }}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movieDetail?.backdrop_path}`,
        }}
      >
        <LinearGradient
          colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
          locations={[0.6, 0.8]}
          style={{
            padding: 8,
            height: '100%',
            width: '100%',
            borderRadius: 8,
            paddingBottom: 12,
            paddingLeft: 12,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Text style={{ color: 'white', fontSize: 30, fontWeight: 800 }}>
            {movieDetail?.title}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <FontAwesome name="star" size={16} color="yellow" />
            <Text
              style={{
                color: 'yellow',
                fontWeight: '700',
              }}
            >
              {movieDetail?.vote_average.toFixed(1)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
            }}
          ></View>
        </LinearGradient>
      </ImageBackground>
      <View
        style={{
          display: 'flex',
          marginTop: -25,
          marginRight: 12,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <Pressable
          style={{
            backgroundColor: 'white',
            padding: 12,
            borderRadius: 50,
          }}
          onPress={() => {
            isFavorite
              ? removeFavorite(id)
              : movieDetail && addFavorite(movieDetail)
          }}
        >
          <FontAwesome name={isFavorite ? 'heart' : 'heart-o'} size={32} />
        </Pressable>
      </View>
      <View>
        <View
          style={{
            marginLeft: 20,
            marginTop: -20,
            marginBottom: 10,
            marginRight: 80,
          }}
        >
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={movieDetail?.genres}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  navigation.dispatch(
                    StackActions.push('Genre', {
                      id: item.id,
                      name: item.name,
                    }),
                  )
                }}
                style={{
                  backgroundColor: '#8978A4',
                  paddingHorizontal: 8,
                  paddingVertical: 8,
                  borderRadius: 50,
                  marginRight: 8,
                }}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'white',
                  }}
                >
                  {item.name}
                </Text>
              </Pressable>
            )}
          />
        </View>
      </View>
      <View
        style={{
          borderRadius: 15,
          backgroundColor: 'white',
          marginHorizontal: 20,
          paddingHorizontal: 25,
          paddingVertical: 20,
        }}
      >
        <Text
          style={{
            marginBottom: 4,
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          Overview:{' '}
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'justify',
          }}
        >
          {movieDetail?.overview}
        </Text>
        <View
          style={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <View>
            <Text
              style={{
                fontWeight: 'bold',
              }}
            >
              Popularity
            </Text>
            <Text>{movieDetail?.popularity}</Text>
          </View>
          <View
            style={{
              marginLeft: 20,
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
              }}
            >
              Release Date
            </Text>
            <Text>{movieDetail?.release_date}</Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <View>
            <Text
              style={{
                fontWeight: 'bold',
              }}
            >
              Vote Count
            </Text>
            <Text>{movieDetail?.vote_count}</Text>
          </View>
          <View
            style={{
              marginLeft: 20,
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
              }}
            >
              Language
            </Text>
            <Text>{movieDetail?.original_language}</Text>
          </View>
        </View>
      </View>
      <View>
        <View
          style={{
            marginTop: 12,
            marginLeft: 6,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 20,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#8978A4',
              marginRight: 12,
            }}
          ></View>
          <Text style={{ fontSize: 20, fontWeight: '900' }}>
            recommendations
          </Text>
        </View>
        <FlatList
          style={{
            paddingLeft: 4,
            marginTop: 8,
            maxHeight: 160,
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={recommendation}
          renderItem={({ item }) => (
            <MovieItem
              movie={item}
              size={{
                width: 100,
                height: 160,
              }}
              coverType="poster"
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </ScrollView>
  )
}

export default MovieDetailScreen
