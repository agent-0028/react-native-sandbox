const { execSync } = require('child_process')
const { existsSync, mkdirSync } = require('fs')

const SCREENSHOT_DIR = 'screenshots'

const SCREENSHOT_OPTIONS = {
  timeout: 1000,
  killSignal: 'SIGKILL',
}

let screenshotIndex = 0

const takeScreenshot = (platform = 'ios') => {
  const screenShotCommands = {
    ios: 'xcrun simctl io booted screenshot',
    android: 'adb exec-out screencap -p >'
  }

  if (!existsSync(SCREENSHOT_DIR)) mkdirSync(SCREENSHOT_DIR)
  const screenshotFilename = `${SCREENSHOT_DIR}/${platform}-screenshot-${screenshotIndex++}.png`
  execSync(`${screenShotCommands[platform]} ${screenshotFilename}`, SCREENSHOT_OPTIONS)
}

module.exports = { takeScreenshot }
