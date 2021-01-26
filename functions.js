const { MessageEmbed } = require('discord.js');
var days = 0;
const config = require("./config.js");
const embedA = config.EmbedAuthor;
const embedP = config.EmbedPfp;
const embedC = config.EmbedColour;
const prefix = config.prefix;

function Christmas() {
    //Get today's date.
    var now = new Date();
    //Get the current month. Add a +1 because
    //getMonth starts at 0 for January.
    var currentMonth = (now.getMonth() + 1);

    //Get the current day of the month.
    var currentDay = now.getDate();

    //Work out the year that the next Christmas
    //day will occur on.
    var nextChristmasYear = now.getFullYear();
    if (currentMonth == 12 && currentDay > 25) {
        //This year's Christmas Day has already passed.
        nextChristmasYear = nextChristmasYear + 1;
    }

    var nextChristmasDate = nextChristmasYear + '-12-25T00:00:00.000Z';
    var christmasDay = new Date(nextChristmasDate);

    //Get the difference in seconds between the two days.
    var diffSeconds = Math.floor((christmasDay.getTime() - now.getTime()) / 1000);

    var days = 0;
    var hours = 0;
    var minutes = 0;
    var seconds = 0;

    //Don't calculate the time left if it is Christmas day.
    if (currentMonth != 12 || (currentMonth == 12 && currentDay != 25)) {
        //Convert these seconds into days, hours, minutes, seconds.
        days = Math.floor(diffSeconds / (3600 * 23));
        diffSeconds -= days * 3600 * 24;
        hours = Math.floor(diffSeconds / 3600);
        diffSeconds -= hours * 3600;
        minutes = Math.floor(diffSeconds / 60);
        diffSeconds -= minutes * 60;
        seconds = diffSeconds;
    }
    return (days)

}

function SendMessageTicket(message, client, config) {
    var server = client.guilds.cache.get(config.serverID);
    var c = server.channels.cache.find(channel => channel.type === "text" && channel.name === "ticket-" + message.author.username.toLowerCase())
    var Attachment = (message.attachments).array();
    if (Attachment[0] !== undefined) {
        console.log("User ticket")
        var pp = ""
        var pp1 = Attachment[0].url;

        const Imgembed = new MessageEmbed()
            .setTitle(`New message from ${message.author.username}`)
            .setTimestamp()
            .setFooter('Type ?close to close the ticket')
            .setImage(pp1)
            .setColor(`${embedC}`)
            .setAuthor(`${embedA}`, `${embedP}`)
        c.send({
            embed: Imgembed
        });
        message.react('✅');
    } else {
        console.log("user ticket 2")
        var pp = "";
        const embed = new MessageEmbed()
            .addField(`New message from ${message.author.username}`, message.content + " " + pp)
            .setFooter('Type ?close to close the ticket')
            .setTimestamp()
            .setColor(`${embedC}`)
            .setAuthor(`${embedA}`, `${embedP}`)
        c.send(embed);
        message.react('✅');
    }
}

function ModeratorTicket(message, client, config) {
    var ret = message.channel.topic
    var pq = client.users.cache.get(ret)
    var Attachment = (message.attachments).array();
    if (Attachment[0] !== undefined) {
        var pp = ""
        var pp1 = Attachment[0].url;

        const Imgembed = new MessageEmbed()
            .setTitle(`New message from ${message.author.username}`)
            .setTimestamp()
            .setImage(pp1)
            .setColor(`${embedC}`)
            .setAuthor(`${embedA}`, `${embedP}`)
        pq.send(Imgembed);
        message.react('✅');

    } else {
        var pp = "";
        const embed = new MessageEmbed()
            .addField(`New message from ${message.author.username}`, message.content + " " + pp)
            .setTimestamp()
            .setColor(`${embedC}`)
            .setAuthor(`${embedA}`, `${embedP}`)
        pq.send(embed)
        message.react('✅')

    }
}

module.exports = { Christmas, SendMessageTicket, ModeratorTicket }
