import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from "class-validator";

export class UpdatePlanDto {
  @IsOptional()
  @IsString()
  @Length(2, 120)
  name?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;
}
