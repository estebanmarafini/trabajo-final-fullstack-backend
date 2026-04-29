import express from 'express'
import messageController from '../controllers/message.controller.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import verifyWorkspaceMiddleware from '../middlewares/verifyWorkspace.middleware.js'
import verifyMemberWorkspaceRoleMiddleware from '../middlewares/verifyMemberWorkspaceMiddleware.js'
import verifyChannelMiddleware from '../middlewares/verifyChannel.middleware.js'

const messageRouter = express.Router({ mergeParams: true })

// Todos los mensajes requieren estar autenticado
messageRouter.use(authMiddleware)

// Verificar que el workspace existe y el canal existe y pertenece al workspace
messageRouter.use(verifyWorkspaceMiddleware)
messageRouter.use(verifyChannelMiddleware)

// Verificar que el usuario es miembro del workspace
// (Esto guarda req.member que usamos en el controller)
messageRouter.use(verifyMemberWorkspaceRoleMiddleware())

messageRouter.post('/', messageController.create)
messageRouter.get('/', messageController.getAll)

export default messageRouter
