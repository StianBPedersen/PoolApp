angular.module('pool.filters', [])
	.filter('range', function() {
	  return function(input, min, max) {
	    min = +min;
	    max = +max;
	    for ( var i = min; i < max; i++) {
	    	input.push(i);
	    }
	      
	    return input;
	  };
	});