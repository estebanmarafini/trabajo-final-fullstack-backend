import MessageModel from "../models/messages.model.js"

import ServerError from "../helpers/error.helper.js"

class MessageRepository {
    async create(channel_id, member_id, content) {
        try {
            const message = await MessageModel.create({
                fk_id_channel: channel_id,
                fk_id_member: member_id,
                content
            })

            return message
        } catch (error) {
            throw new ServerError("Error al crear el mensaje en la base de datos", 500)
        }
    }

    async getMessagesByChannelId(channel_id) {
        try {
            const messages = await MessageModel.find({ fk_id_channel: channel_id })
                .populate({
                    path: 'fk_id_member',
                    populate: {
                        path: 'fk_id_user',
                        select: 'name'
                    }
                })
                .sort({ created_at: 1 })
            return messages
        } catch (error) {
            throw new ServerError("Error al obtener los mensajes del canal", 500)
        }
    }
}

const messageRepository = new MessageRepository()

export default messageRepository
