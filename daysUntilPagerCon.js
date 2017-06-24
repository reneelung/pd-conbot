const duration = require('duration');
const helper = require('./lib/helpers');
const PAGER_CON_SF = new Date('July 13, 2017');
const PAGER_CON_TO = new Date('July 18, 2017');
const EMOJI = [" :pagey: ", " :tada: ", " :clap: ", " :party_parrot: ", " :dancing-penguin: "];
const PREFIX = ["Gosh! ", "Gee whiz! ", "Holy crap! ", "BAZINGA! ", "Egads! ", "Yowza! "];

module.exports = function() {
  var days = daysUntilPagerCon();
  var emoji = randomEmoji();
  var prefix = randomPrefix();
  var str = "";
  if (days.pagercon_sf > 0) {
    str += "It's " + days.pagercon_sf + " " + pluralize(days.pagercon_sf, "day") + " until PagerCon in San Francisco, and ";
  } else if (days.pagercon_sf == 0) {
    str += "PagerCon in San Francisco is TODAY and ";
  } else {
    str += "PagerCon in San Francisco is over and ";
  }
  if (days.pagercon_to > 0) {
    str += "it's " + days.pagercon_to + " " + pluralize(days.pagercon_to, "day") + " until PagerCon in Toronto!";
  } else if (days.pagercon_to == 0) {
    str += "PagerCon in Toronto is TODAY!";
  } else {
    str += "so is PagerCon in Toronto. See you next year!";
  }

  return emoji + prefix + str + emoji;
}

function daysUntilPagerCon() {
  var now = new Date();
  var untilSf = new duration(now, PAGER_CON_SF);
  var untilTo = new duration(now, PAGER_CON_TO);

  var daysUntilSf = prettifyDays(untilSf);
  var daysUntilToronto = prettifyDays(untilTo);
  console.log(daysUntilSf);
  console.log(daysUntilToronto);
  return {
    pagercon_sf: daysUntilSf,
    pagercon_to: daysUntilToronto
  }
}

function pluralize(number, string) {
  if (number > 1 || number == 0) {
    return string + "s";
  } else {
    return string;
  }
}

function prettifyDays(duration) {
  if (duration.days < 1 && duration.minutes > 0) {
    return 1;
  } else {
    return duration.days;
  }
}

function randomEmoji() {
  return helper.randomElement(EMOJI);
}

function randomPrefix() {
  return helper.randomElement(PREFIX);
}