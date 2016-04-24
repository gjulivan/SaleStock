var shellcontroller = function ($rootScope, $scope, hubservice, dataProcessor, dataservice, $document) {

    $scope.ViewState = { Value: "Main" };
  
    $scope.SWObjectList = { Value: [] };

    function init() {
        hubservice.RequestDataAsync(_dataUrl, eventEnum.RequestDataCompleted);
        hubservice.PopulateExcludedAttribute();
    }

    $scope.LoadPage = function (url) {
        $document[0].body.scrollTop = $document[0].documentElement.scrollTop = 0;
        var tableContainer = $document[0].getElementById("fixed");
        if (tableContainer != undefined) {
            tableContainer.scrollTop = 0;
        }
        dataservice.ClearData();
        hubservice.RequestDataAsync(url, eventEnum.RequestDetailCompleted);
        if ($scope.ViewState.Value != "Main") {
            $scope.ViewState.Value = "Main";
        }
    }

    $rootScope.$on(eventEnum.RequestDataCompleted, function (event, args) {
        $scope.$apply(function () {
            $scope.SWObjectList.Value = dataProcessor.GetMainMenuList(args.Value);;
        });
    });

    $rootScope.$on(eventEnum.RequestDetailCompleted, function (event, args) {
        dataProcessor.ProcessDetailList(args.Value);
        $scope.$broadcast(eventEnum.ProcessDetailList, undefined);
    });

    $rootScope.$on(eventEnum.RequestDetailChanged, function (event, args) {
        dataservice.SetSelectedData(args.Value);
        $scope.$broadcast(eventEnum.ProcessRequestDetailChanged, undefined);
    });

    $scope.$on(eventEnum.SwitchPage, function (event, args) {
        $scope.ViewState.Value = args.Value;
    });

    init();
}