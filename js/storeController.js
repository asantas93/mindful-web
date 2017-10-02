function storeController($scope, $http) {
  $scope.inventory = [];
  $http({
    method: 'GET',
    url: 'http://localhost:9000/inventory',
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
      tot += $scope.orderPrice(order) * order.quantity;
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
      couples: false,
      disp: { // Not to be consumed server-side
        item: item,
        variation: variation,
      },
    });
  };
  $scope.quantityMinus = function(i) {
    $scope.cart[i].quantity--;
    if ($scope.cart[i].quantity <= 0) {
      $scope.cart.splice(i, 1);
    }
  };
  $scope.quantityPlus = function(i) {
    console.log($scope.cart[i]);
    $scope.cart[i].quantity++;
  };
  $scope.orderPrice = function(order) {
    if (order.couples)
      return order.disp.variation.price * 2 + 1000;
    else
      return order.disp.variation.price;
  };
  $scope.formatMoney = function(price) {
    return '$' + (price / 100.0).toFixed(2);
  };
  $scope.couplesSuffix = function(order) {
    if (order.couples)
      return ' (couples)';
    else
      return '';
  };
  $scope.data = {};
  const applicationId = 'sandbox-sq0idp-F-DAUUp0H50hzA-mXBQJAg';
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
      placeholder: 'CVV'
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
          console.log("Encountered errors:");

          // This logs all errors encountered during nonce generation to the
          // Javascript console.
          errors.forEach(function(error) {
            console.log('  ' + error.message);
          });

        // No errors occurred. Extract the card nonce.
        } else {

          // Delete this line and uncomment the lines below when you're ready
          // to start submitting nonces to your server.
          alert('Nonce received: ' + nonce);


          /*
            These lines assign the generated card nonce to a hidden input
            field, then submit that field to your server.
            Uncomment them when you're ready to test out submitting nonces.

            You'll also need to set the action attribute of the form element
            at the bottom of this sample, to correspond to the URL you want to
            submit the nonce to.
          */
          // document.getElementById('card-nonce').value = nonce;
          // document.getElementById('nonce-form').submit();

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
