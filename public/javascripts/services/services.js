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
	}])

	.factory('Game', ['$resource', function($resource) {
		return $resource('/games/:id', { id:'@id' }, {
			update: { method: 'PUT' }
		});
	}])

	.factory('Result', ['$resource', function($resource) {
		return $resource('/results/:gameid', { gameid:'@gameid' }, {
			update: { method: 'PUT' }
		})
	}])

	.factory('Ranking', ['$resource', function($resource) {
		return $resource('/ranking', {}, {});
	}]);

