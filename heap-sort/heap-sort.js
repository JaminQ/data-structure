(function(){
    //交换算法
    Array.prototype.swap = function(i, j){
        this[i] = this[i] + this[j];
        this[j] = this[i] - this[j];
        this[i] = this[i] - this[j];
    };

    Array.prototype.parseInt = function(){
        for(var i = 0; i < this.length; i++){
            this[i] = parseInt(this[i]);
        }
    }
})();

;
angular.module('app', [], angular.noop)
    .controller('ctrl', function($scope) {
        $scope.arrayString = '9 1 5 8 3 7 4 6 2';
        // $scope.arrayString = '';
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
            array.parseInt();

            //堆排序
            heapSort(array);

            //控制结果的显示
            $scope.isShow = true;
        };

        //堆排序算法
        function heapSort(array) {
            var i = 0,
                j = 0,
                k = 0,
                n = array.length;
            for(i = 1; i <= n; i++){
                if(array[i] < array[i - 1]){
                    k = array[i];
                    for(j = i - 1; array[j] > k; j--){
                        array[j + 1] = array[j];
                    }
                    array[j + 1] = k;
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