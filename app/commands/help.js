const { readdir } = require('fs')

exports.run = (client, message, args, from, pushname) => {
    let tmpFile = {}
    readdir(process.cwd() + '/app/commands', (err, files) => {
        if (err) throw err
        files.forEach((jsFile) => {
            const cmdFile = require(`./${jsFile}`);
            tmpFile[jsFile.replace(".js", "")] = {};
            tmpFile[jsFile.replace(".js", "")].name = cmdFile.help.name;
            tmpFile[jsFile.replace(".js", "")].description = cmdFile.help.description;
            tmpFile[jsFile.replace(".js", "")].usage = cmdFile.help.usage;
        })
        if (!args[0]) {
            client.reply(from, `Hai ${pushname}\n*Available commands:* ${Object.keys(tmpFile).join(", ")}\n\n_You can run *help <command name>* to show advanced help._`, message.id)
        } else {
            const commandName = args[0];
            const { name, description, usage } = require(`./${commandName}.js`).help;
            client.reply(from, `*${name}*\n\nDescription: ${description}\nUsage: \`\`\`${usage}\`\`\``, message.id)
        };
    })
}

exports.help = {
    name: "Help",
    description: "Show the bot's commands list",
    usage: "help",
    cooldown: 5,
};