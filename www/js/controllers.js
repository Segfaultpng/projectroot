angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Chats) {
  Chats.getDevices()
  $scope.listOfDevices = [
    {
      src: 'img/iOT-Device-1.jpg',
      label: 'Device 1'
    },{
      src: 'img/iOT-Device-2.jpg',
      label: 'Device 2'
    },{
      src: 'img/iOT-Device-3.jpg',
      label: 'Device 3'
  }]
})

.controller('ChatsCtrl', function($scope, Chats,$http) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  //get a Requests object

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
  $scope.labels = ['Conditions'];
   $scope.series = ['Series A'];

   $scope.data = [
     [65]
   ];

  //fucntion that returns the device and the temperatrue + humidity it read
  $scope.mainInfo = $http.get('../test.json').success(function(response) {
      $scope.device = response.device
      $scope.temp = response.temperatrue
      $scope.humidity = response.humidity
      $scope.isDisabled = true;
      //  $scope.buttonPressed = function (req, resp){
      //    console.log('hit');
      //       console.log('hit 1');
      //       var httpBody = {
      //           payloadHex: '01',
      //           targetPorts: '1'
      //       }
      //
      //       //options are fed into each HTTP request.
      //       var options = {
      //           "uri":"https://dx-api.thingpark.com/core/latest/api/devices/82684/downlinkMessages",
      //           "body": httpBody,
      //           "headers":{
      //               "Content-Type" : "application/json",
      //               "Accept": "application/json",
      //               "Authorization" : "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJTVUJTQ1JJQkVSOjYwMjIiXSwiZXhwIjozNjQ0NjA2ODcxLCJqdGkiOiJlNjZlYWY3Zi1kN2U5LTQ3YjQtYmYwYS00ZjVlZTE2ZWU4YzMiLCJjbGllbnRfaWQiOiJjb21jYXN0LWFwaS9jczlzdGVwaGVuQGdtYWlsLmNvbSJ9.cH6kAG7T8bxQPfvIyDJDHU-d0Q4fzV_G-K_Roeo4QzI-2oTbq_Is6TXoF5r_6RgPuWYcChRUKXceHrPUcJ8-1w"}
      //       }
      //
      //       //perform a POST request
      //       requestObject.post(options,function(err,body){
      //   	    if(err){
      //   		    //the error is a JSON value of the error in question, shaped like {"error":"message"}
      //   		    log(JSON.stringify(body));
      //   		    resp.error("Failed");
      //   	    }else{
      //   		    //body is JSON of the response
      //   		    log(JSON.stringify(body));
      //   		    resp.success("Success");
      //   	    }
      //       })
      //       return response;
      // }
  });

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
