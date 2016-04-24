var hubservice = function ($rootScope, $firebaseArray) {

    var _excludedMainAttributes = [];

    function PopulateExcludedAttribute() {
        var subUrl = "ExcludedMainAttributes";
        var fireRef = new Firebase(_firebaseUrl + subUrl);
        var syncObject = $firebaseArray(fireRef);

        syncObject.$loaded()
              .then(function () {
                  _excludedMainAttributes = ConvertFirebaseArray(syncObject);
              });
    }

    function ConvertFirebaseArray(firebaseArr) {
        var result = [];
        for (var idx = 0; idx < firebaseArr.length; idx++) {
            result.push(firebaseArr[idx].$value);
        }
        return result;
    }

    function GetExcludedMainAttributes() {
        return _excludedMainAttributes;
    }

    function ValidateUrl(url) {
        if (url.toLowerCase().indexOf("format=json") === -1) {
            if (url.toLowerCase().indexOf("?") === -1) {
                url = url + "?format=json";
            }
            else {
                url = url + "&format=json";
            }
        }
        return url;
    }


    function RequestData(url) {
        url = ValidateUrl(url);
        var oReq = new XMLHttpRequest();
        oReq.open('GET', url, false);
        oReq.send();

        if (oReq.status === 200) {
            return JSON.parse( oReq.responseText);
        }

    }

    function RequestDataAsync(url, callbackEvent) {
        url = ValidateUrl(url);
        var oReq = new XMLHttpRequest();
        oReq.onload = function (e) {
            var xhr = e.target;
            if (xhr.responseType === 'json') {
                $rootScope.$broadcast(callbackEvent, { Value: xhr.response });
            } else {
                $rootScope.$broadcast(callbackEvent, { Value: JSON.parse(xhr.responseText) });
            }
        };
        oReq.onreadystatechange = function () {

        };
        oReq.open('GET', url, true);
        oReq.responseType = 'json';
        oReq.send();
    }

    function RequestDataAsyncWithCallBackFunction(url, callbackFunction) {
        url = ValidateUrl(url);
        var oReq = new XMLHttpRequest();
        oReq.onload = function (e) {
            var xhr = e.target;
            if (xhr.responseType === 'json') {
                callbackFunction(xhr.response );
            } else {
                callbackFunction(JSON.parse(xhr.responseText));
            }
        };
        oReq.onreadystatechange = function () {

        };
        oReq.open('GET', url, true);
        oReq.responseType = 'json';
        oReq.send();
    }

    return {
        PopulateExcludedAttribute: PopulateExcludedAttribute,
        GetExcludedMainAttributes: GetExcludedMainAttributes,
        RequestDataAsync: RequestDataAsync,
        RequestDataAsyncWithCallBackFunction:RequestDataAsyncWithCallBackFunction,
        RequestData: RequestData
    };

}