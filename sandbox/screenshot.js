const WebSocket = require('ws');
const { execSync } = require('child_process')
const wss = new WebSocket.Server({ port: 8080 });
const takeScreenshot = require('./e2e/helpers').takeScreenshot

const screens = [
  'screen-one',
  'screen-two',
  'screen-three'
]

// start up the app
execSync('yarn run:ios')

wss.on('connection', function connection(ws) {
  // send the first screen and remove from array
  const nextScreen = screens.shift()
  if (nextScreen) {
    ws.send(nextScreen)
  }

  ws.on('message', function incoming(message) {
    if ( message === 'SCREENSHOT') {
      setTimeout(() => {
        takeScreenshot()
        const nextScreen = screens.shift()
        if (nextScreen) {
          ws.send(nextScreen)
        } else {
          execSync('xcrun simctl shutdown booted')
          process.exit()
        }
      }, 500)
    }
  });
});
