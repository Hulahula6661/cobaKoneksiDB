import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator
} from 'react-native';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    }
  }

  componentDidMount() {
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({

          isLoading: false,
          dataSource: responseJson.movies,

        })

      })

      .catch((error) => {
        console.log(error)
      })

  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={styles.main_wrapper}>
          <ActivityIndicator />
        </View>
      )
    }

    else {

      let movies = this.state.dataSource.map((val, key) => {
        return (
          <View key={key} style={styles.item}>
            <Text>{val.title}</Text>
          </View>
        )

      })

      return (
        <View style={styles.main_wrapper}>
          {movies}
        </View>
      )
    }

  }
}

const styles = StyleSheet.create({
  main_wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;
