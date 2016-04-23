﻿var dataservice = function () {

    var _nextRequest = "";
    var _detailList = [];
    var _selectedData = {};

    function ClearData() {
        _detailList = [];
    }

    function GetDetailList() {
        return _detailList;
    }

    function AppendDetail(data) {
        _detailList.push(data);
    }

    function SetNextRequestUrl(url) {
        _nextRequest = url;
    }

    function GetNextRequestUrl() {
        return _nextRequest;
    }

    function SetSelectedData(data) {
        _selectedData = data;
    }

    function GetSelectedData() {
        return _selectedData;
    }

    function GetPropertyAttributes(data) {
        if (data == undefined)
        {
            data = _detailList[0];
        }
        var list = [];
        if (_detailList.length > 0) {
            for (var property in data) {
                list.push(property);
            }
        }
        return list;
    }

    return {
        ClearData:ClearData,
        GetDetailList: GetDetailList,
        AppendDetail: AppendDetail,
        SetNextRequestUrl: SetNextRequestUrl,
        GetNextRequestUrl: GetNextRequestUrl,
        GetPropertyAttributes: GetPropertyAttributes,
        SetSelectedData: SetSelectedData,
        GetSelectedData: GetSelectedData
    };
}