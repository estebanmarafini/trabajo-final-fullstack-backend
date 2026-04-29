import cloudinary from "../config/cloudinary.config.js"

class FileService {
    async uploadImage(file){
        const response = await cloudinary.uploader.upload(
            file,
            {
                resource_type: 'image',
                folder: 'uploads',
                use_filename: true,
                unique_filename: true,
                overwrite: false,
                allowed_formats: [
                    "jpg", 
                    "png", 
                    "webp", 
                    "jpeg"
                ]
            }
        )

        return response
    }
}


const fileService = new FileService()
export default fileService