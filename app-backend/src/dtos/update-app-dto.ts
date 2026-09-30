import { IsInt, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateAppDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsString()
  link?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  smallDescription?: string;

  @IsOptional()
  @IsString()
  markdownDescription?: string;

  @IsOptional()
  @IsInt()
  developerId?: number;
}
