// CREATE TABLE teams ( teamname VARCHAR(255), teamcount int );

// INSERT INTO teams (teamname, teamcount)
// VALUES ( 'FatherOf5', 10 ), ( 'MotherOfFather', 3 );

var pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native

var conString = "postgres://cteqpbzs:1MAOFF85TL4mmD724pDHxnD_1CSpKQ1d@bubble.db.elephantsql.com/cteqpbzs" //Can be found in the Details page
var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT * FROM teams', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows);
    client.end();
  });
});