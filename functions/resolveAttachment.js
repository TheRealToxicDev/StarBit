const { Discord, Collection, MessageEmbed } = require ('discord.js');
const Database = require('better-sqlite3');
const db = new Database('star.db');
const config = require('../config');

function resolveAttachment(msg) {
    if (msg.attachments.length > 0 && msg.attachments[0].width) {
      return msg.attachments[0];
    } else if (msg.embeds.length > 0 && msg.embeds[0].type === 'image') {
      return msg.embeds[0].image || msg.embeds[0].thumbnail;
    } else {
      return null;
    }
  }

  module.exports = resolveAttachment;
