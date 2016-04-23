var hubservice = function ($rootScope) {


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

    function RequestDataAsync(url, callbackEvent) {
        url = ValidateUrl(url);
        oReq = new XMLHttpRequest();
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


    return {
        RequestDataAsync: RequestDataAsync
    };

}