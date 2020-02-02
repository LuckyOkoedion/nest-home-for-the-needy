import { CreateUserDto } from "../../user/dto/create-user.dto";
import { IsNotEmpty, IsArray } from 'class-validator';

export class CreateVisitDto {
  @IsArray()
  @IsNotEmpty()
  visits: [
    {
      readonly id: string;
      readonly date: Date;
      readonly time: Date;
      readonly ipAddress: string;
      readonly ipState: string;
      readonly userId?: string;
      readonly ipDevice: string;
    }
  ];
}
