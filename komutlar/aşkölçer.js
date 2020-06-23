const Discord = require('discord.js');
const Canvas = require('canvas');
const snekfetch = require('snekfetch');


exports.run = async (client, message, args) =>
{
  var user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]); 
  if (!user) return message.channel.send("**Örnek:** !aşk <üye>");

  const canvas = Canvas.createCanvas(310, 160);
  const ctx = canvas.getContext('2d');

  const {body: downloadedImageBuffer} = await snekfetch.get("https://cdn.glitch.com/eaf5e667-49aa-46e2-a69e-6b392fbb476b%2Fa%C5%9FkolcerBosArkaplan.png?1531641809728");
  const background = await Canvas.loadImage( downloadedImageBuffer );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#74037b';
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  /* ctx.beginPath();
  ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip(); */

  const { body: buffer } = await snekfetch.get(message.author.displayAvatarURL);
  const avatar = await Canvas.loadImage(buffer);
  ctx.drawImage(avatar, 28, 28, 60, 60);

  const { body: mentionedBuffer } = await snekfetch.get(user.user.displayAvatarURL);
  const mentionedAvatar = await Canvas.loadImage(mentionedBuffer);
  ctx.drawImage(mentionedAvatar, 224, 28, 60, 60);

  let aşkyüzdesi = Math.floor(Math.random() *100) + 1;//Math.round(Math.random());

  ctx.fillStyle = "red";
  ctx.fillRect(58, 115, aşkyüzdesi / 100 * 197, 26);

  ctx.fillStyle = "black"
  ctx.font = '20px serif';
  ctx.fillText(`${aşkyüzdesi}%`, 137, 137, 37);

  const attachment = new Discord.Attachment(canvas.toBuffer(), "askolcerArkaplan.png");

  message.channel.send(`<@${message.author.id}> İle <@${user.id}> Arasındaki Aşk Yüzdesi ${aşkyüzdesi}% !`, attachment);
}
 
exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ['aşk-ölçer', 'ask-olcer', 'askolcer', 'ask', 'aşk'],
        permLevel: 0,
  kategori: "eğlence"
}
 
exports.help = {
        name: 'aşkölçer',
        description: 'İki kullanıcı sarasındaki aşkı ölçer.',
        usage: 'aşkölçer [@Kullanıcı] [@Kullanıcı]'
}
