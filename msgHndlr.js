const fs = require("fs");

const availableCommands = new Set();
(async function () {
  fs.readdir("./app/commands", (e, files) => {
    if (e) return console.error(e);
    files.forEach((commandFile) => {
      availableCommands.add(commandFile.replace(".js", ""));
    });
  });
})();

module.exports = msgHandler = async (client, message) => {
  try {
    const {
      type,
      id,
      from,
      t,
      sender,
      isGroupMsg,
      chat,
      caption,
      isMedia,
      mimetype,
      quotedMsg,
      quotedMsgObj,
      mentionedJidList,
    } = message;
    let { body } = message;
    const prefix = "/";
    const commands = caption || body || "";
    body =
      type === "chat" && body.startsWith(prefix)
        ? body
        : (type === "image" || type === "video") &&
          caption &&
          caption.startsWith(prefix)
        ? caption
        : "";
    const command = body.slice(1).trim().split(/ +/).shift().toLowerCase();
    const isCmd = body.startsWith(prefix);
    const argss = commands.split(" ");
    const args = body.trim().split(/ +/).slice(1)
    let { pushname, verifiedName, formattedName } = sender;
    pushname = pushname || verifiedName || formattedName;
    exports.pushname = pushname

    if (availableCommands.has(command)) {
        const talkedRecently = new Set();
        if (talkedRecently.has(sender.id)) return client.reply(from, "Tunggu 10 detik untuk menggunakan command lagi !!", message.id)
      require(`./app/commands/${command}`).run(client, message, args, from, pushname);
      console.log(availableCommands);
      console.log(`${pushname} atau ${sender.id.split('@c.us')} Menggunakan Command ${command}`);
      talkedRecently.add(sender.id)
      setTimeout(function(){
          talkedRecently.delete(sender.id)
      }, 10000)
      console.log(talkedRecently)
    }
    // if (!command) return;
    // switch (command) {
    //   case "help":
    //     chat.contact.isBusiness == true
    //       ? client.sendText(from, chat.contact.verifiedName)
    //       : client.sendText(from, chat.contact.pushname);
    // }
  } catch (e) {
    console.log(e);
  }
};
