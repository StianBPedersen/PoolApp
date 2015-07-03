var pg = require('pg');
var bodyParser = require('body-parser');

var conn = "postgres://pool_usr:pool_usr@localhost/pool"
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
		var query = client.query('SELECT userid, name, nickname FROM player');

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
		var query = client.query('SELECT id, name FROM gametype');

		query.on('error', function(err) { return res.json(err) });

		query.on('row', function(row) {
			gametypes.push(row);
		});

		query.on('end', function(result) {
			return res.json(gametypes);
			client.end();
		})

	});
}

/********************************************************************* END GAMETYPES ****************************************************************/





