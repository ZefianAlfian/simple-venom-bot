var moment = require('moment-timezone')
const istimer = (ts) => require('moment-timezone').duration(moment() - moment(ts * 1000)).asSeconds()

exports.run = (client, message, args, from) => {
    client.reply(from, `🏓 PONG! • speed: ${istimer(message.timestamp)}ms`, message.id.toString())
};

exports.help = {
    name: "Ping",
    description: "PING PONG",
    usage: "ping",
    cooldown: 5
};