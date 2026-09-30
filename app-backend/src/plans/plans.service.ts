import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { CreatePlanDto } from "../dtos/create-plan-dto";
import { UpdatePlanDto } from "../dtos/update-plan-dto";

@Injectable()
export class PlansService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePlanDto) {
    const planCreated = await this.prisma.plan.create({
      data: {
        name: dto.name,
        price: dto.price,
      },
    });
    return {
      message: "Plano criado com sucesso!",
      data: planCreated,
    };
  }

  async findAll() {
    return await this.prisma.plan.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.plan.findUnique({ where: { id } });
  }

  async update(id: number, dto: UpdatePlanDto) {
    const plan = await this.prisma.plan.findUnique({
      where: { id },
    });

    if (!plan) {
      throw new Error("Plano não encontrado");
    }

    const updatedPlan = await this.prisma.plan.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        price: dto.price,
      },
    });
    return {
      message: "Plano atualizado com sucesso!",
      data: updatedPlan,
    };
  }

  async delete(id: number) {
    await this.prisma.plan.delete({
      where: { id },
    });
  }
}
