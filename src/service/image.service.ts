import { UploadImageDTO } from "../dto/UploadImage.dto";
import { ServiceResponse } from '../helper/ServiceResponse';
const BucketName = process.env.BucketName;
const AWS = require('aws-sdk');

export const uploadImageService = async (data:UploadImageDTO) => {
    let key = `ocr-${new Date().getTime()}.jpg`;
    let decodedImage = Buffer.from(data.image, 'base64');
    let putResult = await putObjectToS3(key,decodedImage);
    if(putResult){
        return new ServiceResponse({success:true,data:key});
    } else {
        return new ServiceResponse({success:false});
    }
}
const putObjectToS3 = async(key:string, data:any) => {
    console.info("Starting PutObject S3");
    let s3Bucket = new AWS.S3();
    let params = {
        Bucket: BucketName,
        Key: key,
        Body: data,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg',
        ACL: 'public-read'
    }
    console.info("S3 Parameters: ", params);
    try {
        const stored = await s3Bucket.upload(params).promise()
        console.log(stored);
        return true;
      } catch (err) {
        console.log(err)
        return false;
      }

}