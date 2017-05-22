(function(){
  "use strict"

  angular.module("app").service("_form", service)

  service.$inject = []

  function service(){

    this.invalid = function(form, errors){
      for(var attr in errors){ if(form[attr]) form[attr].$invalid = true }
    }

  }

})();
