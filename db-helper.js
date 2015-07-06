
module.exports.getGames = function() {
	str = 'SELECT (SELECT count(0) FROM result WHERE gameid = a.gameid) AS gamesplayed, a.gameid, (select name from player where userid = a.player1) AS player1, (select userid from player where userid = a.player1) AS player1_id, (select name from player where userid = a.player2) AS player2, (select userid from player where userid = a.player2) AS player2_id, a.distance, b.name AS gametype, a.created_at '+
				'FROM game AS a '+
				'INNER JOIN gametype AS b ON a.gametype = b.id '+
				'LEFT OUTER JOIN player AS c ON a.player1 = c.userid '+
				'LEFT OUTER JOIN result as d ON a.gameid = d.gameid '+
				'AND a.player2 = c.userid '+
				'ORDER BY a.gameid DESC';
				
	return str;
	
}