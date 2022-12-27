//const express = require('express');
//const app = express();
const chalk = require("chalk");
const { token } = require('./JSON/config.json')
//app.get('/', (req, res) => {
  //res.send('Hello Express app!')
//})
//app.use('/ping', (req, res) => {
 // res.send(new Date());
//});

//app.listen(3000, () => {
  //console.log(chalk.red.bold('Express is ready.'))
//});
const { database } = require('./JSON/config.json')
const Levels = require("discord-xp");
Levels.setURL(database); // You only need to do this ONCE per process.

const { Client, Collection, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, Intents } = require("discord.js");

const client = new Client({
  intents: 3276799
});

process.on("unhandledRejection", error => {
  return console.log(error)
});

const { PREFIX } = require('./json/config.json');
const { glob } = require("glob"); 
const { promisify } = require("util"); 
const { joinVoiceChannel } = require('@discordjs/voice');

const db = require('quick.db');
const colors = require("colors");
const handler = require("./handler/index.js");

client.commands = new Collection();
client.slash    = new Collection();
client.config   = require('./JSON/config.json');
client.cwd      = require('process').cwd(); // require('path').resolve(``);

module.exports = client;

handler.loadEvents(client);
handler.loadCommands(client);
handler.loadSlashCommands(client);

const logs = require('discord-logs');
logs(client, {
    debug: true
});

const TempChannels = require("discord-temp-channels");
const tempChannels = new TempChannels(client);

// Register a new main channel
tempChannels.registerChannel("1048356985113956362", {
    childCategory: "1044374799448817765",
    childAutoDeleteIfEmpty: true,
    childMaxUsers: 3,
    childFormat: (member, count) => `${member.user.username}`
});

setTimeout(() => {
  if (!client || !client.user) {
    console.log("Client Not Login, Process Kill")
    process.kill(1);
  } else {
    console.log("Client Login")
  }
}, 3 * 1000 * 60);


client.login(token).catch((err) => {
  client.setMaxListeners(0)
  console.log(err.message)
});







