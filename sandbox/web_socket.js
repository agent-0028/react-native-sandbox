import {Platform} from 'react-native'

const localHostAddress = {
  ios: '127.0.0.1',
  android: '10.0.2.2'
}

const ip = localHostAddress[Platform.OS]
const ws = new WebSocket(`ws://${ip}:8080`)

export default ws
