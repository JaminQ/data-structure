(function(){
    //交换算法
    Array.prototype.swap = function(i, j){
        this[i] = this[i] + this[j];
        this[j] = this[i] - this[j];
        this[i] = this[i] - this[j];
    };
})();

;
angular.module('app', [], angular.noop)
    .controller('ctrl', function($scope) {
        // $scope.arrayString = '9 1 5 8 3 7 4 6 2';
        $scope.arrayString = '';
        $scope.result = '';
        $scope.isShow = false;

        var array = [];

        $scope.$watch('arrayString', function(newValue, oldValue, otherScope) {
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
            $.each(array, function(index, val){
                array[index] = parseInt(val);
            });

            //冒泡排序
            bubbleSort2(array);

            //控制结果的显示
            $scope.isShow = true;
        };

        //冒泡排序算法(优化)
        function bubbleSort2(array) {
            var i = 0,
                j = 0,
                n = array.length,
                flag = true; //标记是否需要排序

            for(i = 0; i < n - 1 && flag; i++){
                flag = false;
                for(j = i + 1; j < n; j++){
                    if(array[i] > array[j]){
                        array.swap(i, j);
                        flag = true;
                    }
                }
            }
            $scope.result = array.join(' ');
        }

        //前端验证
        function valid(){
            if($scope.arrayString == '' || $scope.key == ''){
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