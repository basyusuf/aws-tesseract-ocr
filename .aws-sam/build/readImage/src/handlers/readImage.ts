import {Response} from '../helper/Response';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import DTOValidator from '../service/DTOValidator';
import { RequestDTO } from '../dto/Request.dto';
import { ReadImageDTO } from '../dto/ReadImage.dto';
import { readImageService } from '../service/ocr.service';

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
            const ErrorCheck = await DTOValidator(ReadImageDTO, body, 'Read Image validation');
            if (ErrorCheck) {
                console.info('System have validation error. List:', ErrorCheck);
                return new Response({statusCode:400,body:ErrorCheck,event}).get();
            }
            let readStatus = await readImageService(body);
            if(readStatus.success){
                console.log("Data:",readStatus);
                console.info("Success");
                return new Response({statusCode:200,body:readStatus.data,event}).get();
            } else {
                console.info("Failed");
                return new Response({statusCode:400,event,body:{error:readStatus.error}}).get();
            }
        } catch (err) {
            console.error(err);
            return new Response({statusCode:400,message:"Error occured while parsing body",event,body:null}).get();
        }
    }
};
