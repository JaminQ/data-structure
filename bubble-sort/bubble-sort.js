;
angular.module('app', [], angular.noop)
    .controller('ctrl', function($scope, $sce) {
        $scope.arrayString = '1 16 24 35 47 100 59 62 73 88 99';
        // $scope.arrayString = '';
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

        $scope.sort = function() {
            if(!valid()){
                return;
            }
            //初始化
            $scope.result = '';

            //将字符串变成数组
            array = $scope.arrayString.split(' ');

            //对array进行排序
            array.sort(sortNumber);

            //冒泡排序
            bubbleSort(array, array.length, $scope.key);

            //控制结果的显示
            $scope.isShow = true;
        };

        //冒泡排序算法
        function bubbleSort(array, n, key) {
            var low = 0,
                high = n - 1,
                mid,
                i = 0; //记录查找次数
            while (low <= high) {
                i++; //查找次数+1

                mid = Math.floor((low + high) / 2);

                if (key < array[mid]) {
                    high = mid - 1;
                } else if (key > array[mid]) {
                    low = mid + 1;
                } else {
                    $.each(array, function(index, val) {
                        if (val != array[mid]) {
                            $scope.result += (val + ' ');
                        } else {
                            $scope.result += ('<span class="value">' + val + ' </span>');
                        }
                    });
                    $scope.result += '共查找<span class="value">' + i + '</span>次';
                    $scope.result = $sce.trustAsHtml($scope.result);
                    return;
                }
            }
            $scope.result = $sce.trustAsHtml('找不到，共查找<span class="value">' + i + '</span>次');
        }

        //sort()用到的排序函数
        function sortNumber(a, b) {
            return a - b;
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