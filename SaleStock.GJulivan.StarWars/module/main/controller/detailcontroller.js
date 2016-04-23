var detailcontroller = function ($scope, hubservice, dataservice) {
    
    $scope.CurrentData = dataservice.GetSelectedData();
    $scope.PropertyAttr = dataservice.GetPropertyAttributes($scope.CurrentData);


}
