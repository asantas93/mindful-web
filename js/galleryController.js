function galleryController($scope) {
  $scope.range = function(n) {
    let r = [];
    for (let i = 0; i < n; i++) {
      r.push(i);
    }
    return r;
  };
}
