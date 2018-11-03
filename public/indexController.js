(function() {
  'use strict';
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('service-worker.js')
    .catch(function(error) {
      console.log("Registration failed:", error);
    });
  }
})();
