app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/UserStories', {
            templateUrl: 'app/userstory/userstories.html',
            controller: 'UserStoriesCtrl'
        }).
        when('/AddUserStory', {
            templateUrl: 'app/userstory/adduserstories.html',
            controller: 'UserStoriesCtrl'
        }).
        when('/AddDeveloper', {
            templateUrl: 'app/developer/adddevelopers.html',
            controller: 'DeveloperCtrl'
        }).
        when('/Scoreboard', {
            templateUrl: 'app/scoreboard/scoreboard.html',
            controller: 'ScoreboardCtrl'
        }).
        otherwise({
            redirectTo: '/Scoreboard'
        });
  }]);