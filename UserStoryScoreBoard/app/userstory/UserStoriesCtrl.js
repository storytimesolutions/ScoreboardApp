app.controller("UserStoriesCtrl", function ($scope, $firebase, FirebaseURL) {
    var userStoryRef = new Firebase( FirebaseURL + "/userstories");
    var syncUserStories = $firebase(userStoryRef);
    $scope.userstories = syncUserStories.$asArray();

    var devRef = new Firebase(FirebaseURL+ "/developers");
    var syncDevelopers = $firebase(devRef);
    $scope.developers = syncDevelopers.$asArray();

    $scope.userstory = {
        inputWINumber: "",
        inputTitle: "",
        inputIteration: "",
        inputSprint: ""
    };

    $scope.addTestToUserStory = function (userstories, userstory, testType, developer) {
        if (testType == "Unit Tests") {
            if (angular.isUndefined(userstory.unitTests)) {
                userstory.unitTests = [developer.$id];
            } else {
                userstory.unitTests.push(developer.$id);
            }
        }
        else if (testType == "Selenium Tests") {
            if (angular.isUndefined(userstory.seleniumTests)) {
                userstory.seleniumTests = [developer.$id];
            } else {
                userstory.seleniumTests.push(developer.$id);
            }
        }

        userstories.$save(userstory);
        
    };

    $scope.removeTestFromUserStory = function (userstories, userstory, testType, developer) {
        var id = developer.$id;
        if (testType == "Unit Tests") {
            if (angular.isUndefined(userstory.unitTests)) {
                return;
            } else {
                var index = userstory.unitTests.indexOf(id);
                if (index > -1) {
                    userstory.unitTests.splice(index, 1);
                }
            }
        }
        else if (testType == "Selenium Tests") {
            if (angular.isUndefined(userstory.seleniumTests)) {
                return;
            } else {
                var index = userstory.seleniumTests.indexOf(id);
                if (index > -1) {
                    userstory.seleniumTests.splice(index, 1);
                }
            }
        }

        userstories.$save(userstory);

    };

    $scope.addUserStory = function (userstory) {
        $scope.userstories.$add({ wiNumber: userstory.inputWINumber, title: userstory.inputTitle, iteration: userstory.inputIteration, sprint: userstory.inputSprint, unitTests: [] });
        userstory.inputWINumber = "";
        userstory.inputTitle = "";
        userstory.inputIteration = "";
        userstory.inputSprint = "";
    }

    $scope.removeUserStory = function (story) {
        $scope.userstories.$remove(story);
    }
});