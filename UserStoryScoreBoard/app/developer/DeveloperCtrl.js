app.controller("DeveloperCtrl", function ($scope, $firebase, FirebaseURL) {
    var ref = new Firebase(FirebaseURL + "/developers");
    var sync = $firebase(ref);
    $scope.developers = sync.$asArray();

    $scope.developer = {
        name: ""
    };

    $scope.addDeveloper = function (developer) {
        $scope.developers.$add({ name: developer.name });
        developer.name = "";
    }

    $scope.removeDeveloper = function (developer) {
        $scope.developers.$remove(developer);
    }
});