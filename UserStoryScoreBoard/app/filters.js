//This takes in an array of developerIds and returns those that match the developerId passed in
app.filter('searchDeveloper', function ($filter) {
    return function (items, developerId) {
        var matchingItems = [];
        if (angular.isUndefined(items)) {
            return matchingItems;
        };
        for (var i = 0; i < items.length; i++) {
            if (items[i] == developerId) {
                matchingItems.push(items[i]);
            };
        };
        return matchingItems;
    };
});

//This takes in an array of userstories and returns unitTests that match the developerId passed in
app.filter('searchDeveloperUnitTests', function ($filter) {
    return function (userstories, developerId) {
        var matchingItems = [];
        for (var i = 0; i < userstories.length; i++) {
            if (angular.isUndefined(userstories[i].unitTests)) {
                continue;
            }
            for (var j = 0; j < userstories[i].unitTests.length; j++) {
                if (userstories[i].unitTests[j] == developerId) {
                    matchingItems.push(userstories[i].unitTests[j]);
                };
            }
        };
        return matchingItems;
    };
});

//This takes in an array of userstories and returns seleniumTests that match the developerId passed in
app.filter('searchDeveloperSeleniumTests', function ($filter) {
    return function (userstories, developerId) {
        var matchingItems = [];
        for (var i = 0; i < userstories.length; i++) {
            if (angular.isUndefined(userstories[i].seleniumTests)) {
                continue;
            }
            for (var j = 0; j < userstories[i].seleniumTests.length; j++) {
                if (userstories[i].seleniumTests[j] == developerId) {
                    matchingItems.push(userstories[i].seleniumTests[j]);
                };
            }
        };
        return matchingItems;
    };
});

//This takes in an array of userstories and returns number of userstories with unit tests
app.filter('numberWithUnitTests', function ($filter) {
    return function (userstories) {
        var count = 0;
        for (var i = 0; i < userstories.length; i++) {
            if (angular.isUndefined(userstories[i].unitTests)) {
                continue;
            }
            else if (userstories[i].unitTests.length > 0) {
                count++;
            }
        };
        return count;
    };
});

//This takes in an array of userstories and returns number of userstories with selenium tests
app.filter('numberWithSeleniumTests', function ($filter) {
    return function (userstories) {
        var count = 0;
        for (var i = 0; i < userstories.length; i++) {
            if (angular.isUndefined(userstories[i].seleniumTests)) {
                continue;
            }
            else if (userstories[i].seleniumTests.length > 0) {
                count++;
            }
        };
        return count;
    };
});

app.filter('percentage', ['$filter', function ($filter) {
    return function (input, decimals) {
        return $filter('number')(input * 100, decimals) + '%';
    };
}]);

app.filter('unique', function () {

    return function (items, filterOn) {

        if (filterOn === false) {
            return items;
        }

        if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
            var hashCheck = {}, newItems = [];

            var extractValueToCompare = function (item) {
                if (angular.isObject(item) && angular.isString(filterOn)) {
                    return item[filterOn];
                } else {
                    return item;
                }
            };

            angular.forEach(items, function (item) {
                var valueToCheck, isDuplicate = false;

                for (var i = 0; i < newItems.length; i++) {
                    if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (!isDuplicate) {
                    newItems.push(item);
                }

            });
            items = newItems;
        }
        return items;
    };
});