import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { CreateAppDto } from "../dtos/create-app-dto";
import { UpdateAppDto } from "../dtos/update-app-dto";

@Injectable()
export class AppsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAppDto) {
    const developer = await this.prisma.developer.findUnique({
      where: { id: dto.developerId },
    });

    if (!developer) {
      throw new BadRequestException("Desenvolvedor informado não existe.");
    }

    const app = await this.prisma.app.create({
      data: {
        name: dto.name,
        icon: dto.icon,
        link: dto.link,
        smallDescription: dto.smallDescription,
        markdownDescription: dto.markdownDescription,
        developerId: dto.developerId,
        rating: 0.0,
      },
      include: {
        developer: true,
      },
    });

    return {
      message: "Aplicativo cadastrado com sucesso!",
      data: app,
    };
  }

  async findAll(developerId?: number, search?: string) {
    const where: any = {};

    if (developerId) {
      where.developerId = developerId;
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { smallDescription: { contains: search } },
      ];
    }

    return this.prisma.app.findMany({
      where,
      include: {
        developer: {
          select: {
            id: true,
            name: true,
            icon: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: number) {
    const app = await this.prisma.app.findUnique({
      where: { id },
      include: {
        developer: true,
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                profile: {
                  select: {
                    avatarUrl: true,
                  },
                },
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!app) {
      throw new NotFoundException("Aplicativo não encontrado.");
    }

    return app;
  }

  async update(id: number, dto: UpdateAppDto) {
    await this.findOne(id);

    if (dto.developerId) {
      const developer = await this.prisma.developer.findUnique({
        where: { id: dto.developerId },
      });
      if (!developer) {
        throw new BadRequestException("Desenvolvedor informado não existe.");
      }
    }

    const updated = await this.prisma.app.update({
      where: { id },
      data: {
        name: dto.name,
        icon: dto.icon,
        link: dto.link,
        smallDescription: dto.smallDescription,
        markdownDescription: dto.markdownDescription,
        developerId: dto.developerId,
      },
      include: {
        developer: true,
      },
    });

    return {
      message: "Aplicativo atualizado com sucesso!",
      data: updated,
    };
  }

  async delete(id: number) {
    await this.findOne(id);

    await this.prisma.app.delete({
      where: { id },
    });

    return {
      message: "Aplicativo removido com sucesso!",
    };
  }

  async recalculateRating(appId: number) {
    const agg = await this.prisma.review.aggregate({
      where: { appId },
      _avg: { rating: true },
    });

    const averageRating = agg._avg.rating
      ? Math.round(agg._avg.rating * 10) / 10
      : 0.0;

    await this.prisma.app.update({
      where: { id: appId },
      data: { rating: averageRating },
    });

    return averageRating;
  }
}
