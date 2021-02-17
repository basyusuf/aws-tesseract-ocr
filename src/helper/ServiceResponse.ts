interface IServiceResponse {
    success:boolean;
    data?:any;
    error?:any;
}

export class ServiceResponse implements IServiceResponse{
    success: boolean;
    data?: any;
    error?:any;
    constructor(responseData:IServiceResponse){
        this.success = responseData.success;
        this.data = responseData.data
        if(responseData.error){
            this.error = responseData.error;
        }
    }
    get(){
        return this;
    }
}