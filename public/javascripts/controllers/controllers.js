angular.module('pool.controllers', [])
	.controller('MenuCtrl', ['$scope', function($scope) {

	}])

	.controller('IndexCtrl', ['$scope', function($scope) {

	}])

	.controller('PlayersCtrl', ['$scope', 'Player', 'getPlayers', function($scope, Player, getPlayers) {
		$scope.players = getPlayers;

		$scope.addPlayer = function() {
			var name = "Terje";
			var nickname = "nick";

			Player.save({}, { name: name, nickname: nickname }).$promise.then(function(player) {
				$scope.players.push(player);
				toastr.success('Spilleren er lagt til!');
			});
		};

		$scope.removePlayer = function(userid) {
			Player.delete({ userid: userid }).$promise.then(function(res) {
				if(+res.userid) {	
					Player.query().$promise.then(function(players) {
						$scope.players = players;
						toastr.success('Spilleren er slettet!');
					});
				}
			});
		};

		$scope.updatePlayer = function(userid) {
			var name = "Oppdatert";
			var nickname = "navn";

			Player.update({ userid: userid }, { name: name, nickname: nickname }).$promise.then(function(res) {
				if(+res.userid) {
					Player.query().$promise.then(function(players) {
						$scope.players = players;
						toastr.success('Spilleren er oppdatert!');
					});
				}
			});
		};
	}])

	.controller('GametypeCtrl', ['$scope', 'Gtype', 'getTypes', function($scope, Gtype, getTypes) {
		$scope.types = getTypes;
	}])

	.controller('StatsCtrl', ['$scope', function($scope) {
		
	}]);