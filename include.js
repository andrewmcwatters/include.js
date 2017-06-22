(function() {
  'use strict';

  function include(el) {
    var request = new XMLHttpRequest();
    var src = el.dataset.include;
    request.open('GET', src, true);

    var event;
    var customEventInit = {
      bubbles: true,
      detail: {
        src: src
      }
    };
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
  }

  function init(node = document) {
    if (node.target) {
      node = node.target;
    }

    if (node.nodeType === Node.TEXT_NODE) {
      return;
    }

    if (node.dataset && node.dataset.include) {
      include(node);
    }

    var elements = node.querySelectorAll('[data-include]');
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      include(element);
    }
  }

  function ready(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  ready(init);

  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      Array.prototype.forEach.call(mutation.addedNodes, init);
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
