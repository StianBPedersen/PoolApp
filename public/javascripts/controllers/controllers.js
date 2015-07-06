angular.module('pool.controllers', [])
	.controller('MenuCtrl', ['$scope', function($scope) {

	}])

	.controller('IndexCtrl', ['$scope', 'Game', 'Result', 'getPlayers', 'getTypes', 'getGames', function($scope, Game, Result, getPlayers, getTypes, getGames) {
		$scope.players = getPlayers;
		$scope.types = getTypes;
		$scope.games = getGames;
		var players;

		$scope.$on('modalNew', function(e, obj) {
			Game.save({}, obj).$promise.then(function(res) {
				if(+res.gameid > 0) {
					Game.query().$promise.then(function(res) {
						$scope.games = res;
					});
				}
			});
		});

		$scope.populatePlayers = function(obj) {
			players = [
				{ userid: obj.player1_id, name: obj.player1  }, 
				{ userid: obj.player2_id, name: obj.player2  }
			];

			$scope.modalobj = {
				winner: null,
				players: players,
				gameid: obj.gameid
			};
		};

		$scope.$on('modalUpdateScore', function(e, obj) {
			Result.save({}, obj).$promise.then(function(res) {
				if(+res.id > 0) {
					toastr.success('Lagret!')
					players = null;

					Game.query().$promise.then(function(res) {
						$scope.games = res;
					});
				}
			})
		});

	}])

	.controller('PlayersCtrl', ['$scope', 'Player', 'getPlayers', function($scope, Player, getPlayers) {
		$scope.players = getPlayers;

		$scope.$on('modalNew', function(e, obj) {
			Player.save({}, obj).$promise.then(function(res) {
				if(+res.userid > 0) {
					$scope.players.push(res);
					toastr.success('Spilleren er lagt til!');	
				}
			});
		});
		
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

		$scope.updatePlayer = function(player) {
			$scope.modalobj = player;
		};

		$scope.$on('modalUpdate', function(e, obj) {
			Player.update({ userid: obj.userid }, obj).$promise.then(function(res) {
				Player.query().$promise.then(function(res) {
					$scope.players = res;
					toastr.success('Spilleren er oppdatert!');
				});
			});
		});
		
	}])

	.controller('GametypeCtrl', ['$scope', 'Gtype', 'getTypes', function($scope, Gtype, getTypes) {
		$scope.types = getTypes;

		$scope.$on('modalNew', function(e, obj) {
			Gtype.save({}, obj).$promise.then(function(res) {
				if(+res.id > 0) {
					Gtype.query().$promise.then(function(res) {
						$scope.types = res;
						toastr.success('Ny spilltype er lagt til!');
					});
				}
			});
		});

		$scope.deleteGametype = function(id) {
			Gtype.delete({ id: id }).$promise.then(function(res) {
				if(+res.id > 0) {
					Gtype.query().$promise.then(function(res) {
						$scope.types = res;
						toastr.success('Spilltypen er slettet.')
					});
				}
			});
		};

	}])

	.controller('StatsCtrl', ['$scope', function($scope) {
		
	}]);