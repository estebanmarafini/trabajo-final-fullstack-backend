import { request, Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.middleware.js";
import fileService from "../services/file.service.js";


const fileRouter = Router()

fileRouter.post(
    '/upload', 
    upload.single('file'),
    authMiddleware, 
    
    async (request, response, next) => {
    try{
        
        console.log(response)
        const response = await fileService.uploadImage(request.file)
        response.status(201).json({
            ok: true,
            status: 201,
            message: 'Archivo subido exitosamente'
        })
    }
    catch(error){
        next(error)
    }
})

export default fileRouter