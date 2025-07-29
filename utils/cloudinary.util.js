import cloudinary from "../config/cloudinary.config.js";

const uploadToCloudinary = (fileBuffer, mimetype, folder = "blogify") => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "image", folder }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      })
      .end(fileBuffer);
  });
};

export default uploadToCloudinary;
