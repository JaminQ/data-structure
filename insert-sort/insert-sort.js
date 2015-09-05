(function(){
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

            //直接插入排序
            insertSort(array);

            //控制结果的显示
            $scope.isShow = true;
        };

        //直接插入排序算法
        function insertSort(array) {
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