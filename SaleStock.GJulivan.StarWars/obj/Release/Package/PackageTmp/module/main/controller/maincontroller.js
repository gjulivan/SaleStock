var maincontroller = function ($scope, hubservice,dataProcessor, dataservice) {

    $scope.LoadMoreLabel = "Please Select a Category...";
    $scope.SWObjectDetailList = { Value: [] };
    $scope.IsNextAvailable = true;
    $scope.PropertyAttr = [];
    function UpdateData() {
        $scope.$apply(function () {
            $scope.LoadMoreLabel = "Load More...";
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

    $scope.HeaderFilter = function (data) {
        var excludedAttrs = hubservice.GetExcludedMainAttributes();
        for (var idx = 0; idx < excludedAttrs.length; idx++) {
            if (excludedAttrs[idx].indexOf(data.key) != -1) {
                return false;
            }
        }
        return true;
    }
}
