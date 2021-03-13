
const { readdirSync } = require("fs");
const { MessageEmbed } = require("discord.js");
const { join } = require("path");
const filePath2 = join(__dirname, "..", "events");
const eventFiles2 = readdirSync(filePath2);
const timers = require("timers");
const fetch = require('node-fetch');

const Constants = require('discord.js/src/util/Constants.js')

Constants.DefaultOptions.ws.properties.$browser = `Discord iOS`


module.exports = async (client) => {

const ready_channel = client.channels.cache.find(c => c.id === process.env.VERSION_LOGS);

  let activities = [
    {
      name: `Help: star!help`,
      options: {
        type: "WATCHING",
        browser: "DISCORD IOS",
      },
    },
    {
      name: "the Starboard",
      options: {
        type: "COMPETING",
        browser: "DISCORD_IOS",
      },
    },
    {
      name: "with Reactions",
      options: {
        type: "PLAYING",
        browser: "DISCORD IOS",
      },
    },
    {
      name: "Over my code",
      options: {
        type: "WATCHING",
        browser: "DISCORD IOS",
      },
    }
  ];
  let i = 0;

  console.log(`Signed in as ${client.user.username} || Loaded [${eventFiles2.length}] event(s) & [${client.commands.size}] command(s)`);
  
  timers.setInterval(() => {
    i = i == activities.length ? 0 : i;
    client.user.setActivity(activities[i].name, activities[i].options);

    i++;
  }, 30000);
};