var dataProcessor = function (dataservice) {

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


    return {
        GetMainMenuList: GetMainMenuList,
        ProcessDetailList: ProcessDetailList
    };
}