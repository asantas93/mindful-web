function storeController($scope, $http) {
  $scope.inventory = [];
  const api = location.hostname == 'localhost' ?
    'https://localhost:9443' :
    'https://api.mindfulmassage.biz:9443'
  $http({
    method: 'GET',
    url: api + '/inventory',
  }).then(function successCallback(response) {
    const inventory = response.data
    $scope.inventory = inventory;
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
  const applicationId = 'sq0idp-F-DAUUp0H50hzA-mXBQJAg';
  $scope.paymentForm = new SqPaymentForm({
    applicationId: applicationId,
    inputClass: 'sq-input',
    inputStyles: [
      {
        fontSize: '15px'
      }
    ],
    cardNumber: {
      elementId: 'sq-card-number',
      placeholder: '•••• •••• •••• ••••'
    },
    cvv: {
      elementId: 'sq-cvv',
      placeholder: 'Enter your CVV code'
    },
    expirationDate: {
      elementId: 'sq-expiration-date',
      placeholder: 'MM/YY'
    },
    postalCode: {
      elementId: 'sq-postal-code',
      placeholder: 'Enter your billing postal code'
    },
    callbacks: {

      // Called when the SqPaymentForm completes a request to generate a card
      // nonce, even if the request failed because of an error.
      cardNonceResponseReceived: function(errors, nonce, cardData) {
        if (errors) {

          errors.forEach(function(error) {
            alert('Encountered error: ' + error.message);
          });

        // No errors occurred. Extract the card nonce.
        } else {

          waitingDialog.show('Processing your order');
          $http({
            method: 'POST',
            url: api + '/order',
            data: {
              'nonce': nonce,
              'orders': $scope.cart,
              'email': $scope.fromEmail,
            },
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            },
          }).then(function successCallback(response) {
            waitingDialog.hide();
            alert('Your order has been processed. Expect an email with your receipt within a few minutes.');
            window.location.href = 'https://mindfulmassage.biz';
          }, function failureCallback(response) {
            console.log(response);
            alert('There was an error processing your order. Please contact our office so we can fix the problem.\nError:\n' + JSON.stringify(response.data));
            waitingDialog.hide();
          });


          /*
            These lines assign the generated card nonce to a hidden input
            field, then submit that field to your server.
            Uncomment them when you're ready to test out submitting nonces.

            You'll also need to set the action attribute of the form element
            at the bottom of this sample, to correspond to the URL you want to
            submit the nonce to.
          */

        }
      },

      unsupportedBrowserDetected: function() {
        // Fill in this callback to alert buyers when their browser is not supported.
      },

      // Fill in these cases to respond to various events that can occur while a
      // buyer is using the payment form.
      inputEventReceived: function(inputEvent) {
        switch (inputEvent.eventType) {
          case 'focusClassAdded':
            // Handle as desired
            break;
          case 'focusClassRemoved':
            // Handle as desired
            break;
          case 'errorClassAdded':
            // Handle as desired
            break;
          case 'errorClassRemoved':
            // Handle as desired
            break;
          case 'cardBrandChanged':
            // Handle as desired
            break;
          case 'postalCodeChanged':
            // Handle as desired
            break;
        }
      },

      paymentFormLoaded: function() {
        // Fill in this callback to perform actions after the payment form is
        // done loading (such as setting the postal code field programmatically).
        // paymentForm.setPostalCode('94103');
      }
    }
  });
  $scope.requestCardNonce = function(event) {
    event.preventDefault();
    $scope.paymentForm.requestCardNonce();
  };
  angular.element(document).ready(function () {
    $scope.paymentForm.build();
  });
}
