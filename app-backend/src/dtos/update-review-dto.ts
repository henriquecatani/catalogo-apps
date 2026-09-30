import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class UpdateReviewDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  markdownText?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;
}
