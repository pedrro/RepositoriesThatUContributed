angular.module('AllRepositoriesContributed', []).controller('RepositoriesCtrl',['$scope','$http','$q',function($scope, $http, $q) {
  $scope.userRepositories = [{
    pr_Info : '',
    repository_Info : ''
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
    var promise1 = $http({method:'GET',url:'https://api.github.com/search/issues?q=type:pr+state:closed+author:'+$scope.user+'&per_page=100&page=1', cache:true});
    var promise2 = $http({method:'GET',url:'https://api.github.com/users/'+$scope.user, cache:true});

    $q.all([promise1, promise2]).then(function(data){
      getUserPRCount(data[0].data.total_count);
      $http.get(data[0].data.items[0].repository_url).then(function (anotherResponse) {
        $scope.userRepositories = [{
          pr_Info : data[0],
          repository_Info : anotherResponse
        }];
      });

      $scope.userInformation = data[1];

    });

 };

}]);
