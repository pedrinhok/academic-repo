(function(){
  "use strict"

  angular.module("app").config(router)

  function router($stateProvider, $urlRouterProvider){

    $stateProvider.state("works", {
      url: "/works",
      templateUrl: "app/views/works/index.html",
      controller: "works.index", controllerAs: "vm"
    })

    $stateProvider.state("works-form", {
      url: "/works/form/:id",
      templateUrl: "app/views/works/form.html",
      controller: "works.form", controllerAs: "vm"
    })

    $stateProvider.state("works-show", {
      url: "/works/show/:id",
      templateUrl: "app/views/works/show.html",
      controller: "works.show", controllerAs: "vm"
    })

    $urlRouterProvider.otherwise("/works")

  }

})();
