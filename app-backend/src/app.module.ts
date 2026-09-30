import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { ProfilesModule } from "./profiles/profiles.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { PrismaService } from "./database/prisma.service";
import { DevelopersModule } from "./developers/developers.module";
import { AppsModule } from "./apps/apps.module";
import { ReviewsModule } from "./reviews/reviews.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    ProfilesModule,
    AuthModule,
    DevelopersModule,
    AppsModule,
    ReviewsModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
