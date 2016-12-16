var lat = 0;
var long = 0;

//var thunderstormImage = "http://farmersalmanac.com/wp-content/uploads/2015/06/Thunderstorm-5best.jpg";
//var clearImage = "http://cdn.weatheravenue.com/img/background/background.jpg";
//var urlImageSnow = "";

//var iconImage = "http://openweathermap.org/img/w/";

var myAPIKey = "cdd88fe9af713b7fd47b52c1c6ba99c8";


 
$( document ).ready( function(){
  //document.body.style.background = "#fff";
  //getPosition(lat, long, getWeatherData);
  getWeatherData();
} );

var app = angular.module("weatherApp", []);


app.controller("weatherController", ['$scope', '$http', function($scope, $http) {
  $scope.isActiveC = true;
  $scope.isActiveF = false;
  
  $scope.cityName = 'City Name';
  $scope.temperature = 'Temperature ºC';
  $scope.weatherIcon = "";
  document.body.style.background = "#662d91";
  
  
  getWeatherData = function () {
    $http.get("http://ip-api.com/json").
      then(function(response){   
        console.log(response);
        $http.get("http://api.openweathermap.org/data/2.5/weather?lat="+ response.data.lat + "&lon=" + response.data.lon + "&appid=" + myAPIKey + "&units=metric").
          then(function(response2){
            console.log(response2);
            $scope.cityName = response2.data.name;
            $scope.temperature = response2.data.main.temp;
            $scope.temperatureType = "ºC";
            $scope.weatherId = response2.data.weather[0].id;
            if(Math.floor(response2.data.main.temp) > 40) {
              document.body.style.background = "#ffc601";
            }
            else if (Math.floor(response2.data.main.temp) <= 40 && Math.floor(response2.data.main.temp) > 30) {
              document.body.style.background = "#662d91"; 
            } else if (Math.floor(response2.data.main.temp) <= 30 && Math.floor(response2.data.main.temp) > 20) {
              document.body.style.background = "#1abc9c"; 
            } else if (Math.floor(response2.data.main.temp) <= 20 && Math.floor(response2.data.main.temp) > 10) {
              document.body.style.background = "#34495e"; 
            } else if (Math.floor(response2.data.main.temp) <= 10) {
              document.body.style.background = "#7f8c8d"; 
            }
          }); // end then get api.openweathermap
      }); // end then get ip-api.com/json
  } // end getWeatherData function
 
  $scope.farh = function () {
    if ($scope.temperatureType != "ºF") {
      $scope.temperature = $scope.temperature * 9 / 5 + 32;
      $scope.temperatureType = "ºF";
      $scope.isActiveC = false;
      $scope.isActiveF = true;
    }
  }
  
  $scope.celsius = function () {
    if ($scope.temperatureType != "ºC") {
      $scope.temperature = ($scope.temperature - 32) * 5 / 9;
      $scope.temperatureType = "ºC";
      $scope.isActiveF = false;
      $scope.isActiveC = true;
    }
  }
  
}]);