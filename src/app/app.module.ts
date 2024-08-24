import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/security/passport.jwt.strategy';
import { CacheModule } from '@nestjs/cache-manager';
import { User } from 'src/user/entities/user.entity';
import { FoodStoreController } from 'src/foodstore/foodstore.controller';
import { Foodstore } from 'src/foodstore/entities/foodstore.entity';
import { FoodstoreComment } from 'src/foodstore/entities/foodstore_comment.entity';
import { FoodstoreFood } from 'src/foodstore/entities/foodstore_food.entity';
import { UserRequest } from 'src/order/entities/order.entity';
import { UserModule } from 'src/user/user.module';
import { FoodStoreModule } from 'src/foodstore/foodstore.module';
import { OrderModule } from 'src/order/order.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      extra: {
        socketPath: process.env.DB_SOCKETPATH
      },
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Foodstore, FoodstoreComment, FoodstoreFood, UserRequest],
      migrations: [__dirname + '/src/migrations/*.ts'],
      autoLoadEntities: true,
      charset: 'utf8mb4',
      synchronize: false,
      logging: process.env.NODE_ENV !== 'production',
      keepConnectionAlive: true,
      timezone: '+09:00',
    }),
    CacheModule.register({
      ttl: 60000,
      max: 100,
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    FoodStoreModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
