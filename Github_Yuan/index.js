/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './js/App'
import AppNavigators from './js/navigators/AppNavigators'

AppRegistry.registerComponent(appName, () => App);
