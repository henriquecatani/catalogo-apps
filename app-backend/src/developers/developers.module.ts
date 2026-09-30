import { Module } from "@nestjs/common";
import { DevelopersController } from "./developers.controller";
import { DevelopersService } from "./developers.service";
import { PrismaService } from "../database/prisma.service";

@Module({
  controllers: [DevelopersController],
  providers: [DevelopersService, PrismaService],
  exports: [DevelopersService],
})
export class DevelopersModule {}
