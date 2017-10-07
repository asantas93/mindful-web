function indexController($scope) {
  if (location.protocol != 'https:') {
    location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
  }
  $scope.navItemClick = function(item) {
    $scope.$parent.active = item;
    if (!window.matchMedia('(min-width: 992px)').matches) {
      $('#navbarResponsive').collapse('hide');
    }
  };
}
