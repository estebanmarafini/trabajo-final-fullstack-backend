import messageRepository from "../repository/message.repository.js"
import ServerError from "../helpers/error.helper.js"

class MessageService {
    async create(channel_id, member_id, content) {
        if (!channel_id || !member_id || !content) {
            throw new ServerError("Faltan campos obligatorios para enviar el mensaje", 400)
        }
        return await messageRepository.create(channel_id, member_id, content)
    }

    async getMessagesByChannelId(channel_id) {
        if (!channel_id) {
            throw new ServerError("ID de canal es requerido", 400)
        }
        return await messageRepository.getMessagesByChannelId(channel_id)
    }
}

const messageService = new MessageService()

export default messageService
