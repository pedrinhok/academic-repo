(function(){
  "use strict"

  angular.module("app").service("Work", service)

  service.$inject = ["$http"]

  function service($http){

    this.get = function(params){
      return $http.get(`http://localhost:8080/api/works`, { params: params })
            .then(success).catch(error)
    }

    this.getOne = function(id){
      return $http.get(`http://localhost:8080/api/works/${id}`)
            .then(success).catch(error)
    }

    this.save = function(params){
      return params._id ? update(params._id, params) : create(params)
    }

    this.tags = function(){
      return $http.get(`http://localhost:8080/api/tags`)
            .then(success).catch(error)
    }

    function create(params){
      return $http.post(`http://localhost:8080/api/works/`, params)
            .then(success).catch(error)
    }

    function update(id, params){
      return $http.put(`http://localhost:8080/api/works/${id}`, params)
            .then(success).catch(error)
    }

    function success(response){ return response.data }
    function error(response){ console.error("XHR failed") }

  }

})();
