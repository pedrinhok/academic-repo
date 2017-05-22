(function(){
  "use strict"

  angular.module("app").component("progressBar", {
    bindings: {
      value: "@"
    },
    template: `
      <div class="progress">
        <div class="progress-bar" role="progressbar" ng-style="{ width: $ctrl.value }">
          {{$ctrl.value}}
        </div>
      </div>
    `
  })

})();
