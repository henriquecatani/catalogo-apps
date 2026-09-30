import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { ProfilesModule } from "./profiles/profiles.module";
import { PlansService } from "./plans/plans.service";
import { PlansModule } from "./plans/plans.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { PrismaService } from "./database/prisma.service";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    ProfilesModule,
    PlansModule,
    AuthModule,
  ],
  controllers: [],
  providers: [PlansService, PrismaService],
})
export class AppModule {}
