angular.module('AllRepositoriesContributed', []).controller('RepositoriesCtrl',['$scope','$http',function($scope, $http) {
  $scope.userRepositories = [];
  $scope.userInformation = {};
  $scope.user = "";

  $scope.userRepositoriesContributed = 0;

  function getUserInformation() {
    $http.get("https://api.github.com/users/"+$scope.user)
    .then(function(response){
      $scope.userinformation = response.data;
     });
  }

  function getUserRepositoriesInformation(response) {
    $scope.userRepositoriesContributed = response;
  }

  $scope.search = function(){
  $http.get("https://api.github.com/search/issues?q=type:pr+state:closed+author:"+$scope.user+"&per_page=100&page=1")
  .then(function(response){
    getUserInformation();
    getUserRepositoriesInformation(response.data.total_count);
    $scope.userRepositories = response.data.items;
   });

 };

}]);
