app
.directive('looksFeedItem', function($rootScope, apiRepository,$state){
  return {
    restrict: 'EA'
  , templateUrl: "uiComponents/looksFeedItem/looksFeedItem.html"
  , controller:function($scope){
      //$scope.media = apiRepository.getHeadlines();
    }
  , link:function($scope, $element, $attrs){
     
          var mediaId = $attrs.mediaid;
          var theItemImg = $element.find('img')
          $scope.thisMainDisplayImg = "img/myavanahairjourneyapp.png";

          var mediaSrc = apiRepository.getMedia(mediaId).success(function(data){


            img = new Image();

            img.onload = function() {
              
                theItemImg[0].src = data.imageUrl;
                $scope.thisMainDisplayImg = data.imageUrl

              };
              img.onerror = function(){


                //$element.addClass("ng-hide-add");
              }
              img.src = data.imageUrl

              if(data.likes == null){
                $scope.thisLikes = "0"
                }else{
                $scope.thisLikes = data.likes;
              }

              if(data.comments == null){
                $scope.thisComments = "0"
                }else{
                $scope.thisComments = data.comments;
              }


              $scope.thisUserProgileImg = data.profileImageUrl;
              $scope.des = data.description;

            //$scope.thisUserImage = data.imageUrl;
            
          });



          $scope.mediaClicked = function(postObj){

      postObj.mainImageUrl = $scope.thisMainDisplayImg;
      postObj.userProfileImage = $scope.thisUserProgileImg;
      postObj.comments = $scope.thisComments;
      postObj.likes = $scope.thisLikes;
      postObj.des = $scope.des;
      postObj.username = $scope.userUsername
      postObj.media_id = postObj.id;
      postObj.profileUrlId = postObj.UserProfileImageId;
      if (postObj.UserId){
        postObj.user_id = postObj.UserId;
      };
      //postObj.UserId = postObj.UserId;

      $rootScope.currentPostMainImage = $scope.thisMainDisplayImg;
      $rootScope.currentPostUserImage = $scope.thisUserProgileImg; 

      $state.go('app.viewpost', { post: JSON.stringify(postObj)})


    }

          /*
          var theItemImg = $element.find('img')

          theItemImg[0].src = mediaSrc.url;
          */
         
      }
    }
  
});