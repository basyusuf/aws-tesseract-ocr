import { IsDefined, IsOptional} from 'class-validator';
export class ReadImageDTO {
    @IsDefined()
    image:string;

    @IsOptional()
    lang:string;
}
