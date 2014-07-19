/*! Testing Grunt - v0.1.0 - 2014-07-19
* https://github.com/helena-bond/node.js
* Copyright (c) 2014 Elena Bondarenko; Licensed MIT */
(function($) {

  // Collection method.
  $.fn.testing_grunt = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.testing_grunt = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.testing_grunt.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.testing_grunt.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].testing_grunt = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
