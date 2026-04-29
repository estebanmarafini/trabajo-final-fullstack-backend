import multer from "multer"
/* 
Si enviamos archivos al backend no van a ser 'Content-Type': 'application/json' 
sino que suele enviar en "Content-Type": "multipart/form-data" 
Para eso usamos multer, es una libreria que permite a nuestro servidor manejar request que vengan con "Content-Type": "multipart/form-data". Tranforma el formulario (si hay archivos los guarda en el disco temporalmente y guarda la referencia del archivo) en un objeto de JS y lo guarda en el body de la request
Esto en VERCEL es un problema (y en serverless en general), ya que multer usa filesystem y el filesystem generalmente esta deshabilitado o MUY limitado en serverless
*/

const upload = multer({
    storage: multer.memoryStorage() //esto hace que use directamente la memoria y no guarde en disco el archivo
})

export default upload