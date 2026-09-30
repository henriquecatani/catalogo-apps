import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";
import { CreatePlanDto } from "../dtos/create-plan-dto";
import { PlansService } from "./plans.service";
import { UpdatePlanDto } from "../dtos/update-plan-dto";

@Controller("plans")
export class PlansController {
  constructor(private plansService: PlansService) {}
  @Post()
  async create(@Body() dto: CreatePlanDto) {
    return await this.plansService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.plansService.findAll();
  }

  @Get(":id")
  async get(@Param("id", ParseIntPipe) id: number) {
    return await this.plansService.findOne(id);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdatePlanDto,
  ) {
    return this.plansService.update(id, dto);
  }

  async delete(@Param("id", ParseIntPipe) id: number) {
    return await this.plansService.delete(id);
  }
}
