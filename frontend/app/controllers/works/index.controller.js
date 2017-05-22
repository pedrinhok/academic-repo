(function(){
  // "use strict"

  angular.module("app").controller("works.index", controller)

  controller.$inject = ["Work"]

  function controller(Work){
    const vm = this
    vm.header = true

    vm.searchParams = { text: "" }
    vm.search = function(){
      Work.get(vm.searchParams).then(function(data){
        vm.header = false
        vm.works = data
      })
    }

  }

})();
