import { IsBase64, IsDefined} from 'class-validator';
export class UploadImageDTO {
    @IsDefined()
    @IsBase64()
    image:any;
}
