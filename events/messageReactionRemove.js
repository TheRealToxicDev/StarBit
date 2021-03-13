const { Discord, Collection, MessageEmbed } = require ('discord.js');
const Database = require('better-sqlite3');
const db = new Database('../sql/starBit.db');
const config = require('../config');

const getMessageFromDB = require ('../functions/getMessageFromDB');
const resolveAttachment = require ('../functions/resolveAttachment');


module.exports = async (client, reaction, emoji, message) => {

try {

    if (message.channel.type !== 0 || emoji.name !== '⭐') return;

    const channel = await client.channels.cache.get(message.channel.id);

    const starboard_channel = message.guild.channels.cache.find(c => c.name === 'starboard');

    if (!starboard || channel.id === starboard_channel.id) return;

    const msg = await client.channels.cache.get(channel.id).messages.fetch(message.id)

    const starID = await getMessageFromDB(msg.id);

    if (!starID) return;

    const starMessage = await starboard_channel.messages.fetch(starID);

    if (!starMessage) return;

    if (!msg.reactions['⭐']) {

        db.prepare('DELETE FROM starids WHERE msgid = ?').run(msg.id);

        return await starMessage.delete();
    }

    const stars = (await msg.reactions.cache.get('⭐', msg.reactions['⭐'].count)).filter(u => u.id !== msg.author.id && !client.users.cache.get(u.id).bot).length;

    if (!stars) {

        db.prepare('DELETE FROM starids WHERE msgig = ?').run(msg.id);

        return await starMessage.delete();
    }

    await starMessage.edit(`**__Starboard:__ ${stars} ⭐ - <#${msg.channel.id}> ${msg.author.username}#${msg.author.discriminator} has made it!**`);

} catch (e) {

    let error = new MessageEmbed()
    .setAuthor("Internal Error", client.user.displayAvatarURL())
    .setDescription('You should probably report this to my Dev Team!')
    .addField('Error Message', `${e.message}`)
    }
};