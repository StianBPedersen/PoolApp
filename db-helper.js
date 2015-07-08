
module.exports.getGames = function() {
	str = 'SELECT '+
				'(SELECT count(0) FROM result WHERE gameid = a.gameid AND winner = a.player1) AS player1_wins, '+
				'(SELECT count(0) FROM result WHERE gameid = a.gameid AND winner = a.player2) AS player2_wins, '+
				'(SELECT count(0) FROM result WHERE gameid = a.gameid) AS gamesplayed, '+
				'(SELECT name from player where userid = a.player1) AS player1, '+
				'(SELECT userid from player where userid = a.player1) AS player1_id, '+
				'(SELECT name from player where userid = a.player2) AS player2, '+
				'(SELECT userid from player where userid = a.player2) AS player2_id, '+
				'a.gameid, a.distance, b.name AS gametype, a.created_at '+
				'FROM game AS a '+
				'INNER JOIN gametype AS b ON a.gametype = b.id '+
				'LEFT OUTER JOIN player AS c ON a.player1 = c.userid '+
				'LEFT OUTER JOIN result as d ON a.gameid = d.gameid '+
				'AND a.player2 = c.userid '+
				'ORDER BY a.gameid DESC';
				
	return str;
}