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
        // $scope.arrayString = '50 10 90 30 70 40 80 60 20';
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

            //快速排序
            quickSort(array);

            //控制结果的显示
            $scope.isShow = true;
        };

        //快速排序算法
        function quickSort(array) {
            var i = 0,
                n = array.length;

            for(i = Math.floor(n / 2) - 1; i >= 0; i--){
                heapAdjust(array, i, n - 1);
            }

            for(i = n - 1; i > 0; i--){
                array.swap(0, i);
                heapAdjust(array, 0, i - 1);
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