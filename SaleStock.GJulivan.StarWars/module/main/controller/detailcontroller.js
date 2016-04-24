var detailcontroller = function ($scope, hubservice, dataservice) {
    
    $scope.CurrentData = dataservice.GetSelectedData();
    $scope.PropertyAttr = dataservice.GetPropertyAttributes($scope.CurrentData);

    $scope.IsArray = function (data) {
        return (data.constructor == Array);
    }

    $scope.LoadData = function (data) {
        hubservice.RequestDataAsync(data, eventEnum.RequestDetailChanged);
    }

    $scope.$on(eventEnum.ProcessRequestDetailChanged, function (event, args) {
        //Clear Previous Data
        $scope.$apply(function () {
            $scope.CurrentData = {};
            $scope.PropertyAttr = [];
        });
        //set new data
        $scope.$apply(function () {
            $scope.CurrentData = dataservice.GetSelectedData();
            $scope.PropertyAttr = dataservice.GetPropertyAttributes($scope.CurrentData);
        });
        
    });

    



}
