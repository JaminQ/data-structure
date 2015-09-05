(function() {
    //交换算法
    Array.prototype.swap = function(i, j) {
        var temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    };

    Array.prototype.parseInt = function() {
        for (var i = 0; i < this.length; i++) {
            this[i] = parseInt(this[i]);
        }
    }
})();

;
angular.module('app', [], angular.noop)
    .controller('ctrl', function($scope) {
        // $scope.arrayString = '50 10 90 30 70 40 80 60 20';
        $scope.arrayString = '';
        $scope.result = '';
        $scope.isShow = false;

        var array = [],
            MAX_LENGTH_INSERT_SORT = 7; //数组长度阀值

        $scope.$watch('arrayString', function(newValue, oldValue, otherScope) {
            //隐藏结果
            $scope.isShow = false;
        });

        $scope.sort = function() {
            if (!valid()) {
                return;
            }
            //初始化
            $scope.result = '';

            //将字符串变成数组
            array = $scope.arrayString.split(' ');
            array.parseInt();

            //快速排序
            quickSort2(array, 0, array.length - 1);

            //控制结果的显示
            $scope.isShow = true;
        };

        //快速排序算法(优化)
        function quickSort2(array, low, high) {
            var pivot;

            if ((high - low) > MAX_LENGTH_INSERT_SORT) { //优化3：优化小数组时的排序方案，小数组使用直接插入排序
                while (low < high) {
                    pivot = partition(array, low, high);

                    quickSort2(array, low, pivot - 1);
                    low = pivot + 1; //优化4：优化递归操作，尾递归
                }
            } else { //优化3：优化小数组时的排序方案，小数组使用直接插入排序
                insertSort(array);
            }

            $scope.result = array.join(' ');
        }

        function partition(array, low, high) {
            //优化1：三数取中，使array[low]为左中右三个关键字的中间值
            var m = low + Math.floor((high - low) / 2);
            if (array[low] > array[high]) {
                array.swap(low, high);
            }
            if (array[m] > array[high]) {
                array.swap(m, high);
            }
            if (array[m] > array[low]) {
                array.swap(low, m);
            }

            var pivotKey = array[low],
                k = pivotKey; //优化2：采用替换而不是交换的方式进行操作

            while (low < high) {
                while (low < high && array[high] >= pivotKey) {
                    high--;
                }
                array[low] = array[high]; //优化2：采用替换而不是交换的方式进行操作
                while (low < high && array[low] <= pivotKey) {
                    low++;
                }
                array[high] = array[low]; //优化2：采用替换而不是交换的方式进行操作
            }
            array[low] = k; //优化2：采用替换而不是交换的方式进行操作
            return low;
        }

        //直接插入排序算法
        function insertSort(array) {
            var i = 0,
                j = 0,
                k = 0,
                n = array.length;
            for (i = 1; i <= n; i++) {
                if (array[i] < array[i - 1]) {
                    k = array[i];
                    for (j = i - 1; array[j] > k; j--) {
                        array[j + 1] = array[j];
                    }
                    array[j + 1] = k;
                }
            }
        }

        //前端验证
        function valid() {
            if ($scope.arrayString == '' || $scope.key == '') {
                $scope.result = '不能为空';
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