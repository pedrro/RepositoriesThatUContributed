angular.module('AllRepositoriesContributed', []).controller('RepositoriesCtrl',['$scope','$http',function($scope, $http) {
  $scope.userRepositories = [];
  $scope.user = "";

  $scope.search = function(){
  $http.get("https://api.github.com/search/issues?q=type:pr+state:closed+author:"+$scope.user+"&per_page=100&page=1")
  .then(function(response){
    $scope.userRepositories = response.data.items;
   });
 };

}]);
