import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { CreateDeveloperDto } from "../dtos/create-developer-dto";
import { UpdateDeveloperDto } from "../dtos/update-developer-dto";

@Injectable()
export class DevelopersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDeveloperDto) {
    const developer = await this.prisma.developer.create({
      data: {
        name: dto.name,
        icon: dto.icon,
      },
    });

    return {
      message: "Desenvolvedor criado com sucesso!",
      data: developer,
    };
  }

  async findAll() {
    return this.prisma.developer.findMany({
      include: {
        apps: {
          select: {
            id: true,
            name: true,
            icon: true,
            rating: true,
            smallDescription: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });
  }

  async findOne(id: number) {
    const developer = await this.prisma.developer.findUnique({
      where: { id },
      include: {
        apps: true,
      },
    });

    if (!developer) {
      throw new NotFoundException("Desenvolvedor não encontrado.");
    }

    return developer;
  }

  async update(id: number, dto: UpdateDeveloperDto) {
    await this.findOne(id);

    const updated = await this.prisma.developer.update({
      where: { id },
      data: {
        name: dto.name,
        icon: dto.icon,
      },
    });

    return {
      message: "Desenvolvedor atualizado com sucesso!",
      data: updated,
    };
  }

  async delete(id: number) {
    await this.findOne(id);

    await this.prisma.developer.delete({
      where: { id },
    });

    return {
      message: "Desenvolvedor removido com sucesso!",
    };
  }
}
