angular.module('pool.controllers', [])
	.controller('MenuCtrl', ['$scope', function($scope) {

	}])

	.controller('IndexCtrl', ['$scope', function($scope) {

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

			console.log($scope.modalobj.name);
				
		
			/*
			Player.update({ userid: userid }, { name: name, nickname: nickname }).$promise.then(function(res) {
				if(+res.userid) {
					Player.query().$promise.then(function(players) {
						$scope.players = players;
						toastr.success('Spilleren er oppdatert!');
					});
				}
			});
*/
		};
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