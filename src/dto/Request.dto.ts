import { Equals, IsDefined } from 'class-validator';

export class RequestDTO {
    @Equals('POST')
    httpMethod: string;

    @IsDefined()
    body: any;
}
