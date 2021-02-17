import { APIGatewayProxyEvent } from "aws-lambda";

interface IResponse{
    statusCode:number;
    event:APIGatewayProxyEvent;
    body:any;
    message?:string;
}
export class Response implements IResponse{
    statusCode: number;
    body: any;
    event: APIGatewayProxyEvent;
    error?: any;
    message?:string;
    constructor(responseData:IResponse){
        this.statusCode = responseData.statusCode;
        this.body = responseData.body;
        this.event = responseData.event;
        this.message = responseData.message?responseData.message:null;
    }
    get(){
        if(this.statusCode === 500){
            console.info("Mail sender!");
        }
        return this;
    }
}