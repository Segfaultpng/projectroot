angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats,$http) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

  //fucntion that returns the device and the temperatrue + humidity it read
  $scope.mainInfo = $http.get('../test.json').success(function(response) {
      $scope.device = response.device
      $scope.temp = response.temperatrue
      $scope.humidity = response.humidity
      buttonPressed(response)
      return response;
  });

  function buttonPressed (response){
    if (response != "") {
      console.log("send data to sensor");
    } else {
      console.log("show an error with sending");
    }
  }

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
