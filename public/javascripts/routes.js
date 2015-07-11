angular.module('pool.routes', [])
	.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('index');

		$stateProvider
			.state('index', {
				url: '/index',
				templateUrl: '/partials/index.html',
				controller: 'IndexCtrl',
				resolve: { 
					getPlayers: ['Player', function(Player) {
						return Player.query().$promise;
					}],
					getTypes: ['Gtype', function(Gtype) {
						return Gtype.query().$promise;
					}],
					getGames: ['Game', function(Game) {
						return Game.query().$promise;
					}]
				}
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

			.state('gametype', {
				url: '/gametype',
				templateUrl: '/partials/gametype.html',
				controller: 'GametypeCtrl',
				resolve: {
					getTypes: ['Gtype', function(Gtype) {
						return Gtype.query().$promise;
					}]
				}
			})

			.state('stats', {
				url: '/stats',
				templateUrl: '/partials/stats.html',
				controller: 'StatsCtrl',
				resolve: {
					getGames: ['Game', function(Game) {
						return Game.query().$promise;
					}]
				}
			})

			.state('ranking', {
				url: '/ranking',
				templateUrl: '/partials/ranking.html',
				controller: 'RankingCtrl',
				resolve: {
					getRanking: ['Ranking', function(Ranking) {
						return Ranking.query().$promise;
					}]
				}
			})

	}]);