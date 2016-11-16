import angular from 'angular';

export default function config(
  $httpProvider,
  appEnvConstant,
  polyfillProviderProvider,
  localStorageProviderProvider,
  $locationProvider,
  $urlMatcherFactoryProvider,
  $urlRouterProvider,
  $stateProvider) {
  if (NODE_ENV === 'development') {       // eslint-disable-line
    console.log('development mode is ON');
  }

  polyfillProviderProvider.registerPolyfills();
  localStorageProviderProvider.setPrefix('starterApp_');
  $locationProvider.html5Mode(true);
  $urlMatcherFactoryProvider.strictMode(false);

  $stateProvider.state('homepage', {
    url: '/',
    template: '<app-component start="1"></app-component>',
    controller: () => {},
  });
}

config.$inject = [
  '$httpProvider',
  'appEnvConstant',
  'polyfillProviderProvider',
  'localStorageProviderProvider',
  '$locationProvider',
  '$urlMatcherFactoryProvider',
  '$urlRouterProvider',
  '$stateProvider',
];
