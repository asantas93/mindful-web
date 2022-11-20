const api = 'https://64rzzi7rv1.execute-api.us-east-1.amazonaws.com/Prod'
function storeController($scope, $http) {
  $scope.inventory = [];
  $http({
    method: 'GET',
    url: api + '/inventory',
  }).then(function successCallback(response) {
    const inventory = response.data
    $scope.inventory = inventory;
    var sp = inventory.find(el => el['name'] == 'Cyber Monday Special');
    if (sp) {
      inventory.splice(inventory.indexOf(sp), 1);
      inventory.unshift(sp);
    }
  }, function failureCallback(response) {
    console.log(response);
  });
  $scope.cart = [];
  $scope.total = function() {
    var tot = 0.0;
    $scope.cart.forEach(function(order) {
      tot += ($scope.orderPrice(order) + (order.tip || 0) * 100) * order.quantity;
    });
    return tot;
  };
  $scope.pane = 'shop';
  $scope.buying = false;
  $scope.cartAdd = function(item, variation) {
    $scope.cart.push({
      itemId: item.id,
      variationId: variation.id,
      quantity: 1,
      from: null,
      toName: null,
      toEmail: null,
      giftMessage: null,
      disp: { // Not to be consumed server-side
        item: item,
        variation: variation,
        modifiers: item.modifiers,
      },
      modifiers: [],
    });
  };
  $scope.toggleModifier = function(order, id) {
    var index = order.modifiers.indexOf(id)
    if (index != -1)
      order.modifiers.splice(index, 1);
    else
      order.modifiers.push(id);
  };
  $scope.quantityMinus = function(i) {
    $scope.cart[i].quantity--;
    if ($scope.cart[i].quantity <= 0) {
      $scope.cart.splice(i, 1);
    }
  };
  $scope.quantityPlus = function(i) {
    $scope.cart[i].quantity++;
  };
  $scope.orderPrice = function(order) {
    var unitPrice = order.disp.variation.price;
    order.disp.modifiers.forEach(function(modlist) {
      modlist.modifiers.forEach(function(mod) {
        if (order.modifiers.indexOf(mod.id) != -1)
          unitPrice += mod.price;
      });
    });
    return unitPrice;
  };
  $scope.formatMoney = function(price) {
    return '$' + (price / 100.0).toFixed(2);
  };
  $scope.tipText = function(order) {
    if (order.tip > 0) {
      return ' + ' + $scope.formatMoney((order.tip || 0) * 100) + ' tip';
    } else {
      return '';
    }
  };
  $scope.data = {};
  configureSquare($scope, $http);
}

async function configureSquare($scope, $http) {
  const applicationId = 'sq0idp-F-DAUUp0H50hzA-mXBQJAg';
  const locationId = '203NH7K9772GC';
  // sandbox
  // const applicationId = 'sandbox-sq0idb-bbv8rot8eKdvZ-nXqXJ0_g';
  // const locationId = '8WA269WJS7AHH';
  const payments = Square.payments(applicationId, locationId);  
  const card = await payments.card();
  card.attach("#card-container");
  $scope.cardInvalid = true;
  function handlePaymentChange(e) {
    $scope.cardInvalid = !(e.detail.currentState.isCompletelyValid === true);
    $scope.$digest();
  }
  card.addEventListener('errorClassAdded', handlePaymentChange);
  card.addEventListener('errorClassRemoved', handlePaymentChange);
  card.addEventListener('focusClassRemoved', handlePaymentChange);
  card.addEventListener('focusClassAdded', handlePaymentChange);
  card.addEventListener('cardBrandChanged', handlePaymentChange);
  let tokenResult;

  const button = document.getElementById('confirmPurchase');
  button.addEventListener('click', async (e) => {
    e.preventDefault();
    $scope.buying = true;
    try {
      tokenResult = await card.tokenize();
    } catch (e) {
      console.log(e);
      alert('There was an issue with the card info provided.');
      $scope.buying = false;
      $scope.$digest();
      return;
    }
    if (tokenResult.status === 'OK') {
      waitingDialog.show('Processing your order - this may take several seconds...');
      $http({
        method: 'POST',
        url: api + '/order',
        data: {
          'nonce': tokenResult.token,
          'orders': $scope.cart,
          'email': $scope.fromEmail,
        },
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        timeout: 100000,
      }).then(function successCallback(response) {
        waitingDialog.hide();
        alert('Your order has been processed. Expect an email with your receipt within a few minutes.');
        window.location.href = 'https://mindfulmassage.biz';
      }, function failureCallback(response) {
        console.log(response);
        waitingDialog.hide();
        if (~~(response.status / 100) > 3) {
          alert('There was an error processing your order.\nError:\n' + JSON.stringify(response.data) + '\nIf you do not know how to resolve this issue or believe there is a problem with our website, please email an image of this error to staff@mindfulmassage.biz and call our office for assistance.\nAdditional details:\n' + JSON.stringify(response));
        } else {
          alert('Your order has been received but has not yet been fulfilled. Please contact our office if you do not receive an email confirmation within 10 minutes.')
        }
        window.location.href = 'https://mindfulmassage.biz';
      });
    } else {
      console.log('Token result unsuccessful');
    }
  });
}
