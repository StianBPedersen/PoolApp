angular.module('pool.routes', [])
	.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		//$urlRouterProvider.otherwise('index');

		$stateProvider
			.state('index', {
				url: '/index',
				templateUrl: '/partials/index.html',
				controller: 'IndexCtrl'
			})

			.state('players', {
				url: '/players',
				templateUrl: '/partials/players.html',
				controller: 'PlayersCtrl',
				resolve: {
					getPlayers: ['Player', function(Player) {
						return Player.query().$promise;
					}]
				}
			})

			.state('gametypes', {
				url: '/gametypes',
				templateUrl: '/partials/gametypes.html',
				controller: 'GametypesCtrl',
				resolve: {
					getPlayers: ['Gtype', function(GTypes) {
						return Gtype.query().$promise;
					}]
				}
			});

	}]);