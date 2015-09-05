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
            array.parseInt();

            //希尔排序
            shellSort(array);

            //控制结果的显示
            $scope.isShow = true;
        };

        //希尔排序算法
        function shellSort(array) {
            var i = 0,
                j = 0,
                k = 0,
                n = array.length,
                increment = n; //增量序列

            do{
                increment = Math.floor(increment / 3) + 1;
                for(i = increment; i < n; i++){
                    if(array[i] < array[i - increment]){
                        k = array[i];
                        for(j = i - increment; j >= 0 && k < array[j]; j -= increment){
                            array[j + increment] = array[j];
                        }
                        array[j + increment] = k;
                    }
                }
            }while(increment > 1);
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