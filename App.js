import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView
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
    return fetch('https://belajarjepang.000webhostapp.com/Mobile/select_modul.php', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({

          isLoading: false,
          dataSource: responseJson.modul,

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

      let modul = this.state.dataSource.map((val, key) => {
        return (
          <TouchableOpacity key={key} style={styles.item}>
            <Text style={{ color: '#ffffff' }}>{val.nama_modul}</Text>
          </TouchableOpacity>
        )

      })

      return (
        <ScrollView style={{flex:1}}>
          <View style={styles.main_wrapper}>
            {modul}
          </View>
        </ScrollView>
      )
    }

  }
}

const styles = StyleSheet.create({
  main_wrapper: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#2e6fe8'
  }
});

export default App;
