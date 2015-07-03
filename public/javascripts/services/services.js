angular.module('pool.services', [])
	.factory('Player', ['$resource', function ($resource) {
		return $resource('/players/:userid', { userid:'@userid'}, {
			update: { method: 'PUT' }
		});
	}]);
