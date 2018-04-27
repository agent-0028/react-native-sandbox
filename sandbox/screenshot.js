const WebSocket = require('ws');
const { execSync } = require('child_process')
const wss = new WebSocket.Server({ port: 8080 });
const takeScreenshot = require('./screenShotHelper').takeScreenshot

// gather some args, punk rock style
const [ , , platform, ...screens ] = process.argv

if ( !platform || !screens.length) {
  console.log('Usage: first arg should be either "ios" or "android", followed by one or more screen constants.')
  process.exit()
}

const shutDownCommands = {
  ios: 'xcrun simctl shutdown booted',
  android: 'adb emu kill'
}

// start up the app
execSync(`yarn run:${platform}`)
// NOTE: react-native cli allows passing in device name,
// we should be able to use that to do different screen sizes

wss.on('connection', function connection(ws) {
  // send the first screen and remove from array
  const nextScreen = screens.shift()
  if (nextScreen) {
    ws.send(nextScreen)
  }

  ws.on('message', function incoming(message) {
    setTimeout(() => {
      if (message === 'SCREENSHOT') {
        takeScreenshot(platform)
        ws.send('CONTINUE')
      } else if (message === 'NEXT_SCREEN') {
        const nextScreen = screens.shift()
        if (nextScreen) {
          ws.send(nextScreen)
        } else {
          execSync(`${shutDownCommands[platform]}`)
          process.exit()
        }
      }
    }, 1)
  })
})
