(function(){
  // "use strict"

  angular.module("app").controller("works.form", controller)

  controller.$inject = ["$state", "Work", "_form", "FileUploader"]

  function controller($state, Work, _form, FileUploader){
    const vm = this
    vm.uploader = new FileUploader()

    vm.empty = function(array){ return !angular.isArray(array) || array.length == 0 }

    vm.save = function(){
      Work.save(vm.work).then(function(data){
        if(data.errors) return _form.invalid(vm.form, data.errors)
        if(!vm.empty(vm.uploader.queue)) return upload(data._id)
        $state.go("works")
      })
    }

    function getTags(){
      Work.tags().then(function(data){
        vm.tags = data
      })
    }

    function getWork(id){
      if(!id) return vm.work = {}
      Work.getOne(id).then(function(data){
        vm.work = data
      })
    }

    function upload(id){
      var url = `http://localhost:8080/api/works/${id}/upload`
      vm.uploader.onBeforeUploadItem = function(item){ item.url = url }
      vm.uploader.uploadAll()
      vm.uploader.onCompleteAll = function(){ $state.go("works") }
    }

    getTags()
    getWork($state.params.id)

  }

})();
