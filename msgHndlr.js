module.exports = msgHandler = async (client, message) => {
    try {
        const { type, id, from, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message;
        const prefix = '/'
        const commands = caption || body || ''
        body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const isCmd = body.startsWith(prefix)
        const args =  commands.split(' ')
        
        if (!command) return;
        switch(command) {
            case 'help':
                chat.contact.isBusiness == true ? client.sendText(from, chat.contact.verifiedName) : client.sendText(from, chat.contact.pushname)
        }
    } catch (e) {
        console.log(e);
    }
}