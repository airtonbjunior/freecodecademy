var app = angular.module('wikiView', []);

app.controller('mainController', ['$scope', '$http', function($scope, $http){
  
  /* call the api and pass parameter in the query */
  getWikiPages = function(parameter) {
    // [1]
    $http.get("https://en.wikipedia.org/w/api.php?format=json&action=query&formatversion=2&generator=prefixsearch&gpssearch=" + parameter + "&gpslimit=100&prop=pageimages%7Cpageterms&piprop=thumbnail&pithumbsize=50&pilimit=100&redirects=&wbptterms=description&origin=*").
      then(function(response){
        console.log(response);
        /* check if return at least one result [2]*/
        if(response["data"].hasOwnProperty("query")) {
          $scope.pages = response.data.query.pages;  
        }
        else {
          alert("No results found for " + parameter);
          return;
        }
        
    });
  }
  
  $scope.search = function() {
    if (!!!$scope.paramSearch) { // Verify if this value is a falsy value (!!!). I'm very glad I remembered that
      alert("WHAT THE PARAMETER, MAN?!");
      return;
    }
    getWikiPages($scope.paramSearch);
  }
  
  //getWikiPages();
  
}]);

/*
  References
    [1] - http://forum.freecodecamp.com/t/the-wikipedia-api-does-not-support-cors-requests/16595/2
    [2] - http://stackoverflow.com/questions/11040472/check-if-object-property-exists-using-a-variable
*/