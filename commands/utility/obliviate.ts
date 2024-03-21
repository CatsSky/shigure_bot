import { SlashCommandBuilder, ChatInputCommandInteraction, userMention } from "discord.js";

const { mages } = require('../../config.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('obliviate')
		.setDescription("test")
		.addIntegerOption(option =>
			option.setName("time")
				.setDescription("移除數分鐘內的所有訊息，預設為5分鐘")
				.setMinValue(0)
		),


	async execute(interaction: ChatInputCommandInteraction) {
		const userId = interaction.member?.user.id!
		const userAt = userMention(userId)
		if (!mages.includes(userId)) {
			interaction.reply(`${userAt}喊出：「空空，遺忘」，但是什麼事都沒發生，也許他是個麻瓜。`)
			return
		}

		let time = interaction.options.getInteger("time")
		time ??= 5
		
		let messages = await interaction.channel?.messages.fetch({ limit: 20 })

		messages = messages?.filter(m =>
			m.author.id == userId && (Date.now() - m.createdTimestamp) <= (time as number) * 60 * 1_000
		)

		let message_number = messages?.size
		
		messages?.reverse().forEach(m => console.log(m.content))
		messages?.forEach(m => m.delete())

		interaction.reply(`${userAt}喊出：「空空，遺忘」，抹除了所有人在${time}分鐘內對於他記憶。`)

	},
};
