(function(){
    Array.prototype.parseInt = function(){
        for(var i = 0; i < this.length; i++){
            this[i] = parseInt(this[i]);
        }
    }
})();

;
angular.module('app', [], angular.noop)
    .controller('ctrl', function($scope, $sce) {
        // $scope.arrayString = '1 16 24 35 47 100 59 62 73 88 99';
        $scope.arrayString = '';
        $scope.key = '';
        $scope.result = '';
        $scope.isShow = false;

        var array = [];

        $scope.$watch('arrayString', function(newValue, oldValue, otherScope) {
            //隐藏结果
            $scope.isShow = false;
        });

        $scope.$watch('key', function(newValue, oldValue, otherScope) {
            //隐藏结果
            $scope.isShow = false;
        });

        $scope.search = function() {
            if(!valid()){
                return;
            }
            //初始化
            $scope.result = '';

            //将字符串变成数组
            array = $scope.arrayString.split(' ');
            array.parseInt();

            //顺序查找
            sequentialSearch(array, array.length, $scope.key);

            //控制结果的显示
            $scope.isShow = true;
        };

        //顺序查找算法
        function sequentialSearch(array, n, key) {
            var i = 0;
            while(i < n){
                if(key == array[i]){
                    $.each(array, function(index, val) {
                        if (val != key) {
                            $scope.result += (val + ' ');
                        } else {
                            $scope.result += ('<span class="value">' + val + ' </span>');
                        }
                    });
                    $scope.result += '共查找<span class="value">' + (i + 1) + '</span>次';
                    $scope.result = $sce.trustAsHtml($scope.result);
                    return;
                }
                i++;
            }
            $scope.result = $sce.trustAsHtml('找不到，共查找<span class="value">' + i + '</span>次');
        }

        //前端验证
        function valid(){
            if($scope.arrayString == '' || $scope.key == ''){
                $scope.result = $sce.trustAsHtml('不能为空');
                $scope.isShow = true;
                return false;
            }
            return true;
        }
    });

;
$(function() {
    angular.bootstrap(document, ['app']);
});