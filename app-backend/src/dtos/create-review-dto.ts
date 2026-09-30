import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

export class CreateReviewDto {
  @IsInt()
  userId: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsString()
  @IsNotEmpty()
  markdownText: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;
}
