angular.module("exampleApp", [])
.constant("baseUrl", "http://localhost:3000/products/")
.controller("defaultCtrl", function ($scope, $http, baseUrl) {
    
    $scope.displayMode = "list";
    $scope.currentProduct = null;    
    
    $scope.listProducts = function () {        
        $http.get(baseUrl).success(function (data) {
            $scope.products = data;
        });
    }
    
    $scope.deleteProduct = function (product) {        
        $http({
            method : "DELETE",
            url: baseUrl + product._id
        }).success(function () {            
            $scope.listProducts();
        });
        $scope.displayMode = "list";
    }
    
    $scope.createProduct = function (product) {        
        $http.post(baseUrl, product).success(function (newProduct) {            
            $scope.listProducts();
            $scope.displayMode = "list";
        });
    }
    
    
    $scope.updateProduct = function (product) {        
        $http({
            url: baseUrl + product._id,
            method: "PUT",
            data: product
        }).success(function (modifiedProduct) {            
            $scope.listProducts();
            $scope.displayMode = "list";
        });        
    }
    
    $scope.editOrCreateProduct = function (product) {
        $scope.currentProduct = product ? product : {};
        $scope.displayMode = "edit";
    }
    
    $scope.saveEdit = function (product) {
        if (angular.isDefined(product._id)) {
            $scope.updateProduct(product);
        } else {
            $scope.createProduct(product);
        }
    }
    
    $scope.cancelEdit = function () {        
        $scope.currentProduct = {};
        $scope.displayMode = "list";
    }
    
    $scope.listProducts();
});
