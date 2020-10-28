import cloudinary from "cloudinary";
import Env from '@ioc:Adonis/Core/Env'

cloudinary.v2.config({
    cloud_name: Env.get('CLOUDINARY_CLOUD_NAME'),
    api_key: Env.get('CLOUDINARY_API_KEY'),
    api_secret: Env.get('CLOUDINARY_API_SECRET'),
})

export default {
    upload: async (image: string, folderName: string) => {
        const res = await cloudinary.v2.uploader.upload(image,   
            {
                folder: folderName,
                eager: [
                    { width: 400, height: 300, crop: "pad" }, 
                    { width: 260, height: 200, crop: "crop", gravity: "north"} 
                ]
            }, 
            function(error, result) {
                if(error){
                    console.log(error)
                }
                return result
            }
        );

        return res
    },

    destroy: async (public_id: string) => {

        const res = cloudinary.v2.uploader.destroy(public_id,
            function(error,result) {
                console.log(result, error)
                return result;
            }
        );

        return res;
    }
};
