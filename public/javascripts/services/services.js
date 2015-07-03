angular.module('pool.services', [])
	.factory('Player', ['$resource', function ($resource) {
		return $resource('/players/:userid', { userid:'@userid'}, {
			update: { method: 'PUT' }
		});
	}])

	.factory('Gtype', ['$resource', function($resource) {
		return $resource('/gametypes/:id', { id:'@id' }, {
			update: { method: 'PUT' }
		});
	}]);
