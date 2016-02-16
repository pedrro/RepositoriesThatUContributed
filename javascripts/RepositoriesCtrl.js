angular.module('AllRepositoriesContributed', []).controller('RepositoriesCtrl',['$scope','$http',function($scope, $http) {
  $scope.userRepositories = [{
    repository_Info : '',
    pr_Info : ''
  }];
  $scope.userInformation = {};
  $scope.user = "";

  $scope.userRepositoriesContributed = 0;

  function getUserInformation(user) {
    $http.get("https://api.github.com/users/"+user)
    .then(function(response){
      $scope.userinformation = response.data;
     });
  }

  function getUserPRCount(PrCount) {
    $scope.userRepositoriesContributed = PrCount;
  }

  function getRepositoryInformation(repository_url) {
    return $http.get(repository_url)
    .then(function(response){
      $scope.userinformation.repository_Info = response;
      return response;
     });
  }

  $scope.search = function(){
  $http.get("https://api.github.com/search/issues?q=type:pr+state:closed+author:"+$scope.user+"&per_page=100&page=1")
  .then(function(response){
    getUserInformation($scope.user);
    getUserPRCount(response.data.total_count);

    for (var i = 0; i < response.data.items.length; i++) {
      $scope.userRepositories[i].pr_Info = response.data.items[i];
      // getRepositoryInformation(response.data.items[i].repository_url).then(function (anotherResponse) {
      //   $scope.userRepositories[i].repository_Info = anotherResponse.data;
      // });
       }
   });

 };

}]);
