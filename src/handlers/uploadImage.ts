import {Response} from '../helper/Response';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import DTOValidator from '../service/DTOValidator';
import { RequestDTO } from '../dto/Request.dto';
import { UploadImageDTO } from '../dto/UploadImage.dto';
import { uploadImageService } from '../service/image.service';

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    // All log statements are written to CloudWatch
    console.info('received:', event);
    let checkRequestData = await DTOValidator(RequestDTO, event, 'Main Request Handler');
    if (checkRequestData) {
        return new Response({statusCode:400,body:checkRequestData,event}).get();
    } else {
        //Use (try and catch) as much as possible
        try {
            const body = JSON.parse(event.body);
            const ErrorCheck = await DTOValidator(UploadImageDTO, body, 'Upload Image validation');
            if (ErrorCheck) {
                console.info('System have validation error. List:', ErrorCheck);
                return new Response({statusCode:400,body:ErrorCheck,event}).get();
            }
            let uploadStatus = await uploadImageService(body);
            if(uploadStatus.success){
                console.log("Data:",uploadStatus);
                console.info("Success");
                return new Response({statusCode:200,body:uploadStatus.data,event}).get();
            } else {
                console.info("Failed");
                return new Response({statusCode:400,event,body:{error:uploadStatus.error}}).get();
            }
        } catch (err) {
            console.error(err);
            return new Response({statusCode:400,message:"Error occured while parsing body",event,body:null}).get();
        }
    }
};
