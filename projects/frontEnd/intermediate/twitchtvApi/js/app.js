var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];

//var channels = ["brunofin", "comster404"];

var baseUrlAPI = "https://api.twitch.tv/kraken/streams/"

var app = angular.module('twitch', []);

app.controller('mainController', ['$scope', '$http', function($scope, $http){

  $scope.channelsOk = [];
  var ch = [];
  
  /* REFACTOR ALL THIS METHOD. I'M JUST TESTING. MAKE A GOOD AND ELEGANT CODE! :D */
  getTwitchChannels = function(){
    
    for (var i = 0; i < channels.length; i++) {
      getStream(channels[i], i);
    } 
    $scope.channelsOk = ch;
  } // end getTwitchChannels function
  
  
  /* Auxiliar functions */
  
  /* getStream 
   * Call the API with the param
   */
  getStream = function(param, index) {
    $http.get(baseUrlAPI + param + "?client_id=9plca66vbfgmaj3narb9ebf3rxwafd0").
    then(function(response){
      console.log(response);
      if(response.data.stream == null) {
        response.data.name = param;
        ch[index] = response;
      } else {
        response.data.name = param;
        ch[index] = response;
      }
    }, 
    function errorCallback(response){
      response.data.name = param;
      ch[index] = response;
    }); 
  } // end getStream function
  
  
  getTwitchChannels();

}]); // end controller