var _cssDependencies = [
             'styles/base.css',
             'styles/metro.css'
];

function LoadCSSDependency(url) {
    var fileref = document.createElement("link");
    fileref.rel = "stylesheet";
    fileref.type = "text/css";
    fileref.href = url;
    document.getElementsByTagName("head")[0].appendChild(fileref);
};

_cssDependencies.forEach(LoadCSSDependency);

var eventEnum = {
    SwitchPage: "SwitchPage",
    RequestDataCompleted: "RequestDataCompleted",
    RequestDetailCompleted: "RequestDetailCompleted",
    RequestDetailChanged: "RequestDetailChanged",
    ProcessRequestDetailChanged: "ProcessRequestDetailChanged",
    ProcessDetailList: "ProcessDetailList"
}