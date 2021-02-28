// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const { create, Client } = require("venom-bot");
const msgHandler = require("./msgHndlr");
const options = require('./options')
const start = async (client = new Client()) => {
  console.log("[SERVER] Server Started!");
  // Force it to keep the current session
  client.onStateChange((state) => {
    console.log("[Client State]", state);
    if (state === "CONFLICT" || state === "UNLAUNCHED") client.forceRefocus();
  });
  // listening on message
  client.onMessage(async (message) => {
    msgHandler(client, message);
  });


  client.onIncomingCall(async (call) => {
      console.log(call)
    await client
      .sendText(
        call.peerJid,
        "Maaf, saya tidak bisa menerima panggilan. nelfon = block!"
      )
      .then(() => client.blockContact(call.peerJid));
  });
};

create(options(true, start))
  .then((client) => start(client))
  .catch((error) => console.log(error));
