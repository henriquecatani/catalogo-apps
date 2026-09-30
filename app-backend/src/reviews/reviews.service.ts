import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { CreateReviewDto } from "../dtos/create-review-dto";
import { UpdateReviewDto } from "../dtos/update-review-dto";
import { AppsService } from "../apps/apps.service";

@Injectable()
export class ReviewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly appsService: AppsService,
  ) {}

  async create(appId: number, dto: CreateReviewDto) {
    const app = await this.prisma.app.findUnique({
      where: { id: appId },
    });

    if (!app) {
      throw new NotFoundException("Aplicativo não encontrado.");
    }

    const review = await this.prisma.review.create({
      data: {
        appId,
        name: dto.name,
        markdownText: dto.markdownText,
        rating: dto.rating,
      },
    });

    await this.appsService.recalculateRating(appId);

    return {
      message: "Avaliação cadastrada com sucesso!",
      data: review,
    };
  }

  async findByApp(appId: number) {
    const app = await this.prisma.app.findUnique({
      where: { id: appId },
    });

    if (!app) {
      throw new NotFoundException("Aplicativo não encontrado.");
    }

    return this.prisma.review.findMany({
      where: { appId },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: number) {
    const review = await this.prisma.review.findUnique({
      where: { id },
      include: {
        app: {
          select: {
            id: true,
            name: true,
            icon: true,
          },
        },
      },
    });

    if (!review) {
      throw new NotFoundException("Avaliação não encontrada.");
    }

    return review;
  }

  async update(id: number, dto: UpdateReviewDto) {
    const existing = await this.findOne(id);

    const updated = await this.prisma.review.update({
      where: { id },
      data: {
        name: dto.name,
        markdownText: dto.markdownText,
        rating: dto.rating,
      },
    });

    if (dto.rating !== undefined) {
      await this.appsService.recalculateRating(existing.appId);
    }

    return {
      message: "Avaliação atualizada com sucesso!",
      data: updated,
    };
  }

  async delete(id: number) {
    const existing = await this.findOne(id);

    await this.prisma.review.delete({
      where: { id },
    });

    await this.appsService.recalculateRating(existing.appId);

    return {
      message: "Avaliação removida com sucesso!",
    };
  }
}
