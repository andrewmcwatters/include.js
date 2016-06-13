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

  function includeAll() {
    var includes = document.querySelectorAll('[data-include]');
    for (var i = 0; i < includes.length; i++) {
      include(includes[i]);
    }
  }

  function ready(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  ready(includeAll);

  function update(node) {
    if (node.dataset && node.dataset.include) {
      include(node);
      return;
    }

    var childNodes = node.childNodes;
    for (var i = 0; i < childNodes.length; i++) {
      update(childNodes[i]);
    }
  }

  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      Array.prototype.forEach.call(mutation.addedNodes, update);
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
