(function(document, XMLHttpRequest) {
  function get(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        callback(this.response, this.status, request);
      }
    };

    request.send();
  }

  function include() {
    var includes = document.querySelectorAll('[data-include]');
    for (var i = 0; i < includes.length; i++) {
      get(includes[i].dataset.include, function(data) {
        includes[i].appendChild(data);
      });
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
})(document, XMLHttpRequest);
