// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */

// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';

// export default class codepush extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit index.android.js
//         </Text>
//         <Text style={styles.instructions}>
//           Double tap R on your keyboard to reload,{'\n'}
//           Shake or press menu button for dev menu
//         </Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

// AppRegistry.registerComponent('codepush', () => codepush);

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  View
} from 'react-native';
import CodePush from 'react-native-code-push'

class CodePushDemo extends Component {
  constructor() {
    super()
    this.state = {
      syncStatus: '-',
      restartAllowed:  true
    }
  }

  codePushStatusDidChange (syncStatus) {
    switch(syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        this.setState({
          syncMessage: "Checking for update."
        });
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.setState({
          syncMessage: "Downloading package."
        });
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        this.setState({
          syncMessage: "Awaiting user action."
        });
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        this.setState({
          syncMessage: "Installing update."
        });
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        this.setState({
          syncMessage: "App up to date.",
          progress: false
        });
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        this.setState({
          syncMessage: "Update cancelled by user.",
          progress: false
        });
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        this.setState({
          syncMessage: "Update installed.",
          progress: false
        });
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        this.setState({
          syncMessage: "An unknown error occurred.",
          progress: false
        });
        break;
    }
  }

  sync() {
    CodePush.sync(
      {
        installMode: CodePush.InstallMode.IMMEDIATE,
      },
      this.codePushStatusDidChange.bind(this),
      (progress) => {
        this.setState({
          progress: progress
        });
      }
    );
  }

  componentDidMount() {
      CodePush.notifyApplicationReady();
  }

  toggleAllowRestart() {
    console.log(this)
    console.log(this.state.restartAllowed)
    if (this.state.restartAllowed) {
      CodePush.disallowRestart();
    } else {
      CodePush.allowRestart();
    }
    this.setState({restartAllowed: !this.state.restartAllowed});
  }

  render() {
    let syncView, syncButton, progressView;

    syncView = (
      <View>
        <Text style={styles.messages}>{this.state.syncMessage || 'null'}</Text>
        <TouchableOpacity onPress={this.sync.bind(this)}>
          <Text style={{color: 'green', fontSize: 17}}>Start Sync!</Text>
        </TouchableOpacity>
      </View>
    );

    if (this.state.progress) {
      progressView = (
        <Text style={styles.messages}>{this.state.progress.receivedBytes} of {this.state.progress.totalBytes} bytes received</Text>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Hi Youngbye! 第2次更新
        </Text>
        {syncView}
        {progressView}
        {/*<Image style={styles.image} resizeMode={Image.resizeMode.contain} source={require('./images/laptop_phone_howitworks.png')}/>*/}
        <TouchableOpacity onPress={this.toggleAllowRestart.bind(this)}>
          <Text style={{color: 'blue', fontSize: 17}}>Restart { this.state.restartAllowed ? "allowed" : "forbidden"}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


let styles = StyleSheet.create({
  image: {
    marginTop: 50,
    width: Dimensions.get('window').width - 100,
    height: 365 * (Dimensions.get('window').width - 100) / 651,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 50
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  messages: {
    textAlign: 'center',
  },
});

AppRegistry.registerComponent('codepush', () => CodePushDemo);