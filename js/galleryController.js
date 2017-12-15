function galleryController($scope) {
  $scope.range = function(n) {
    r = [];
    for (var i = 0; i < n; i++) {
      r.push(i);
    }
    return r;
  };
}
