var maincontroller = function ($scope, hubservice, dataservice) {

    $scope.SWObjectDetailList = { Value: [] };
    $scope.IsNextAvailable = true;
    $scope.PropertyAttr = [];
    function UpdateData() {
        $scope.$apply(function () {
            $scope.IsNextAvailable = dataservice.GetNextRequestUrl() != null;
            $scope.SWObjectDetailList.Value = dataservice.GetDetailList();
            $scope.PropertyAttr = dataservice.GetPropertyAttributes();
        });
    }
    $scope.LoadMore = function () {
        if ($scope.IsNextAvailable) {
            hubservice.RequestDataAsync(dataservice.GetNextRequestUrl(), eventEnum.RequestDetailCompleted);
        }
    }

    $scope.LoadDetail = function (data) {
        dataservice.SetSelectedData(data);
        $scope.$emit(eventEnum.SwitchPage, { Value: "Detail" });
    }

    $scope.$on(eventEnum.ProcessDetailList, function (event, args) {
        UpdateData();
    });
}
