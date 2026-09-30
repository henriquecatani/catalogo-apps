import { IsOptional, IsString } from "class-validator";

export class UpdateDeveloperDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  icon?: string;
}
