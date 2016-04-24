var mainmodule = angular.module("salestock", ['firebase']);

mainmodule.factory('dataservice', [dataservice]);
mainmodule.factory('dataProcessor', ['dataservice', dataProcessor]);
mainmodule.factory('hubservice', ['$rootScope', hubservice]);

detailcontroller.$inject = ['$scope', 'hubservice', 'dataservice'];
maincontroller.$inject = ['$scope', 'hubservice', 'dataservice'];
shellcontroller.$inject = ['$rootScope', '$scope', 'hubservice', 'dataProcessor', 'dataservice'];

mainmodule.controller('detailcontroller', detailcontroller);
mainmodule.controller('maincontroller', maincontroller);
mainmodule.controller('shellcontroller', shellcontroller);

mainmodule.directive('detailView', ['$compile','hubservice', detailView]);
mainmodule.directive('whenScrolled', [whenScrolled]);
