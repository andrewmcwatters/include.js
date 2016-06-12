(function() {
  'use strict';

  function include() {
    var includes = document.querySelectorAll('[data-include]');
    for (var i = 0; i < includes.length; i++) {
      (function() {
        var el = includes[i];
        var request = new XMLHttpRequest();
        var src = el.dataset.include;
        request.open('GET', src, true);

        var event;
        var customEventInit = { detail: {
          src: src
        } };
        request.onload = function() {
          if (this.status >= 200 && this.status < 400) {
            el.innerHTML = this.response;
            event = new CustomEvent('includecontentloaded', customEventInit);
          } else {
            event = new CustomEvent('includecontenterror', customEventInit);
          }
          el.dispatchEvent(event);
        };

        request.onerror = function() {
          event = new CustomEvent('includecontenterror', customEventInit);
          el.dispatchEvent(event);
        };

        request.send();
        event = new CustomEvent('includecontentrequested', customEventInit);
        el.dispatchEvent(event);
      })();
    }
  }

  function ready(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  ready(include);

  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      console.log(mutation);
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
