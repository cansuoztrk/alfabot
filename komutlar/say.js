const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    let number = {
      "1": "718234843938422864",
      "2": "718234864087990384",
      "3": "718234888813412503",
      "4": "718234924649414717",
      "5": "718234947307044950",
      "6": "718234978420260864",
      "7": "718235009395195994",
      "8": "718235031557898272",
      "9": "718235051426578583",
      "0": "718234802104434698"
    };
    let tag = "℣"
    const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;

message.channel.send(`**Alfa**: ${message.guild.memberCount.toString().split("").map(a => client.emojis.get(number[a])).join("")}  **Çevrimiçi**: ${message.guild.members.filter(m => !m.user.bot && m.user.presence.status !== "offline").size.toString().split("").map(a => client.emojis.get(number[a])).join("")}

         **Tagdakiler**: ${message.guild.members.filter(m => m.user.username.includes(tag)).size.toString().split("").map(a => client.emojis.get(number[a])).join("")}`)

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'say',
    description: '',
    usage: 'say'
};
