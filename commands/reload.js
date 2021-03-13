module.exports.run = (client , message, args) => {
    if(!args[0]) return message.channel.send("❌ Please provide a command to reload!")

    let commandName = args[0].toLowerCase()
    
    try {
        delete require.cache[require.resolve(`./${commandName}.js`)] // 
        client.commands.delete(commandName)
        const pull = require(`./${commandName}.js`)
        client.commands.set(commandName, pull)
    } catch(e) {
        return message.channel.send(`❌ Error occured while reloading: \`${args[0].toUpperCase()}\``)
    }
    
    message.channel.send(`**⏳ Success \`${args[0].toUpperCase()}\` has been reloaded!**`)
}

module.exports.help = {
    name: "reload",
    category: "staff",
    aliases: ['refresh','cr'],
    description: "Reload a command changes without restart bot!",
    example: "``reload <command_name>``"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: true,
    dm_only: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}