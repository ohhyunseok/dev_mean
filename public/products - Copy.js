

//angular.module("exampleApp", ["increment", "ngResource"])
angular.module("exampleApp", [])
.constant("baseUrl", "http://localhost:1337/products/")
//.controller("defaultCtrl", function ($scope, $http, $resource, baseUrl) {
.controller("defaultCtrl", function ($scope, $http, baseUrl) {
    
    $scope.displayMode = "list";
    $scope.currentProduct = null;
    
    //$scope.productsResource = $resource(baseUrl + ":_id", { _id: "@_id" });
    
    $scope.listProducts = function () {
        //$scope.products = $scope.productsResource.query();
        $http.get(baseUrl).success(function (data) {
            $scope.products = data;
        });
    }
    
    $scope.deleteProduct = function (product) {
        //product.$delete().then(function () {
            //$scope.products.splice($scope.products.indexOf(product), 1);
        //});
        $http({
            method : "DELETE",
            url: baseUrl + product._id
        }).success(function () {
            //$scope.products.splice($scope.products.indexOf(product), 1);
            $scope.listProducts();
        });
        $scope.displayMode = "list";
    }
    
    $scope.createProduct = function (product) {
        //new $scope.productsResource(product).$save().then(function (newProduct) {        
        
        $http.post(baseUrl, product).success(function (newProduct) {
            //$scope.products.push(newProduct);
            $scope.listProducts();
            $scope.displayMode = "list";
        });
    }
    
    
    $scope.updateProduct = function (product) {
        //product.$save();
        $http({
            url: baseUrl + product._id,
            method: "PUT",
            data: product
        }).success(function (modifiedProduct) {
            //for (var i = 0; i < $scope.products.length; i++) {
            //    if ($scope.products[i]._id == modifiedProduct._id) {
            //        $scope.products[i] = modifiedProduct;
            //        break;
            //    }
            //}
            
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
        //if ($scope.currentProduct && $scope.createProduct.$get) {
        //    $scope.currentProduct.$get();
        //}
        $scope.currentProduct = {};
        $scope.displayMode = "list";
    }
    
    $scope.listProducts();
});
