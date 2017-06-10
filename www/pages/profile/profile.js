app
.controller('ProfileCtrl', function($scope,$state, $rootScope,$localStorage,$stateParams,apiRepository,$ionicModal,$cordovaImagePicker,$ionicPlatform,$cordovaCamera,$ionicPopup,$cordovaToast,$sce,$cordovaInAppBrowser,$timeout,$ionicScrollDelegate,$q){
	//console.log("Dash");
  $scope.moreUserPostCanBeLoaded = false;
  $scope.image= 'img/myavanalogonotext.png';
  $scope.imageNotChosen = true;

  $scope.fullName = $localStorage.user.user.fullName;
  $scope.email = $localStorage.user.user.email;
  $scope.testSrc = undefined;

  $scope.searching = false;
  $scope.profileTitle = "Profile"
  $scope.noFriends = false;

          $scope.hairAnalysisProfileStyle = {

          'height': Math.floor((document.getElementById("profileContent").offsetWidth * .28) + document.getElementById("profileContent").offsetWidth) + 'px',
          'width':'100%'
          }

  if($stateParams.userId == $localStorage.user.user.id){

  $scope.hairUrl =  "http://www.myavana.com/" + $localStorage.user.user.username;
  $scope.userHairUrl = $sce.trustAsResourceUrl($scope.hairUrl);

    $rootScope.thisIsMyProfile = true;
    $scope.canFollow = false;
  }
  else{
    $rootScope.thisIsMyProfile = false;
  }

              
$scope.changeSearchState = function(){

  if ($scope.searching == true) {
    $scope.searching = false;
    $scope.profileTitle = "Profile";
    $scope.theSearchText = "";
  }
  else{
    $scope.searching = true;
    $scope.profileTitle = "";
  }
}

          /*Change Profile Modal*/
          $ionicModal.fromTemplateUrl('pages/changeprofilemodal/changeprofilemodal.html', {
             scope: $scope,
             animation: 'slide-in-up'
           }).then(function(modal) {
             $scope.profileModal = modal
           })

           $scope.openProfileModal = function() {
             $scope.profileModal.show()
           }

           $scope.closeProfileModal = function() {

              
                 
                $scope.profileModal.hide();
             
           };

           $scope.changeProfileImage = function(theMediaId){
            apiRepository.changeProfileImage(theMediaId).success(function(data){
              $scope.image = data.profileImageUrl;
              $scope.closeProfileModal();
            })
           }
          /*Comment Modal Code*/

          $scope.uploadInProgress = false;

          $ionicModal.fromTemplateUrl('pages/uploadModal/uploadModal.html', {
             scope: $scope,
             animation: 'slide-in-up'
           }).then(function(jmodal) {
             $scope.journeyModal = jmodal
           })

           $scope.openJourneyModal = function() {
             $scope.journeyModal.show()
           }

           $scope.closeJourneyModal = function() {
  
                $scope.journeyModal.hide();
             
           };

    function getAllConsultations(){
      apiRepository.getConsultationAll().success(function(data){
        for (var i =  0; i < data.length; i++) {
        var theDate = new Date(data[i].consultation_date);
        data[i].consultation_date = (theDate.getMonth() + 1) + '/' + (theDate.getDate()) + '/' +  (theDate.getFullYear());

        if (data[i].consultation_typWearHair != 'undefined' && data[i].consultation_typWearHair != undefined){
          data[i].consultation_typWearHair = JSON.parse(data[i].consultation_typWearHair);
        }else{
          data[i].consultation_typWearHair = [];
        }

        if (data[i].consultation_likeToWearHair != 'undefined' && data[i].consultation_likeToWearHair != undefined){
          data[i].consultation_likeToWearHair = JSON.parse(data[i].consultation_likeToWearHair);
        }else{
          data[i].consultation_likeToWearHair = [];
        }

        if (data[i].consultation_products != 'undefined' && data[i].consultation_products != undefined){
          data[i].consultation_products = JSON.parse(data[i].consultation_products);
        }else{
          data[i].consultation_products = [];
        }

        if (data[i].consultation_challenges != 'undefined' && data[i].consultation_challenges != undefined){
          data[i].consultation_challenges = JSON.parse(data[i].consultation_challenges);
        }else{
          data[i].consultation_challenges = [];
        }
      };
      $scope.allUserConsultations = data;
      //console.log(data);
      })
      }
      getAllConsultations();


   /*consulModal Modal*/
          $ionicModal.fromTemplateUrl('pages/viewConsultation/viewConsultation.html', {
             scope: $scope,
             animation: 'slide-in-up'
           }).then(function(modal) {
             $scope.consulModal = modal
           })

           $scope.openConsulModal = function() {
             $scope.consulModal.show()
           }

           $scope.closeConsulModal = function() {

                $scope.consulModal.hide();
             
           };



           var activeTags = {};
           activeTags.typ = ['In its natural state','Wash and go','Straightened (with heat)','Protective styles (braids, twists, etc)','Set styles (twists, rollers, bantu knots, etc)','Weave/wigs'];
  activeTags.chall = ['Dryness','Product Buildup','Oily hair','Breakage','Frizzy','Shedding','Dull','Porous','Physical Damage: (heat, braids. weaves)','Chemical/color damage','Manageability/ Tangled','Dry Scalp','Dandruff','Dermatitis','Oily Scalp','Flaky Scalp','Sensitive Scalp'];
  $scope.loadHairTags = function(query) {
        return activeTags.typ;
      };
      $scope.loadChallenges = function(query) {
        //return activeTags.chall;

        activeTags.chall = [];
      var deferred = $q.defer();
        apiRepository.challSearch(query).success(function(data){

          for (var i = 0; i < data.length; i++) {
            activeTags.chall.push(data[i].challenge)
          };
          deferred.resolve(activeTags.chall);
          //return data;
        })
        return deferred.promise;
      };

      $scope.loadProductTages = function(query) {
        //return activeTags.products;

        activeTags.prods = [];
      var deferred = $q.defer();
        apiRepository.prodSearch(query).success(function(data){

          for (var i = 0; i < data.length; i++) {
            activeTags.prods.push(data[i].brandName + "- " + data[i].name)
          };
          deferred.resolve(activeTags.prods);
          //return data;
        })
        return deferred.promise;
        
      };

          /*consulModal Modal*/
          $ionicModal.fromTemplateUrl('pages/newConsultation/newConsultation.html', {
             scope: $scope,
             animation: 'slide-in-up'
           }).then(function(modal) {
             $scope.newConsulModal = modal
           })

           $scope.openNewConsulModal = function() {
             $scope.newConsulModal.show()
           }

           $scope.closeNewConsulModal = function() {

                $scope.newConsulModal.hide();
             
           };   

        $scope.requestConsultation = function(consulObj){
          //console.log(consulObj);

        apiRepository.reqConsultation(consulObj).success(function(data){
        if (data.error){
          toastr.error('Sorry.', 'Pending Request', {timeOut: 5000})

        };
        $scope.closeNewConsulModal();
        getAllConsultations();
        })
        }


        /*add Salon Modal*/
          $ionicModal.fromTemplateUrl('pages/addSalon/addSalon.html', {
             scope: $scope,
             animation: 'slide-in-up'
           }).then(function(smodal) {
             $scope.newSalonModal = smodal
           })

           var dbProducts;
            apiRepository.getAllStylist().success(function(data){
    // load products suggestion

          if (!data.error) {


               dbProducts = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: data,
                      });

                
              }
            
            });

           $scope.openSalonModal = function() {
             $scope.newSalonModal.show();

             $('#salonField').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        }, {
          display: 'name',
          source: dbProducts,
          templates: {
                empty: 'No results found',
                suggestion: function ( data ) {
                    return '<div style="padding:10px"><h5>' + 'Name: ' + data.name+   '</h5><p>' + " Address: "+ data.address +' '+ data.zipcode +'</p></div>';
                }
            }
        });
        $('.typeahead').bind('typeahead:select', function(ev, suggestion) {
          $scope.theSalonId = suggestion.id;
        });
           }

           $scope.closeSalonModal = function() {

                $scope.newSalonModal.hide();
             
           }; 

              
         

            

        $scope.userSalons = [];

          function getMySalons(){

            apiRepository.getMySalons().success(function(data){
              $scope.userSalons = data;
              //console.log(data);
            })
          }

          getMySalons();

          

      $scope.addSalon = function(){

        if ($scope.theSalonId) {

          theSalonId = $scope.theSalonId;


          apiRepository.addMySalon(theSalonId).success(function(data){

            if (!data.error){

              $cordovaToast.show('salon added', 'long', 'bottom').then(function(success) {
                  // success
                  
                }, function (error) {
                  // error
                });
            };
            $scope.closeSalonModal();
            getMySalons();
          })
        }else{

          $cordovaToast.show('Not a salon sorry', 'long', 'bottom').then(function(success) {
                  // success
                  
                }, function (error) {
                  // error
                });

          
        }

          


        }


          $scope.deleteSalon = function(salonID){

            apiRepository.deleteMySalon(salonID).success(function(data){
              if(!data.error){

                $cordovaToast.show('salon deleted', 'long', 'bottom').then(function(success) {
                  // success
                  
                }, function (error) {
                  // error
                });
                getMySalons();
              }
            })
          }

  $scope.mysqlTimeStampToDate = function(thedate){
    var theDate = new Date(thedate);
        return (theDate.getMonth() + 1) + '/' + (theDate.getDate()) + '/' +  (theDate.getFullYear());
  }
  $scope.viewConsultation = function(theConsultation){

    /*

    if (theConsultation.consultation_typWearHair){
      theConsultation.consultation_typWearHair = JSON.parse(theConsultation.consultation_typWearHair);
    }else{
      theConsultation.consultation_typWearHair = [];
    }

    if (theConsultation.consultation_likeToWearHair){
      theConsultation.consultation_likeToWearHair = JSON.parse(theConsultation.consultation_likeToWearHair);
    }else{
      theConsultation.consultation_likeToWearHair = [];
    }

    if (theConsultation.consultation_challenges){
      theConsultation.consultation_challenges = JSON.parse(theConsultation.consultation_challenges);
    }else{
      theConsultation.consultation_challenges = [];
    }

    if (theConsultation.consultation_products){
      theConsultation.consultation_products = JSON.parse(theConsultation.consultation_products);
    }else{
      theConsultation.consultation_products = [];
    }
    */


    $scope.consultationReq = theConsultation;
    $scope.openConsulModal();

  }

 
$scope.followUser = function(){


  apiRepository.follow($stateParams.userId).success(function(data){

    if(!data.msg){
      $scope.canFollow = false;
    }
    else{
      $scope.canFollow = true;
    }

  })
}

$scope.unFollowUser = function(){


  apiRepository.unFollow($stateParams.userId).success(function(data){

    if(data.msg == 'unfollowed'){
      $scope.canFollow = true;
    }
    else{
      $scope.canFollow = false;
    }

    
  })


}

$scope.updateProfile = function(newName,newEmail){

  if (newEmail) {

  apiRepository.userUpdateEmail(newEmail).success(function(data){

    if(data.msg == 'updated email'){

      
      $scope.userNewEmail = ""

     $cordovaToast
    .show('updated Email', 'long', 'bottom')
    .then(function(success) {
      // success
    }, function (error) {
      // error
    });
      $scope.email = newEmail;
    }
  })
  };

  if (newName) {

  apiRepository.userUpdateFullName(newName).success(function(data){

    if(data.msg == 'updated fullName'){
      $scope.userNewName = ""

      $cordovaToast
    .show('updated Name', 'long', 'bottom')
    .then(function(success) {
      // success
    }, function (error) {
      // error
    });
      $scope.fullName = newName;
    }
  })
  };


}

$rootScope.refreshHairJourney = function(){

apiRepository.getUserMedia($stateParams.userId,0).success(function(data){

      $scope.userPosts = data.Media;
      if ($scope.userPosts.length == 0){
          $scope.noLooks = true;
          $scope.moreUserPostCanBeLoaded = false;
        }else{
          $scope.noLooks = false;
          $scope.moreUserPostCanBeLoaded = true;
        }

    });

}
	
$rootScope.$on('$stateChangeStart', 
function(event, toState, toParams, fromState, fromParams){ 
    // do something
    $rootScope.contentIndex = 0;

    if (fromState.name == 'app.viewpost' && toState.name == 'app.profile') {

      $rootScope.refreshHairJourney();
      

    }else if (fromState.name == 'app.profile' && toState.name == 'app.profile'){
      console.log('Profile state shown twice')
      console.log(toParams.userId);
      if (toParams.userId == $localStorage.user.user.id){
        $rootScope.thisIsMyProfile = true;
        $scope.canFollow = false;
      };
    };
})

$scope.canLoadMorePost = function(){

  if ($scope.moreUserPostCanBeLoaded == true){
    return true;
  }else if(!$scope.userPosts){
    return false;
  }
  else{
    return false;
  }
};

$scope.loadMoreData = function(){

  var currentNumOfPost = $scope.userPosts.length;

if (currentNumOfPost % 20 == 0){
  apiRepository.getUserMedia($stateParams.userId,currentNumOfPost).success(function(data){
    if (data.returned != 0){
      for (var i = 0; i < data.Media.length; i++) {
        $scope.userPosts.push(data.Media[i])
      };
      $scope.moreUserPostCanBeLoaded = true;
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }else{
      $scope.moreUserPostCanBeLoaded = false;
    }
    
  })
}else{
  $scope.moreUserPostCanBeLoaded = false;
}

}


	$rootScope.changeProfileContent = function(indexOfContent){

  			$rootScope.contentIndex = indexOfContent;
        if (indexOfContent != 1) {

          $scope.searching = false;
        };

        $ionicScrollDelegate.scrollTop();
  		}

  $scope.goToServices = function(){
    var url = 'http://myavana.com/pages/services/';

    var options = {
  
    };

  $cordovaInAppBrowser.open(url, '_system', options);
  }


  	if(!$scope.userPosts){
  	apiRepository.getUser($stateParams.userId).success(function(data){


		$scope.userUsername = data.username
    
    $rootScope.refreshHairJourney();

  		/*
  		apiRepository.getTheUsersProfileImage(data.UserProfileImageId).success(function(data){

  			$scope.userProfileImage = data.profileImageUrl
  		})

		*/
    apiRepository.getTheUsersProfileImage(data.UserProfileImageId).success(function(data){


      $scope.image = 'img/myavanalogonotext.png';

      profileImg = new Image();

              profileImg.onload = function() {


                $scope.image = data.profileImageUrl;
              /*once loaded show the image*/
              //$element[0].src = img.src;
              //$element.addClass("ng-hide-add");
              //$scope.thisMainDisplayImg = img.src
              };
              profileImg.onerror = function(){

                if (data.UserProfileImageId && data.UserProfileImageId != "") {

                  $scope.image = 'https://s3.amazonaws.com/myavana/userUploads/'+data.UserProfileImageId+'.jpeg';
                };

                

                //$element.addClass("ng-hide-add");
              }
              profileImg.src = data.profileImageUrl
    })
  	})
  }
  $scope.moreFriendsCanBeLoaded = true;

  apiRepository.getGirlfriendsV2($stateParams.userId,0).success(function(data){
    $scope.canFollow = true;
    $scope.userFriends = data
    if (data.length == 0){
      $scope.noFriends = true;
    }else{
      $scope.noFriends = false;
    }
    /*
    for (var i = 0; i <= data.length -1; i++) {
      if (data[i].FollowingId == $localStorage.user.user.id) {

        $scope.canFollow = false;
        return;
      };
    };
    */

    apiRepository.canUserFollow($localStorage.user.user.id,$stateParams.userId).success(function(data){
      console.log(data);
      if (data.length != 0){
        $scope.canFollow = false;
      };
    })
  })

  $scope.loadMoreFriends = function(){

  var currentNumOfFriends = $scope.userFriends.length;

if (currentNumOfFriends % 25 == 0){
  apiRepository.getGirlfriendsV2($stateParams.userId,currentNumOfFriends).success(function(data){
    if (data.returned != 0){
      for (var i = 0; i < data.length; i++) {
        $scope.userFriends.push(data[i])
      };
      $scope.moreFriendsCanBeLoaded = true;
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }else{
      $scope.moreFriendsCanBeLoaded = false;
    }
    
  })
}else{
  $scope.moreFriendsCanBeLoaded = false;
}

}

$scope.canLoadMoreFriends = function(){

  if ($scope.moreFriendsCanBeLoaded == true){
    return true;
  }else{
    return false;
  }
};

$scope.activeTags = [];

apiRepository.getProducts().success(function(data){

    if (data.error) {

      toastr.error('Oops.', 'Problem getting product tags', {timeOut: 4000})

    }else{

      for (var i = 0; i <= data.length - 1; i++) {
        $scope.activeTags.push(data[i].name)
      };

      $scope.loadTags = function(query) {
        return $scope.activeTags;
      };

      $scope.allProdTags = data
    }

    

  })


});