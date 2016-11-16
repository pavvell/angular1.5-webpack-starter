import angular from 'angular';
import ngSanitize from 'angular-sanitize';
import _ from 'lodash';
import uirouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';

import config from './app.config';
import run from './app.run';

import appEnvConstant from './constants/appEnv';

import polyfillProvider from './providers/polyfill';
import localStorageProvider from './providers/localStorage';

import appComponent from './components/app/app';

angular.module('starterApp', [])

  .config(config)
  .run(run)

  .constant('appEnvConstant', appEnvConstant)

  .provider('polyfillProvider', polyfillProvider)
  .provider('localStorageProvider', localStorageProvider)

  .component('appComponent', appComponent);
