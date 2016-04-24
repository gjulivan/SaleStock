var detailView = function ($compile, hubservice) {
    return {
        restrict: 'E',
        scope: {
            value: '=value',
            onDataClick: "&onDataClick"
        },
        link: function (scope, element, attrs) {
            var data = scope.value;
            var newData = "";
           if (data.indexOf("http://") != -1) {

                var OnSuccessRequest = function (result){
                    newData = result.name;
                    if (newData == "" || newData == undefined) {
                        newData = result.title;
                    }
                    newData = "<button class=\'button\' ng-click=\"onDataClick(data)\">" + newData + "</button>";

                    var content = $compile(newData)(scope);
                    element.append(content);
                }

                hubservice.RequestDataAsyncWithCallBackFunction(data, OnSuccessRequest);
                
            }
            else {
                newData = "<span>" + data + "</span>";

                var content = $compile(newData)(scope);
                element.append(content);
            }
        }
    };

};