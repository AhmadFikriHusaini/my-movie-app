import { API_ACCESS_TOKEN } from '@env'
import { useEffect, useState } from 'react'
import { FlatList, Text, TextInput, View } from 'react-native'
import { useDebounce } from 'use-debounce'
import { Movie } from '../../types/app'
import MovieItem from '../movies/MovieItem'

const KeywordSearch = (): JSX.Element => {
  const [keyword, setKeyword] = useState<string>('')
  const [outputSearch, setOutputSearch] = useState<Movie[]>([])
  const [debounceKeyword] = useDebounce(keyword, 1000)

  const fetchData = (): void => {
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
      `https://api.themoviedb.org/3/search/movie?query=${debounceKeyword}&include_adult=false&language=en-US&page=1`,
      options,
    )
      .then((response) => response.json())
      .then((response) => {
        setOutputSearch(response.results)
      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    fetchData()
  }, [debounceKeyword])
  return (
    <View style={{ paddingBottom: 50 }}>
      <TextInput
        style={{
          marginTop: 12,
          backgroundColor: 'white',
          padding: 15,
          borderRadius: 50,
        }}
        placeholder="search movie by keyword"
        onChangeText={(text: string) => setKeyword(text)}
      >
        {keyword}
      </TextInput>
      {outputSearch.length === 0 ? (
        <View
          style={{
            display: 'flex',
            marginTop: 20,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            No result
          </Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{
            marginBottom: 320,
          }}
          contentContainerStyle={{
            paddingVertical: 16,
            gap: 10,
          }}
          numColumns={3}
          data={outputSearch}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                marginRight: 4,
              }}
            >
              <MovieItem
                movie={item}
                size={{ width: 100, height: 160 }}
                coverType="poster"
                key={item.id}
              />
            </View>
          )}
        />
        // <ScrollView showsVerticalScrollIndicator={false}>
        //   <View
        //     style={{
        //       marginTop: 16,
        //       marginLeft: 8,
        //       display: 'flex',
        //       flexDirection: 'row',
        //       gap: 10,
        //       flexWrap: 'wrap',
        //     }}
        //   >
        //     {outputSearch.map((movie: Movie) => {
        //       return (
        //         <MovieItem
        //           movie={movie}
        //           size={{ width: 100, height: 160 }}
        //           coverType="poster"
        //           key={movie.id}
        //         />
        //       )
        //     })}
        //   </View>
        // </ScrollView>
      )}
    </View>
  )
}

export default KeywordSearch
