function indexController($scope) {
  $scope.navItemClick = function(item) {
    $scope.$parent.active = item;
    if (!window.matchMedia('(min-width: 992px)').matches) {
      $('#navbarResponsive').collapse('hide');
    }
  };
}
