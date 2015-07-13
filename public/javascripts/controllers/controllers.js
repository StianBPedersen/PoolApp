angular.module('pool.controllers', ['ngTable'])
	.controller('MenuCtrl', ['$scope', function($scope) {

	}])

	.controller('IndexCtrl', ['$scope', 'ngTableParams', '$filter', '$location', 'Game', 'getPlayers', 'getTypes', 'getGames', 'Result', function($scope, ngTableParams, $filter, $location, Game, getPlayers, getTypes, getGames, Result) {
		$scope.players = getPlayers;
		$scope.types = getTypes;
		$scope.games = getGames;
		var players;

		$scope.tableParams = new ngTableParams({
			page: 1,
			count: 10,
			sorting: { created_at: 'desc' }
		},{
			total: 0, // length of data
			getData: function($defer, params) {
				$location.search(params.url());
				if (angular.isDefined($scope.games)) {
					var orderedData = $filter('orderBy')($scope.games, params.orderBy());
					params.total(orderedData.length);
					$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
				}
			}
		});

		$scope.$on('modalNew', function(e, obj) {
			Game.save({}, obj).$promise.then(function(res) {
				if(+res.gameid > 0) {
					Game.query().$promise.then(function(res) {
						$scope.games = res;
						$scope.tableParams.reload();
					});
				}
			});
		});

		$scope.populatePlayers = function(obj) {
			players = [
				{ userid: obj.player1_id, name: obj.player1, wins: obj.player1_wins  }, 
				{ userid: obj.player2_id, name: obj.player2, wins: obj.player2_wins   }
			];

			$scope.modalobj = {
				winner: null,
				players: players,
				gameid: obj.gameid,
				distance: obj.distance
			};
		};

		$scope.$on('modalUpdateScore', function(e, obj) {
			Result.save({}, obj).$promise.then(function(res) {
				if(+res.id > 0) {
					toastr.success('Lagret!')
					players = null;

					Game.query().$promise.then(function(res) {
						$scope.games = res;
						$scope.tableParams.reload();
					});
				}
			})
		});

	}])

	.controller('PlayersCtrl', ['$scope', 'ngTableParams', '$location', '$filter', 'Player', 'getPlayers', function($scope, ngTableParams, $location, $filter, Player, getPlayers) {
		$scope.players = getPlayers;

		$scope.tableParams = new ngTableParams({
			page: 1,
			count: 10,
			sorting: { name: 'asc' }
		},{
			total: 0, // length of data
			getData: function($defer, params) {
				$location.search(params.url());
				if (angular.isDefined($scope.players)) {
					var orderedData = $filter('orderBy')($scope.players, params.orderBy());
					params.total(orderedData.length);
					$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
				}
			}
		});

		$scope.$on('modalNew', function(e, obj) {
			Player.save({}, obj).$promise.then(function(res) {
				if(+res.userid > 0) {
					$scope.players.push(res);
					$scope.tableParams.reload();
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
					$scope.tableParams.reload();
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

	.controller('StatsCtrl', ['$scope', 'ngTableParams', '$filter', '$location', 'getGames', function($scope, ngTableParams, $filter, $location, getGames) {
		$scope.games = getGames;

		$scope.tableParams = new ngTableParams({
			page: 1,
			count: 10,
			sorting: { created_at: 'desc' }
		},{
			total: 0, // length of data
			getData: function($defer, params) {
				$location.search(params.url());
				if (angular.isDefined($scope.games)) {
					var orderedData = $filter('orderBy')($scope.games, params.orderBy());
					params.total(orderedData.length);
					$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
				}
			}
		});

	}])

	.controller('RankingCtrl', ['$scope', 'ngTableParams', '$filter', '$location', 'getRanking', function($scope, ngTableParams, $filter, $location, getRanking) {
		$scope.ranking = getRanking;

		$scope.tableParams = new ngTableParams({
			page: 1,
			count: 10,
			sorting: { created_at: 'desc' }
		},{
			total: 0, // length of data
			getData: function($defer, params) {
				$location.search(params.url());
				if (angular.isDefined($scope.ranking)) {
					var orderedData = $filter('orderBy')($scope.ranking, params.orderBy());
					params.total(orderedData.length);
					$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
				}
			}
		});
	}]);
		

	







