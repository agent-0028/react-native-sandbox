/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super()

    this.state = {
      propsFixture: {},
      message: '',
      connected: false
    }
  }

  componentDidMount() {
    this.ws = require('./web_socket').default
    this.ws.onopen = () => {
      this.setState({
        connected: true
      })
      this.ws.send('app connected');
    }

    this.ws.onmessage = (e) => {
      if ( e.data === 'CONTINUE') {
        const { propsFixture } = this.state
        const keys = Object.keys(propsFixture)

        if ( keys.length ) {
          const props = propsFixture[keys[0]]
          delete propsFixture[keys[0]]
          // and cause the next render
          this.setState({
            message: props.message,
            propsFixture
          })
        } else {
          // done with this screen, let the server know
          this.ws.send('NEXT_SCREEN')
        }
      } else {
        const screen = e.data
        const propsFixtures = require('./fixtures').default
        const propsFixture = propsFixtures[screen]
        const keys = Object.keys(propsFixture)
        // grab the first one and remove it from the object
        const props = propsFixture[keys[0]]
        delete propsFixture[keys[0]]

        // and cause the first render
        this.setState({
          message: props.message,
          propsFixture
        })
      }
    }
  }

  componentDidUpdate() {
    // always screenshot after update
    if (this.state.connected && this.state.message) {
     this.ws.send('SCREENSHOT')
    }
  }

  render() {
    const { message } = this.state
    return (
      <View style={styles.container}>
        <Text testID={'whatever'} style={styles.welcome}>
          Welcome to React Native, Ducky!
        </Text>
        <Text>
          This is the message: {message}
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
