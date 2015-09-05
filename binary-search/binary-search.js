angular.module('app', [], angular.noop)
.controller('ctrl', function($scope) {
    $scope.arrayString = 'test';
    $scope.key = 0;
    $scope.array = [];

    //查找算法
    $scope.search = function(){
        console.log('test');
    };
});
$(function() {
    angular.bootstrap(document, ['app']);
});