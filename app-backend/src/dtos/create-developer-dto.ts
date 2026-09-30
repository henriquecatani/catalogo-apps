import { IsNotEmpty, IsString } from "class-validator";

export class CreateDeveloperDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  icon: string;
}
