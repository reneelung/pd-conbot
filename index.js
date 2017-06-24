var express = require('express');
var duration = require('duration');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  var days = daysUntilPagerCon();
  var emoji = randomEmoji();
  var prefix = randomPrefix();
  var str = "It's ";
  if (days.pagercon_sf + days.pagercon_to < 20) {
    str += " only";
  }
  str += days.pagercon_sf + " days until PagerCon in San Francisco, and ";
  str += days.pagercon_to + " days until PagerCon in Toronto!"
  response.status(200).send(emoji + prefix + str + emoji);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

const PAGER_CON_SF = new Date('July 13, 2017');
const PAGER_CON_TO = new Date('July 18, 2017');
const EMOJI = [" :pagey: ", " :tada: ", " :clap: ", " :party_parrot: ", " :dancing-penguin: "];
const PREFIX = ["Gosh! ", "Gee whiz! ", "Holy crap! ", "BAZINGA! ", "Egads! ", "Yowza! "];

function daysUntilPagerCon() {
  var now = new Date();
  var untilSf = new duration(now, PAGER_CON_SF);
  var untilTo = new duration(now, PAGER_CON_TO);

  return {
    pagercon_sf: untilSf.days,
    pagercon_to: untilTo.days
  }
}

function randomEmoji() {
  return EMOJI[Math.floor(Math.random() * EMOJI.length)];
}

function randomPrefix() {
  return PREFIX[Math.floor(Math.random() * PREFIX.length)];
}