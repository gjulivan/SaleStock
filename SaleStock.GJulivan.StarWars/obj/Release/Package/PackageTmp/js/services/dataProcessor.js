var dataProcessor = function (dataservice) {

    var _excludedMainAttribute = ["created", "edited", "url"];
    function GetMainMenuList(data) {
        var list = [];
        for (var property in data) {
            var SWObject = {
                name: property,
                value: data[property]
            }
            list.push(SWObject);
        }

        return list;
    }

    function ProcessDetailList(data) {
        dataservice.SetNextRequestUrl(data.next);
        for (var idx = 0; idx < data.results.length; idx++) {
            dataservice.AppendDetail(data.results[idx]);
        }
        return dataservice.GetDetailList();
    }

    function IsDataIncluded(data) {
        for (var idx = 0; idx < _excludedMainAttribute.length; idx++) {
            if (_excludedMainAttribute[idx].indexOf(data) != -1) {
                return false;
            }
        }

        return true;
    }


    return {
        GetMainMenuList: GetMainMenuList,
        ProcessDetailList: ProcessDetailList,
        IsDataIncluded: IsDataIncluded
    };
}