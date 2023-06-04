import { GraphQLUpload } from 'graphql-upload';
import { v2 as cloudinary } from 'cloudinary'

const UploadResolver = {
    Upload: GraphQLUpload,
    Mutation: {
        uploadPhoto: async (_parent, { photo }, req) => {
            if (!context.isAuth) {
                throw new Error('Unauthenticated!');
            }
            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
            });

            try {
                const result = await cloudinary.uploader.upload(photo, {
                    //here i chose to allow only jpg and png upload
                    // allowed_formats: ["jpg", "png"],
                    //generates a new id for each uploaded image
                    public_id: "public-id-freelance-connect",
                    /*creates a folder called "your_folder_name" where images will be stored.
                    */
                    folder: "service-images",
                });
                /*returns uploaded photo url if successful `result.url`.
                if we were going to store image name in database,this
                */
                return `Successful-Photo URL: ${result.url}`;

            } catch (e) {
                //returns an error message on image upload failure.
                return `Image could not be uploaded:${e.message}`;
            }
        },
        singleUpload: async (parent, { file }) => {
            if (!context.isAuth) {
                throw new Error('Unauthenticated!');
            }
            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
            });

            const { createReadStream, filename, mimetype, encoding } = await file;

            const stream = createReadStream();

            // Upload file to Cloudinary
            const uploadResponse = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: 'freelance-connect' }, // Optional folder parameter
                    (error, result) => {
                        if (result) {
                            resolve(result);
                            // add to database

                        } else {
                            reject(error);
                        }
                    }
                );

                stream.pipe(uploadStream);
            });

            return {
                filename,
                mimetype,
                encoding,
                cloudinaryUrl: uploadResponse.secure_url // Optional: Return the Cloudinary URL
            };
        },
        multipleUpload: async (parent, { files }, context) => {
            if (!context.isAuth) {
                throw new Error('Unauthenticated!');
            }
            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
            });

            const uploadedFiles = await Promise.all(
                files.map(async file => {
                    const { createReadStream, filename, mimetype, encoding } = await file;
                    const stream = createReadStream();

                    // Upload file to Cloudinary
                    const uploadResponse = await new Promise((resolve, reject) => {

                        const uploadStream = cloudinary.uploader.upload_stream(
                            { folder: 'freelance-connect' }, // Optional folder parameter
                            (error, result) => {
                                if (result) {
                                    resolve(result);
                                    // add to database

                                } else {
                                    reject(error);
                                }
                            }
                        );
                        stream.pipe(uploadStream);
                    });

                    return {
                        filename,
                        mimetype,
                        encoding,
                        cloudinaryUrl: uploadResponse.secure_url // Optional: Return the Cloudinary URL
                    };
                })
            );

            return uploadedFiles;
        }
    }
}

export default UploadResolver;