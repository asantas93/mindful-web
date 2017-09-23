function storeController($scope, $http) {
  $scope.inventory = [];
  $http({
    method: 'GET',
    url: 'http://localhost:9000/inventory',
  }).then(function successCallback(response) {
    const inventory = response.data
    $scope.inventory = inventory;
    console.log(response);
    var cart = {};
    inventory.forEach(function(item) {
      cart[item.id] = {};
      item.variations.forEach(function(variation) {
        cart[item.id][variation.id] = 0;
      });
    });
    $scope.cart = cart;
  }, function failureCallback(response) {
    console.log(response);
  });

  $scope.total = function() {
    var tot = 0.0;
    $scope.inventory.forEach(function(item) {
      item.variations.forEach(function(variation) {
        tot += variation.price * $scope.cart[item.id][variation.id];
      });
    });
    return (tot / 100);
  };
  $scope.pane = 'shop';
  $scope.cartAdd = function(item, variation) {
    $scope.cart[item][variation]++;
  };
  $scope.cartDec = function(item, variation) {
    $scope.cart[item][variation]--;
    if ($scope.cart[item][variation] < 0) {
      $scope.cart[item][variation] = 0;
    }
  };
  $scope.formatMoney = function(price) {
    return '$' + (price / 100.0).toFixed(2);
  };
  //const applicationId = 'dummy';
  //$scope.paymentForm = new SqPaymentForm({
  //  applicationId: applicationId,
  //  inputClass: 'sq-input',
  //  inputStyles: [
  //    {
  //      fontSize: '15px'
  //    }
  //  ],
  //  cardNumber: {
  //    elementId: 'sq-card-number',
  //    placeholder: '•••• •••• •••• ••••'
  //  },
  //  cvv: {
  //    elementId: 'sq-cvv',
  //    placeholder: 'CVV'
  //  },
  //  expirationDate: {
  //    elementId: 'sq-expiration-date',
  //    placeholder: 'MM/YY'
  //  },
  //  postalCode: {
  //    elementId: 'sq-postal-code'
  //  },
  //  callbacks: {

  //    // Called when the SqPaymentForm completes a request to generate a card
  //    // nonce, even if the request failed because of an error.
  //    cardNonceResponseReceived: function(errors, nonce, cardData) {
  //      if (errors) {
  //        console.log("Encountered errors:");

  //        // This logs all errors encountered during nonce generation to the
  //        // Javascript console.
  //        errors.forEach(function(error) {
  //          console.log('  ' + error.message);
  //        });

  //      // No errors occurred. Extract the card nonce.
  //      } else {

  //        // Delete this line and uncomment the lines below when you're ready
  //        // to start submitting nonces to your server.
  //        alert('Nonce received: ' + nonce);


  //        /*
  //          These lines assign the generated card nonce to a hidden input
  //          field, then submit that field to your server.
  //          Uncomment them when you're ready to test out submitting nonces.

  //          You'll also need to set the action attribute of the form element
  //          at the bottom of this sample, to correspond to the URL you want to
  //          submit the nonce to.
  //        */
  //        // document.getElementById('card-nonce').value = nonce;
  //        // document.getElementById('nonce-form').submit();

  //      }
  //    },

  //    unsupportedBrowserDetected: function() {
  //      // Fill in this callback to alert buyers when their browser is not supported.
  //    },

  //    // Fill in these cases to respond to various events that can occur while a
  //    // buyer is using the payment form.
  //    inputEventReceived: function(inputEvent) {
  //      switch (inputEvent.eventType) {
  //        case 'focusClassAdded':
  //          // Handle as desired
  //          break;
  //        case 'focusClassRemoved':
  //          // Handle as desired
  //          break;
  //        case 'errorClassAdded':
  //          // Handle as desired
  //          break;
  //        case 'errorClassRemoved':
  //          // Handle as desired
  //          break;
  //        case 'cardBrandChanged':
  //          // Handle as desired
  //          break;
  //        case 'postalCodeChanged':
  //          // Handle as desired
  //          break;
  //      }
  //    },

  //    paymentFormLoaded: function() {
  //      // Fill in this callback to perform actions after the payment form is
  //      // done loading (such as setting the postal code field programmatically).
  //      // paymentForm.setPostalCode('94103');
  //    }
  //  }
  //});
  //$scope.paymentForm.build();
}
