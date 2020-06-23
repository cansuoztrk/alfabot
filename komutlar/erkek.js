const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.member.roles.has("704432531033817148"))  return message.channel.send(`Kayıt görevlisi rolune sahip değilsin!`)

  let member = message.mentions.members.first();
  let isim = args.slice(1).join(" ");
  let yaş = args.slice(3).join(" ");
  var tag = ("℣");
  if (!member) return message.channel.send("**Örnek:** !e <üye> <isim> <yaş>");
  if (!isim) return message.channel.send("**Örnek:** !e <üye> <isim> <yaş>");
  
  member.setNickname(`${tag} ${isim} ${yaş} `);
  member.removeRole('704432526566883328')
  member.addRole('704446544929357875')
const embed = new Discord.RichEmbed()

      .setColor("15ad31")
      .setTitle('Kayıt Başarılı!')
      .setThumbnail(message.author.avatarURL)
      .setAuthor(`${client.user.username}`, client.user.avatarURL)  
       .setDescription(`Kayıt Edilen Kullanıcı: **${member.user}** \n Kayıt Eden Yetkili: **${message.author.username}**`)
     .setFooter(`${client.user.username}`, client.user.avatarURL) 
      .setTimestamp()
message.channel.send(embed);
  client.channels.get("704449463422419156").send(`${member} aramıza hoşgeldin! <a:wel:724682326579085424><a:come:724682338822389832> `)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["erkek","e"],
  permLevel: 0
};
exports.help = {
  name: "erkek",
  description: "Kayıt Sistemi by Archilles",
  usage: "!erkek @kullanıcı <isim> <yaş>"
};
