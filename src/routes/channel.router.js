import express from 'express'
import channelController from '../controllers/channel.controller.js'
import verifyWorkspaceMiddleware from '../middlewares/verifyWorkspace.middleware.js'
import verifyMemberWorkspaceRoleMiddleware from '../middlewares/verifyMemberWorkspaceMiddleware.js'
import verifyChannelMiddleware from '../middlewares/verifyChannel.middleware.js'
import AVIABLE_MEMBER_ROLES from '../constants/roles.constant.js'
import authMiddleware from '../middlewares/authMiddleware.js'
const channelRouter = express.Router({ mergeParams: true })

channelRouter.use(authMiddleware)
channelRouter.use(verifyWorkspaceMiddleware)


channelRouter.post(
    '/', 
    verifyMemberWorkspaceRoleMiddleware(
        [AVIABLE_MEMBER_ROLES.OWNER, AVIABLE_MEMBER_ROLES.ADMIN]
    ),
    channelController.create
)

channelRouter.get(
    '/', 
    verifyMemberWorkspaceRoleMiddleware(),
    channelController.getAll
)

channelRouter.delete(
    '/:channel_id', 
     verifyMemberWorkspaceRoleMiddleware(
        [AVIABLE_MEMBER_ROLES.OWNER, AVIABLE_MEMBER_ROLES.ADMIN]
    ),
    verifyChannelMiddleware, 
    channelController.softDelete
)


export default channelRouter