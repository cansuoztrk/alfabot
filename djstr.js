
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const setup = require('./setup.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const ms = require('ms');
const jsonfile = require('jsonfile')
const db = require("quick.db");
const request = require('request');
require('./util/eventLoader')(client);

// 7/24 Aktiflik

// 7/24 Akitflik Bitiş

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', async msg => {
  let ozelkomut = await db.fetch(`sunucuKomut_${msg.guild.id}`);
  let ozelkomutYazi;
  if (ozelkomut == null) ozelkomutYazi = 'Burayı silme yoksa hatalı olur'
  else ozelkomutYazi = ''+ ozelkomut +''
  if (msg.content.toLowerCase() === `${ozelkomutYazi}`) {
      let mesaj = await db.fetch(`sunucuMesaj_${msg.guild.id}`);
  let mesajYazi;
  if (mesaj == null) mesajYazi = 'Burayı silme yoksa hatalı olur'
  else mesajYazi = ''+ mesaj +''
    msg.channel.send(mesajYazi)
  }
});



client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});


client.on("guildMemberAdd", member => {
  const kanal = "704426128403595425";
  moment.locale("tr");
  let buse = client.channels.get(kanal);
 buse.send( "<a:wel:717689513656188989><a:come:717689525283061830> " + member + " Hoş Geldin! \n\n<a:morelmas:704601230822998076> Seninle Beraber **" + member.guild.memberCount + "** Kişiyiz! \n\n<a:loading:704574359569956875> Birazdan Yetkililer Gelip Kaydınızı Alacak <@&704432531033817148> \n\n<a:onay:717689573756633089> Hesabın Oluşturulma Tarihi: **" + moment(member.user.createdAt).format("DD MMMM YYYY, dddd (hh:mm)**")  , new Discord.Attachment("https://cdn.discordapp.com/attachments/716593073588535297/717698144753942558/gif_welcome2.gif"
    )
  );
});
 



client.login(ayarlar.token);

client.on("userUpdate", async (oldUser, newUser) => {

if (oldUser.username !== newUser.username) {
   
 let tag = "℣";            
    
let sunucu = "704413650559041607";    
    
let kanal = "704449463422419156";       
    
let rol = "704432525417775224";             

if (newUser.username.includes(tag) && !client.guilds.get(sunucu).members.get(newUser.id).roles.has(rol)) {
      client.channels.get(kanal).send(`${newUser} tagı aldığı için **@Family of Alfa** rolunu **kazandı!**`)
      client.guilds.get(sunucu).members.get(newUser.id).addRole(rol)
    } if (!newUser.username.includes(tag) && client.guilds.get(sunucu).members.get(newUser.id).roles.has(rol)) {
      client.guilds.get(sunucu).members.get(newUser.id).removeRole(rol)
      client.channels.get(kanal).send(`${newUser} tagı çıkardığı için özel rolunu **kaybetti**`)
}
}
});

client.on('message', message =>{
  let taglar = ['tag', '!tag']
  if(message.author.bot) return
  if(taglar.some(r=>message.content.toLowerCase() ===r )){
    message.channel.send('℣')
   
  }
  
   })
