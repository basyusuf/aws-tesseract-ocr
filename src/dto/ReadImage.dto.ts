import { IsDefined} from 'class-validator';
export class ReadImageDTO {
    @IsDefined()
    image:string;
}
