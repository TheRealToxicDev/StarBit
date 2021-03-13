const { Client, Collection } = require ('discord.js');
const config = require ('./config');

const client = new Client({
    disableMentions: 'everyone',
    disabledEvents: ['TYPING_START']
});

client.commands = new Collection();
client.aliases = new Collection();

client.limits = new Map();

client.config = config;

const commands = require ('../modules/commands');
commands.run(client);

const events = require ('../modules/events');
events.run(client);

client.login(config.token);
