import { Module } from "@nestjs/common";
import { ReviewsController } from "./reviews.controller";
import { ReviewsService } from "./reviews.service";
import { PrismaService } from "../database/prisma.service";
import { AppsModule } from "../apps/apps.module";

@Module({
  imports: [AppsModule],
  controllers: [ReviewsController],
  providers: [ReviewsService, PrismaService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
