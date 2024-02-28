
import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
@Injectable()

export class CloudinaryService {
    async uploadImage(file: Express.Multer.File,): Promise<UploadApiResponse | UploadApiErrorResponse> {

        return new Promise((resolve, reject) => {
            const options = {
                folder: 'profile_pictures',
                use_filename: true,
                unique_filename: false,
                transformation: [
                    { width: 200, height: 200, gravity: "face", crop: "thumb" },
                    { radius: "max" },
                    { fetch_format: "auto", quality: "auto"}
                ],
            }

            const upload = v2.uploader.upload_stream(options, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            });

            toStream(file.buffer).pipe(upload);
        });
    }

    async uploadPDF(file: Express.Multer.File,): Promise<UploadApiResponse | UploadApiErrorResponse> {
            
            return new Promise((resolve, reject) => {
                const options = {
                    folder: 'documents',
                    use_filename: true,
                    unique_filename: false,
                }
    
                const upload = v2.uploader.upload_stream(options, (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                });
    
                toStream(file.buffer).pipe(upload);
            });
    }
}