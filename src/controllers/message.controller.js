import messageService from "../services/message.service.js"

class MessageController {
    async create(req, res, next) {
        try {
            const { channel_id } = req.params
            const { content } = req.body
            const member_id = req.member._id

            const message = await messageService.create(channel_id, member_id, content)

            res.status(201).json({
                ok: true,
                status: 201,
                message: 'Mensaje enviado exitosamente',
                data: {
                    message
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const { channel_id } = req.params
            const messages = await messageService.getMessagesByChannelId(channel_id)

            res.status(200).json({
                ok: true,
                status: 200,
                message: 'Mensajes obtenidos exitosamente',
                data: {
                    messages
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

const messageController = new MessageController()

export default messageController
