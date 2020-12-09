const Discord = require('discord.js')
const client = new Discord.Client()
const { MessageEmbed } = require('discord.js')
const config = require("./config.json");
const sleep = require('sleep.js');
const func = require('./functions');
var result = func.Christmas();
const watermark = 'Made by Mystik - discord.gg/GtgWHPuY5v'
const embedA = config.EmbedAuthor;
const embedP = config.EmbedPfp;
const embedC = config.EmbedColour;
const prefix = config.prefix;

const activities_list = [
    "with the ?help command.",
    "DM me to contact mods",
    `${result} days until Christmas!`,
    "DM me to contact mods",
    "with the developer console"
];

client.on("ready", () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index]) // sets bot's activities to one of the phrases in the arraylist.
    }, 100000);
    client.user.setActivity('DM me to contact mods')
    console.log(`${client.user.username}#${client.user.discriminator} has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
});

client.on("message", async (message) => {
    const logging = client.channels.cache.get(config.LogChannel);
    const guild = client.guilds.cache.get(config.serverID);
    const findchannel = guild.channels.cache.find(channel => channel.type === "text" && channel.name === "ticket-" + message.author.username.toLowerCase());
    var server = client.guilds.cache.get(config.serverID);
    if (message.author.bot) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (command === 'ping') {
        var ping = new MessageEmbed()
            .setTitle('🏓 Pong!')
            .setDescription(`**Latency**\n${Date.now() - message.createdTimestamp}ms\n\n**API**\n${Math.round(client.ws.ping)}ms`)
        message.channel.send(ping);
    }
    if (command === 'msg') {
        var msg = new MessageEmbed()
            .setColor(`${embedC}`)
            .setAuthor(`${embedA}`, `${embedP}`)
            .setTitle(`DM me if you need support!`)
        message.channel.send(msg)
    }
    if (command === 'dm') {
        console.log(args)
        message.delete()
        if (!args[1]) {
            message.delete();
            message.author.send(`You didn't mention a user to DM!`)
        }
        else if (message.mentions.users.first()) {
            message.channel.send("Message sent!")
            setTimeout(async function () {
                message.channel.bulkDelete(1)
            }, 5000);
            const user = message.mentions.users.first()
            var userId = (await (await client.users.fetch(user.id)).id)
            console.log(userId)
            console.log(args)
            var args1 = args.shift()
            var args2 = args.join(' ')

                ; (await client.users.fetch(userId)).send(args2)



        }
        else {
            message.author.send("Something went wrong, make sure you enter a message to send to the user.")
            setTimeout(async function () {
                message.delete()
            }, 5000);
        }
    }
    if (command === 'christmas') {
        if (message.channel.name.startsWith('ticket-')) {
            message.author.send(`There are ${result} days till Christmas!`)
        }
        else {
            message.channel.send(`There are ${result} days till Christmas!`)
        }
        message.delete()
    }
    if (command === 'gd') {
        if (!args[0]) return message.author.send("Please enter a message!")
        let textogd = args.join('%20');
        let imagenGD = new Discord.MessageAttachment(`https://gdcolon.com/tools/gdlogo/img/${textogd}`, 'logo.png')
        if (message.channel.name.startsWith('ticket-')) {
            message.author.send(imagenGD)
        }
        else {
            message.channel.send(imagenGD)
        }
        message.delete()
    }
    if (command === 'help') {
        message.delete()
        const helpEmbed = new MessageEmbed()
            .setTitle(`__**${config["bot-name"]} - Help**__`)
            .setDescription('**Commands:**\n`?help` - This command that you are currently viewing.\n`?gd (text)` - Write text in geometry dash font.\n`?christmas` - Tells you how many days are until Christmas!\n`?banner (text)` - Write text on a p3nguin background.')
            .setFooter(`${watermark}`)
            .setColor(`${embedC}`)
            .setAuthor(`${embedA}`, `${embedP}`)

        message.author.send(helpEmbed);
    }
    if (message.channel.type !== ('dm')) {
        if (command == "close" && message.channel.name.startsWith('ticket-')) {
            var ret = message.channel.topic
            var pq = client.users.cache.get(ret)
            const embed = new MessageEmbed()
                .addField(`Ticket closed`, "Your request has been closed, no need to reply to this message")
                .setTimestamp()
                .setColor(`${embedC}`)
                .setAuthor(`${embedA}`, `${embedP}`)
            pq.send(embed)
            var Logging = new MessageEmbed()
            .setTitle(`Ticket Closed`)
            .setDescription(`${pq}'s ticket has been closed by ${message.author}`)
            .setTimestamp()
            .setFooter(`${pq.username}#${pq.discriminator}`, `${pq.displayAvatarURL()}`)
            .setColor(`${embedC}`)
            .setAuthor(`${embedA}`, `${embedP}`)
            logging.send(Logging)
            message.channel.delete()



        } else {
            if (message.content.startsWith(config.prefix)) { return }
            else if (message.channel.name.startsWith('ticket-')) {
                func.ModeratorTicket(message, client, config)
            }
        }
    }

    if (message.channel.type === "dm") {
        if (command === 'close' && findchannel) {
            const embed = new MessageEmbed()
                .addField(`Ticket Closed`, `${message.author.username}#${message.author.discriminator} closed their ticket. This ticket will be deleted in 8 seconds.`)
                .setTimestamp()
                .setColor(`${embedC}`)
                .setAuthor(`${embedA}`, `${embedP}`)

            findchannel.send(embed)
            message.channel.send("You have closed your ticket.")
            var Logging = new MessageEmbed()
            .setTitle(`Ticket Closed`)
            .setDescription(`${message.author}'s Ticket has been closed`)
            .setTimestamp()
            .setFooter(`${message.author.username}#${message.author.discriminator}`, `${message.author.displayAvatarURL()}`)
            .setColor(`${embedC}`)
            .setAuthor(`${embedA}`, `${embedP}`)
            logging.send(Logging)
            setTimeout(async function () {
                findchannel.delete()
            }, 8000);

        }

    }
    if (findchannel && command != 'close' && message.channel.type === ('dm')) {
        if (message.content.startsWith(config.prefix)) {
            return
        }
        else {
            func.SendMessageTicket(message, client, config)
            return
        }

    }
    else if (command != 'close' && message.channel.type === ('dm')) {
        if (message.content.startsWith(config.prefix)) {
            return
        }
        else {
            guild.channels.create(`ticket-${message.author.username}`, { reason: 'New to Ticket' }).then(c => {
                c.updateOverwrite(guild.roles.everyone, { VIEW_CHANNEL: false })
                var Updaterole = config.ModeratorRoles.join(', ')
                var Updaterole1 = Updaterole.toString()
                c.setParent(config.Category)
                console.log(Updaterole1)
                config.ModeratorRoles.map((role) => {
                    c.updateOverwrite(role, { VIEW_CHANNEL: true, SEND_MESSAGES: true, MANAGE_MESSAGES: true })
                })
                c.setTopic(message.author.id)
                var Attachment = (message.attachments).array();
                if (Attachment[0] !== undefined) {
                    var pp = ""
                    var pp1 = Attachment[0].url;
                    const Imgembed = new MessageEmbed()
                        .setTitle(`New message from ${message.author.username}#${message.author.discriminator}`)
                        .setTimestamp()
                        .setFooter('Type ?close to close the ticket')
                        .setImage(pp1)
                        .setColor(`${embedC}`)
                        .setAuthor(`${embedA}`, `${embedP}`)
                    c.send(Imgembed);
                    var Logging = new MessageEmbed()
                        .setTitle(`New Ticket Created`)
                        .setDescription(`${message.author} has created a new ticket in ${c}`)
                        .setTimestamp()
                        .setFooter(`${message.author.username}#${message.author.discriminator}`, `${message.author.displayAvatarURL()}`)
                        .setColor(`${embedC}`)
                        .setAuthor(`${embedA}`, `${embedP}`)
                    logging.send(Logging);
                } else {
                    var pp = "";
                    const embed = new MessageEmbed()
                        .addField(`New message from ${message.author.username}#${message.author.discriminator}`, message.content + " " + pp)
                        .setFooter('Type ?close to close the ticket')
                        .setTimestamp()
                        .setColor('#a60100')
                        .setAuthor(`${embedA}`, `${embedP}`)
                    c.send(embed)
                    var Logging = new MessageEmbed()
                        .setTitle(`New Ticket Created`)
                        .setDescription(`${message.author} has created a new ticket in ${c}`)
                        .setTimestamp()
                        .setFooter(`${message.author.username}#${message.author.discriminator}`, `${message.author.displayAvatarURL()}`)
                        .setColor(`${embedC}`)
                        .setAuthor(`${embedA}`, `${embedP}`)
                    logging.send(Logging);
                }
            });
        }
        const NewTicket = new MessageEmbed()
            .setColor(`${embedC}`)
            .setAuthor(`${embedA}`, `${embedP}`)
            .setTitle("**New Ticket Created!** :white_check_mark:")
            .setDescription('Your message has been sent to staff. To close your ticket, type `?close`')
        message.channel.send(NewTicket);
    }

});

client.on('guildMemberRemove', async (member) => {
    const logging = client.channels.cache.get(config.LogChannel);
    const guild = client.guilds.cache.get(config.serverID);
    const findchannel = guild.channels.cache.find(channel => channel.type === "text" && channel.name === "ticket-" + member.user.username.toLowerCase());

    if (findchannel) {
        findchannel.send(`${member.user.username} left the server.`)
        setTimeout(async function () {
            findchannel.delete()
        }, 8000);

        var Logging = new MessageEmbed()
        .setTitle(`Ticket Closed`)
        .setDescription(`${member.user.username}#${member.user.discriminator} left the server so their ticket was closed.`)
        .setTimestamp()
        .setFooter(`${member.user.username}#${member.user.discriminator}`, `${member.user.displayAvatarURL()}`)
        .setColor(`${embedC}`)
        .setAuthor(`${embedA}`, `${embedP}`)
        logging.send(Logging);

    }   

});

client.login(config.token);