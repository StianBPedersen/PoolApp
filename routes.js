var pg = require('pg');
var bodyParser = require('body-parser');
var dbHelper = require('./db-helper');

var conn = process.env.DATABASE_URL;
var Client = require('pg').Client;

module.exports = function(app) {
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	var client = new Client(conn);
	client.connect();

	/********************************************************************* PLAYERS ********************************************************************/

	app.post('/players', function(req, res) {
		var query = client.query('INSERT INTO player(name, nickname) VALUES($1,$2) RETURNING userid, name, nickname', [req.body.name, req.body.nickname]);
		var obj = {};

		query.on('error', function(err) { return res.json(err); });
		
		query.on('row', function(row, result) {
			obj = row;
		});

		query.on('end', function() {
			return res.json(obj);
			client.end();
		});
	});

	app.get('/players', function(req, res) {
		var players = [];
		db_str = 'SELECT * FROM player ORDER BY name ASC';

		var query = client.query(db_str);

		query.on('error', function(err) { return res.json(error); });

		query.on('row', function(row) {
			players.push(row);
		});

		query.on('end', function() {
			return res.json(players);
			client.end();
		});
		
	});

	app.put('/players/:userid', function(req, res) {
		var query = client.query('UPDATE player set name = $1, nickname = $2 WHERE userid = $3', [req.body.name, req.body.nickname, req.params.userid]);

		query.on('error', function(err) { return res.json(err); });

		query.on('end', function() {
			return res.json({ userid: req.params.userid });
			client.end();
		});
	});

	app.delete('/players/:userid', function(req, res) {
		var query = client.query('DELETE FROM player WHERE userid = $1', [req.params.userid]);
		
		query.on('error', function(err) { return res.json(err); });

		query.on('end', function(result) {
			return res.json({ userid: req.params.userid });
			client.end();
		});
	});


/********************************************************************* END USERS ********************************************************************/


/********************************************************************* GAMETYPES ********************************************************************/

	app.get('/gametypes', function(req, res) {
		var gametypes = [];
		var query = client.query('SELECT id, name FROM gametype ORDER BY id');

		query.on('error', function(err) { return res.json(err) });

		query.on('row', function(row) {
			gametypes.push(row);
		});

		query.on('end', function(result) {
			return res.json(gametypes);
			client.end();
		})
	});

	app.post('/gametypes', function(req, res) {
		var query = client.query('INSERT INTO gametype(name) VALUES($1) RETURNING id, name', [req.body.name]);
		var obj = {};

		query.on('error', function(err) { return res.json(err); });
		
		query.on('row', function(row, result) {
			obj = row;
		});

		query.on('end', function() {
			return res.json(obj);
			client.end();
		});
	});

	app.delete('/gametypes/:id', function(req, res) {
		var query = client.query('DELETE from gametype WHERE id = $1', [req.params.id]);

		query.on('error', function(err) { return res.json(err); });

		query.on('end', function(result) {
			return res.json({ id: req.params.id });
			client.end();
		});
	});


/********************************************************************* END GAMETYPES ****************************************************************/


/********************************************************************* GAMES ****************************************************************/

	app.post('/games', function(req, res) {
		var obj = {};
		var query = client.query('INSERT INTO game(player1, player2, gametype, distance, created_at) VALUES($1,$2,$3,$4,now()) RETURNING gameid', 
			[req.body.player1, req.body.player2, req.body.gametype, req.body.distance]);

		query.on('error', function(err) { return res.json(err); });

		query.on('row', function(row, result) {
			obj = row;
		});

		query.on('end', function(result) {
			return res.json(obj);
			client.end();
		});
	});

	app.put('/games/:gameid', function(req, res) {
		var query = client.query('UPDATE game set winner = $1, WHERE gameid = $2 RETURNING $2', [req.body.winner, req.params.gameid]);

		query.on('error', function(err) { return res.json(err); });

		query.on('end', function() {
			return res.json({ userid: req.params.userid });
			client.end();
		});
	})

	app.get('/games', function(req, res) {
		var games = [];
		var db_str = dbHelper.getGames();

		var query = client.query(db_str);

		query.on('error', function(err) { return res.json(err); });

		query.on('row', function(row, result) {
			games.push(row);
		});

		query.on('end', function(result) {
			return res.json(games);
			client.end();
		})
	});

/********************************************************************* END GAMES ****************************************************************/

/********************************************************************* RANKING ********************************************************************/

	app.get('/ranking', function(req, res) {
		var arr = [];
		var query = client.query('SELECT name, nickname, (SELECT count(0) from game where player1 = userid OR player2 = userid) as games from player');

		query.on('error', function(err) { return res.json(err) });

		query.on('row', function(row, result) {
			arr.push(row);
		});

		query.on('end', function(result) {
			return res.json(arr);
			client.end();
		});
	});

/********************************************************************* END RANKING ****************************************************************/

app.post('/results/:gameid', function(req, res) {
	var obj = {};
	var query = client.query('INSERT INTO result(gameid, winner) VALUES($1,$2) RETURNING id', [req.params.gameid, req.body.winner]);

	query.on('error', function(err) { return res.json(err) });

	query.on('row', function(row, result) {
		obj = row;
	});

	query.on('end', function(result) {
		return res.json(obj);
		client.end();
	});
});


}

