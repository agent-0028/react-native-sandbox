# react-native-sandbox
Sandbox project for trying out React Native things

### Getting Started

#### iOS

You need to have Xcode installed, including the command line tools.

This is all working with Xcode 9.3 on High Sierra.

#### Android

Carefully follow the instructions from [React Native Getting Started Guide]. Since we are hoping to customize the build to include Detox, you should use the Android section under "Building Projects with Native Code".

This is working with Android Studio 3.1.1 on High Sierra.

#### Detox tests

Currently this is only working for iOS. Please stay tuned...

To get `detox` build and tests with screenshots to run, you need a couple of homebrew installs that are not scripted.

```
brew install node # see note below
brew install watchman
brew tap wix/brew
brew install applesimutils
```

Note: This was tested with both node v8.11.1 managed by nodenv, and node v9.11.1 installed directly with homebrew.

### Daily Operations

The root of this project is actually the sub-folder `sandbox`, all other commands below assume you are in this folder.

```
cd sandbox
```

Once you are here, you can use the same script that Builkite uses to get local installs in place:

```
./install_local_deps.sh
```

You will need to be running "Metro Bundler", it will start automatically, but if you want to manage it yourself, open a second terminal window and run:

```
yarn start:metro
```

And in your main window run this to start the app in a simulator using the `react-native` cli:

```
yarn run:ios
```

For Android, you need to start the appropriate Virtual Device and then run:

```
yarn run:android
```

### e2e Testing (with screenshots!)

This is currently only working with iOS.

```
yarn build:detox
yarn e2e
```

[React Native Getting Started Guide]: https://facebook.github.io/react-native/docs/getting-started.html
