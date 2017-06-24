const daysUntilPagerCon = require('./daysUntilPagerCon');
const helpers = require('./lib/helpers');
const Botkit = require('botkit');
const greetings = ['Howdy!', 'Hello!', 'Sup?', 'Yo!'];
var controller = Botkit.slackbot({
  token: process.env.token
});

controller.spawn({
  token: process.env.token
}).startRTM(function(err) {
  if (err) {
    throw new Error(err);
  }
});

controller.hears(['hi', 'hello'],['direct_message','direct_mention','mention'],function(bot,message) {
  bot.reply(message, helpers.randomElement(greetings));
});

controller.hears(['how long', 'how many days'],['direct_message','direct_mention','mention'],function(bot,message) {
  bot.reply(message, daysUntilPagerCon());
});