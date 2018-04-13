# react-native-sandbox
Sandbox project for trying out React Native things

### Getting Started

You need to have Xcode installed, including the command line tools.

This is all working with Xcode 9.3 on High Sierra.

To get `detox` build and tests with screenshots to run, you need a couple of homebrew and global npm installs that are not scripted. I don't really like global npm installs, it looks like it is unavoidable for `detox-cli`, but you can probably run the `react-native-cli` using `npx` or via a package.json script.

```
brew tap wix/brew
brew install applesimutils
brew install watchman
npm install -g detox-cli
npm install -g react-native-cli
```


The root of this project is actually the sub-folder `sandbox`, all other commands below assume you are in this folder.

```
cd sandbox
```

Once you are here, the usual npm install and you should be good to go.

```
npm install
```


You will need to be running "Metro Bundler", it will start automatically, but if you want to manage it yourself, open a second terminal window and run:
```
npm start
```

And in your main window run this to start the app in a simulator:

```
react-native run-ios
```

### e2e Testing (with screenshots!)

```
detox build --configuration ios.sim.debug
detox test --configuration ios.sim.debug
```
