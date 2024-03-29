/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './js/App';
import AppNavigators from './js/navigator/AppNavigators';
import {name as appName} from './app.json';
import { createAppContainer } from 'react-navigation'

AppRegistry.registerComponent(appName, () => App);
