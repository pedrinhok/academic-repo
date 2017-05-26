(function(){
  // "use strict"

  angular.module("app").controller("works.show", controller)

  controller.$inject = ["$state", "Work"]

  function controller($state, Work){
    const vm = this

    vm.download = function(filename){
      window.open(`http://localhost:8080/api/works/${vm.work._id}/download/${filename}`)
    }

    vm.thumbnail = function(file){
      var extensions = ["doc", "docx", "gif", "jpeg", "jpg", "pdf", "png", "ppt", "txt", "xls", "zip"]
      var extension = extensions.indexOf(file.extension) < 0 ? "file" : file.extension
      return `app/assets/images/extensions/${extension}.png`
    }

    function getWork(id){
      Work.getOne(id).then(function(data){
        vm.work = data
      })
    }

    getWork($state.params.id)

  }

})();
