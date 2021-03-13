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

    if (channel.nsfw || !starboard || channel.id === starboard_channel.id) return;

    const msg = await client.channels.cache.get(channel.id).messages.fetch(message.id)

    const stars = (await msg.reactions.cache.get('⭐', msg.reactions['⭐'].count)).filter(u => u.id !== msg.author.id && !client.users.cache.get(u.id).bot).length;

    if (stars < 3) return;

    if (msg.content.lenght === 0 && msg.attachments.length === 0 && (!msg.embeds[0] || msg.embeds[0].type !== 'image')) return;

    const starID = await getMessageFromDB(msg.id);

    if (!starID) {

        if (!stars) return;

        const starMessage = await starboard_channel.send(`**__Starboard:__ ${stars} ⭐ - <#${msg.channel.id}> ${msg.author.username}#${msg.author.discriminator} has made it!**`)

        let star_msg_embed = new MessageEmbed()
         .setAuthor(`${msg.author.username}#${msg.author.discriminator}s - Starboard`, msg.author.displayAvatarURL())
         .addField('Starred Content', `${message.content || '**__Image: No Text.__**'}`)
         .addField('View Message', `[Click Me Boii!!](https://discordapp.com/channels/493152507414052867/${msg.channel.id}/${msg.id})`)
         .setFooter(`You are a Star!! | ${msg.id}`, client.user.displayAvatarURL())

        await starboard_channel.send(star_msg_embed);

        db.prepare('INSERT INTO starids VALUES (?, ?)').run(msg.id, starMsg.id);
    } else {

        const starMessage = await starboard_channel.messages.fetch(starID);

        if (!starMessage) return;

        await starMessage.edit(`**__Starboard:__** ${stars} ⭐ - <#${msg.channel.id}> ${msg.author.username}#${msg.author.discriminator} has made it!`);
    }
} catch (e) {

    let error = new MessageEmbed()
    .setAuthor("Internal Error", client.user.displayAvatarURL())
    .setDescription('You should probably report this to my Dev Team!')
    .addField('Error Message', `${e.message}`)
    }
};