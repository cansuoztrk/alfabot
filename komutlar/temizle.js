const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send('Bu komut ancak **Mesajları Yönet** adlı yetkisi olan kişiler tarafından kullanılabilir.')
    }
    else {
        message.channel.fetchMessages().then(messages => {
            message.delete();
                  if (messages.size == 1) return message.channel.send('Herhangi bir mesaj bulunamadı.').then(msg => msg.delete(5000))
            message.channel.bulkDelete(messages);
            let messagesDeleted = messages.size-1;
            return message.channel.send(`<a:onay:717689573756633089>Toplam **${messagesDeleted}** adet mesaj kaldırıldı.`).then(msg => msg.delete(5000))
        }).catch(err => {
            console.log('<a:red:717689611781931019> Mesaj kaldırılırken bir hata oluştu.')
        })
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['temizle'],
  permLevel: 0
};

exports.help = {
  name: 'temizle',
  description: 'by Archilles',
  usage: 'sil'
}
