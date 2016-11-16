import homepageTemplate from './partials/index.html';

class Controller {
  constructor() {}

  $onInit() {
    console.log('App initialized...');
  }
}

Controller.$inject = [];

export default {
  bindings: {},
  templateUrl: homepageTemplate,
  controller: Controller,
};
