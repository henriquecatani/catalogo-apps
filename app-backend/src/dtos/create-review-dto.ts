import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  markdownText: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;
}
