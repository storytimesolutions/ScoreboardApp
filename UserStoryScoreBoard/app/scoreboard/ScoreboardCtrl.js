app.controller("ScoreboardCtrl", function ($scope, $firebase, $filter, FirebaseURL) {
    var userStoryRef = new Firebase(FirebaseURL +"/userstories");
    var syncUserStories = $firebase(userStoryRef);
    $scope.userstories = syncUserStories.$asArray();

    var devRef = new Firebase(FirebaseURL + "/developers");
    var syncDevelopers = $firebase(devRef);
    $scope.developers = syncDevelopers.$asArray();


    //Sorting and filter functions
    $scope.awesomenessOfDevelopers = function (developer) {
        var numUnitTests = $scope.getNumberOfUnitTestsForADeveloper(developer);
        var numSeleniumTests = $scope.getNumberOfSeleniumTestsForADeveloper(developer);
        return numUnitTests + numSeleniumTests * 2;
    };

    $scope.getNumberOfUnitTestsForADeveloper = function (developer) {
        return $filter('searchDeveloperUnitTests')($scope.userstories, developer.$id).length;
    };

    $scope.getNumberOfSeleniumTestsForADeveloper = function (developer) {
        return $filter('searchDeveloperSeleniumTests')($scope.userstories, developer.$id).length;
    };

    $scope.getNumberOfUserStoriesWithUnitTests = function (userstories) {
        return $filter('numberWithUnitTests')(userstories);
    };

    $scope.getNumberOfUserStoriesWithSeleniumTests = function (userstories) {
        return $filter('numberWithSeleniumTests')(userstories);
    };
});