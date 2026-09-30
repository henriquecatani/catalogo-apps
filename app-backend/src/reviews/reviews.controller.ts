import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { CreateReviewDto } from "../dtos/create-review-dto";
import { UpdateReviewDto } from "../dtos/update-review-dto";

@Controller()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post("apps/:appId/reviews")
  async create(
    @Param("appId", ParseIntPipe) appId: number,
    @Body() dto: CreateReviewDto,
  ) {
    return await this.reviewsService.create(appId, dto);
  }

  @Get("apps/:appId/reviews")
  async findByApp(@Param("appId", ParseIntPipe) appId: number) {
    return await this.reviewsService.findByApp(appId);
  }

  @Get("reviews/:id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return await this.reviewsService.findOne(id);
  }

  @Put("reviews/:id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateReviewDto,
  ) {
    return await this.reviewsService.update(id, dto);
  }

  @Delete("reviews/:id")
  async delete(@Param("id", ParseIntPipe) id: number) {
    return await this.reviewsService.delete(id);
  }
}
