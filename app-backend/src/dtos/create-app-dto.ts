import { IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateAppDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  icon: string;

  @IsString()
  @IsNotEmpty()
  link: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  smallDescription: string;

  @IsString()
  @IsNotEmpty()
  markdownDescription: string;

  @IsInt()
  developerId: number;
}
