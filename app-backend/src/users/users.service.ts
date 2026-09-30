import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "../dtos/create-users-dto";
import { PrismaService } from "../database/prisma.service";
import bcrypt from "bcryptjs";
import { GetUserDTO } from "../dtos/get-user-dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDTO) {
    const passwordHash = await bcrypt.hash(dto.passwordHash, 10);
    const userCreated = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        passwordHash: passwordHash,
      },
    });
    return {
      message: "Usuário criado com sucesso!",
      data: userCreated,
    };
  }

  async getAllUsers(): Promise<GetUserDTO[]> {
    return this.prisma.user.findMany({
      select: { id: true, name: true, email: true, createdAt: true },
      orderBy: { name: "asc" },
    });
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async updateUser(id: number, dto: CreateUserDTO) {
    await this.prisma.user.update({
      where: { id },
      data: {
        name: dto.name ?? "",
        email: dto.email ?? "",
      },
    });
    return { message: "user updated" };
  }
  async deleteUser(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
