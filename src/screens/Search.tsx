import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import KeywordSearch from './search/KeywordSearch'
import CategorySearch from './search/CategorySearch'

const SearchScreen = (): JSX.Element => {
  const [selectedBar, setSelectedBar] = useState<string>('keyword')

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.topBarContainer}>
          {['keyword', 'category'].map((item: string, index: number) => (
            <Pressable
              key={item}
              onPress={() => setSelectedBar(item)}
              style={{
                ...styles.topBar,
                backgroundColor: item === selectedBar ? '#8978A4' : '#C0B4D5',
                borderTopLeftRadius: index === 0 ? 100 : 0,
                borderBottomLeftRadius: index === 0 ? 100 : 0,
                borderTopRightRadius: index === 1 ? 100 : 0,
                borderBottomRightRadius: index === 1 ? 100 : 0,
              }}
            >
              <Text style={styles.topBarLabel}>{item}</Text>
            </Pressable>
          ))}
        </View>
        {selectedBar === 'keyword' ? <KeywordSearch /> : <CategorySearch />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  topBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  topBar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: 60,
  },
  topBarLabel: {
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
    textTransform: 'capitalize',
  },
})

export default SearchScreen
