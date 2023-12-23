import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

//upload image to cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) throw new Error("Please provide a file path");

        //upload file to cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        //testing purpose only
        // console.log("response", response);

        //file has been uploaded to cloudinary
        //for testing purpose we are logging the url of the uploaded file
        // console.log(
        //     "File uploaded to cloudinary, deleting local file...",
        //     response.url,
        // );

        if (localFilePath) {
            //remove the locally saved temporary file
            fs.unlinkSync(localFilePath);
        }

        return response;
    } catch (error) {
            // remove the locally saved temporary file as the upload operation got failed
            fs.unlinkSync(localFilePath);
    }
};

export { uploadOnCloudinary };
