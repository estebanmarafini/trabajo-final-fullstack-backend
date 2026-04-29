import ENVIRONMENT from "./config/environment.config.js"
import connectMongoDB from "./config/mongoDB.config.js"
/* import User from "./models/user.model.js"
import Workspace from "./models/workspace.model.js" */
import WorkspaceMember from "./models/workspaceMember.model.js"
import workspaceMemberRepository from "./repository/member.repository.js"
import userRepository from "./repository/user.repository.js"
import workspaceRepository from "./repository/workspace.repository.js"
import express, { response } from 'express';
import healthRouter from "./routes/health.router.js"
import authRouter from "./routes/auth.router.js"
import mailerTransporter from "./config/mailer.config.js"
import cors from 'cors'
import authMiddleware from "./middlewares/authMiddleware.js"
import workspaceRouter from "./routes/workspace.router.js"
import channelRouter from "./routes/channel.router.js"
import messageRouter from "./routes/message.router.js"
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware.js"
import ServerError from "./helpers/error.helper.js"
import fileRouter from "./routes/file.router.js"
import multer from "multer"


connectMongoDB()


const app = express()

/* 
API es privada y los clientes son limitados y de confianza
WHITE LIST DE DOMINIOS PERMITIDOS
*/
/* const allowedDomains = [
    'http://localhost:5173', //Frontend local
    'https://2026-utn-pwa-tt-mar-lun-mier-fronte.vercel.app'//Frontend desplegado
]
app.use(cors(
    {
        // origin direccion de quien consulta 
        origin: (origin, callback) => {
            //Si no hay origin, es una peticion local y estoy en modo desarrollo
            if (!origin && ENVIRONMENT.MODE === 'dev') {
                callback(null, true)
            }
            //Si el origin esta en la white list, permito la peticion
            else if (allowedDomains.includes(origin)) {
                callback(null, true)
            } else {
                callback(new ServerError('No autorizado', 403))
            }
        }
    }
)) */

/* 
API es publica y los clientes son ilimitados
BLACK LIST DE DOMINIOS PROHEBIDOS
*/
/* const blockedOrgins = [
    'http://localhost:5173' //Front esta bloqueado
]
app.use(
    cors(
        {
            origin: (origin, callback) => {
                if (blockedOrgins.includes(origin)) {
                    callback(new ServerError('No autorizado', 403))
                } else {
                    callback(null, true)
                }
            }
        }
    )
)
 */
app.use(cors())

app.use(express.json())



/* 
Delegamos las consultas que vengan sobre '/api/health' al healthRouter
*/
app.use('/api/health', healthRouter)
app.use('/api/auth', authRouter)
app.use('/api/workspace', workspaceRouter)
app.use('/api/workspace/:workspace_id/channels', channelRouter)
app.use('/api/workspace/:workspace_id/channels/:channel_id/messages', messageRouter)

app.use(
    '/api/file',
    fileRouter
)

app.get(
    '/api/test',
    authMiddleware,
    (request, response, next) => {
        try {
            const { user } = request
            if (true) {
                throw new ServerError('Error interno X', 400)
            }
            response.send('ok, vos sos: ' + user.id)
        }
        catch (error) {
            next(error)
        }
    }
)

//Siempre debe ir al final de todos los endpoints, rutas o middlewares
//Para poder dar uso correcto, nuestros controladores ahora seran "middlewares"
app.use(
    errorHandlerMiddleware
)

app.listen(
    ENVIRONMENT.PORT,
    () => {
        console.log('La aplicacion se esta escuchando en el puerto ' + ENVIRONMENT.PORT)
    }
)

